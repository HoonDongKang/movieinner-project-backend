import { DbConnection } from "../../modules/connect"
import JWT from "jsonwebtoken"
import jsonWebToken from "../../configs/jsonWebToken"
const { JWT_SECRET } = jsonWebToken

interface RefreshTokenPayloadType {
    accessToken: string
    refreshTokenExpiredDate: string
    iat: number
}

interface AccessTokenPayloadType {
    email: string
    idx: string
    nickname: string
    iat: number
}

const refreshToken = async (params: any, connection: DbConnection) => {
    let refreshTokenPayload: RefreshTokenPayloadType = {
        accessToken: "",
        refreshTokenExpiredDate: "",
        iat: 0,
    }
    let newAccessTokenPayload = {}
    let newAccessToken = ""
    let newRefreshTokenPayload = {}
    let newRefreshToken = ""
    let newRefreshTokenExpireIn = new Date()
    const NewRefreshTokenExpiredDate = new Date(
        Date.now() + 3600 * 1000 * 24 * 180
    ) //6개월

    // access Token expiry 기간이 지나거나
    // access Token 이 header에서 사라지면 재발급

    try {
        const { refreshToken } = params
        refreshTokenPayload = JWT.verify(
            refreshToken,
            JWT_SECRET
        ) as RefreshTokenPayloadType
        console.log(refreshTokenPayload)
        const { accessToken, refreshTokenExpiredDate } = refreshTokenPayload
        const accessTokenPayload = JWT.verify(
            accessToken,
            JWT_SECRET
        ) as AccessTokenPayloadType
        const { email, idx, nickname } = accessTokenPayload
        const now = Date.now()
        const getResponse = await connection.run(
            `SELECT COUNT(*) as count FROM user_token WHERE refresh_token=?`,
            [refreshToken]
        )
        const { count } = getResponse[0]
        //refresh token이 db에 존재할 경우
        if (count > 0) {
            if (
                // refresh Token 만료가 1달 이상일 경우
                Date.parse(refreshTokenExpiredDate) >
                now + 3600 * 1000 * 24 * 30
            ) {
                //기존 refresh token expiry 대입
                newAccessTokenPayload = { email, idx, nickname }
                newAccessToken = JWT.sign(newAccessTokenPayload, JWT_SECRET)
                newRefreshTokenPayload = {
                    accessToken: newAccessToken,
                    refreshTokenExpiredDate,
                }
                newRefreshToken = JWT.sign(newRefreshTokenPayload, JWT_SECRET)
                newRefreshTokenExpireIn = new Date(refreshTokenExpiredDate)
            } else {
                // 새로운 refresh token expiry
                newAccessTokenPayload = { email, idx, nickname }
                newAccessToken = JWT.sign(newAccessTokenPayload, JWT_SECRET)
                newRefreshTokenPayload = {
                    accessToken: newAccessToken,
                    NewRefreshTokenExpiredDate,
                }
                newRefreshToken = JWT.sign(newRefreshTokenPayload, JWT_SECRET)
                newRefreshTokenExpireIn = new Date(NewRefreshTokenExpiredDate)
            }
            await connection.run(
                `UPDATE user_token SET access_token=?,refresh_token=?,refresh_token_expires_in=? WHERE refresh_token=?`,
                [
                    newAccessToken,
                    newRefreshToken,
                    newRefreshTokenExpireIn,
                    refreshToken,
                ]
            )
        } else {
            throw "E0005"
        }
    } catch (e: any) {
        throw new Error(e)
    }

    return {
        status: 201,
        cookie: {
            name: "refreshToken",
            val: newRefreshToken,
            options: { httpOnly: true, path: "/", sameSite: "lax" },
        },
        data: {
            accessToken: newAccessToken,
            refreshTokenExpireIn: newRefreshTokenExpireIn,
        },
    }
}

export default { refreshToken }
