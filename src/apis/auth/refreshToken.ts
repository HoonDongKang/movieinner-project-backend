import { DbConnection } from '../../modules/connect'
import JWT from 'jsonwebtoken'
import jsonWebToken from '../../configs/jsonWebToken'
import { jwtErrorHandler } from '../../modules/paramsError'
const { JWT_SECRET } = jsonWebToken

const refreshToken = async (params: any, connection: DbConnection) => {
    let newRefreshTokenPayload = {}
    let newRefreshToken = ''
    let newRefreshTokenExpiry = new Date()
    const expiredDate = new Date(Date.now() + 3600 * 1000 * 24) //24시간
    const refreshTokenExpiredDate = new Date(
        Date.now() + 3600 * 1000 * 24 * 180
    ) //6개월
    try {
        const { refreshToken } = params
        const refreshTokenPayload: any = JWT.verify(refreshToken, JWT_SECRET)
        const { accessToken } = refreshTokenPayload
        const now = Date.now()
        const getResponse = await connection.run(
            `SELECT refresh_token_expires_in FROM user_token WHERE refresh_token=?`,
            [refreshToken]
        )
        //refresh token이 db에 존재할 경우
        if (getResponse[0]) {
        } else {
            throw 'E0005'
        }
    } catch (e: any) {
        jwtErrorHandler(e)
    }

    return {
        status: 201,
        data: {
            accessToken: newAccessToken,
            expire_in: expiredDate,
            refreshToken: newRefreshToken,
            refreshToken_expire_in: newRefreshTokenExpiry,
        },
    }
}

export default { refreshToken }
