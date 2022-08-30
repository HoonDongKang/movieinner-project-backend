import { DbConnection } from '../../modules/connect'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
import { paramsErrorHandler } from '../../modules/paramsError'

dotenv.config()

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
        const { password: hashedpassword, idx, nickname } = response[0]
        const isEqual = await bcrypt.compare(password, hashedpassword)
        //wrong password
        if (!isEqual) {
            throw 'E0003'
        }

        const accessTokenPayload = { email, idx, nickname, expiredDate }
        const JWT_SECRET = process.env.JWT_SECRET as string
        accessToken = JWT.sign(accessTokenPayload, JWT_SECRET)

        const refreshTokenPayload = { accessToken, refreshTokenExpiredDate }
        refreshToken = JWT.sign(refreshTokenPayload, JWT_SECRET)
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
