import { DbConnection } from '../../modules/connect'
import bcrypt from 'bcrypt'
import jsonWebToken from '../../configs/jsonWebToken'
import JWT from 'jsonwebtoken'
import { paramsErrorHandler } from '../../modules/paramsError'
const { JWT_SECRET } = jsonWebToken

//JWT 토큰 발급
const authToken = async (
    params: { email: string; password: string },
    connection: DbConnection
) => {
    let accessToken = ''
    let refreshToken = ''
    const expiredDate = new Date(Date.now() + 3600 * 1000 * 24) //24시간
    const refreshTokenExpiredDate = new Date(
        Date.now() + 3600 * 1000 * 24 * 180
    ) // 6개월
    try {
        const { email, password } = params
        const response = await connection.run(
            `SELECT password,idx,nickname FROM user_info WHERE email=?`,
            [email]
        )
        if (!response[0]) throw 'E0006'
        const { password: hashedpassword, idx, nickname } = response[0]
        const isEqual = await bcrypt.compare(password, hashedpassword)
        //wrong password
        if (!isEqual) {
            throw 'E0003'
        }

        const accessTokenPayload = { email, idx, nickname, expiredDate }
        accessToken = JWT.sign(accessTokenPayload, JWT_SECRET)

        const refreshTokenPayload = { accessToken, refreshTokenExpiredDate }
        refreshToken = JWT.sign(refreshTokenPayload, JWT_SECRET)
        const getResponse = await connection.run(
            `SELECT email from user_token WHERE email=?`,
            [email]
        )
        if (getResponse[0]) {
            await connection.run(
                `UPDATE user_token SET access_token=?,expires_in=?,refresh_token=?,refresh_token_expires_in=? WHERE email=?`,
                [
                    accessToken,
                    expiredDate,
                    refreshToken,
                    refreshTokenExpiredDate,
                    email,
                ]
            )
        } else {
            await connection.run(
                `INSERT INTO user_token(email,access_token,expires_in,refresh_token,refresh_token_expires_in) VALUES(?,?,?,?,?)`,
                [
                    email,
                    accessToken,
                    expiredDate,
                    refreshToken,
                    refreshTokenExpiredDate,
                ]
            )
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return {
        status: 201,
        cookie: {
            name: 'refreshToken',
            val: refreshToken,
            options: { httpOnly: true, path: '/', sameSite: 'lax' },
        },
        data: {
            success: true,
            accessToken,
            refreshToken,
        },
    }
}

const getCookies = async (
    params: { refreshToken: string },
    connection: DbConnection
) => {
    const { refreshToken } = params
    if (!refreshToken) throw 'E0008'
    return {
        status: 200,
        data: {
            refreshToken,
        },
    }
}

export default {
    authToken,
    getCookies,
}
