import { DbConnection } from "../../modules/connect"
import jsonWebToken from "../../configs/jsonWebToken"
import JWT from "jsonwebtoken"
import { paramsErrorHandler } from "../../modules/paramsError"
const { JWT_SECRET } = jsonWebToken
//
//JWT 토큰 발급
const generateToken = async (
    params: { email: string },
    connection: DbConnection
) => {
    let accessToken = ""
    let refreshToken = ""
    const refreshTokenExpiredDate = new Date(
        Date.now() + 3600 * 1000 * 24 * 180
    ) // 6개월
    try {
        const { email } = params
        const response = await connection.run(
            `SELECT idx, nickname FROM user_info WHERE email=?`,
            [email]
        )
        const { idx, nickname } = response[0]

        const accessTokenPayload = { email, idx, nickname }
        accessToken = JWT.sign(accessTokenPayload, JWT_SECRET)

        const refreshTokenPayload = { accessToken, refreshTokenExpiredDate }
        refreshToken = JWT.sign(refreshTokenPayload, JWT_SECRET)
        const getResponse = await connection.run(
            `SELECT COUNT(*) as count from user_token WHERE email=?`,
            [email]
        )
        const { count } = getResponse[0]
        if (count > 0) {
            await connection.run(
                `UPDATE user_token SET access_token=?,refresh_token=?,refresh_token_expires_in=? WHERE email=?`,
                [accessToken, refreshToken, refreshTokenExpiredDate, email]
            )
        } else {
            await connection.run(
                `INSERT INTO user_token(email,access_token,refresh_token,refresh_token_expires_in) VALUES(?,?,?,?)`,
                [email, accessToken, refreshToken, refreshTokenExpiredDate]
            )
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return {
        status: 201,
        cookie: {
            name: "refreshToken",
            val: refreshToken,
            options: {
                httpOnly: true,
                path: "/",
                sameSite: "lax",
            },
        },
        data: {
            success: true,
            accessToken,
        },
    }
}

const getCookies = async (
    params: { refreshToken: string },
    connection: never
) => {
    let isRefreshToken = false
    const { refreshToken } = params
    if (refreshToken) isRefreshToken = true
    return {
        status: 200,
        data: {
            isRefreshToken: isRefreshToken,
            refreshToken: refreshToken,
        },
    }
}

export default {
    generateToken,
    getCookies,
}
