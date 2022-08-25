import { DbConnection } from '../modules/connect'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
import { paramsErrorHandler } from './../modules/paramsError'
dotenv.config()

//JWT 토큰 발급
const postAuth = async (params: any, connection: DbConnection) => {
    let token = ''
    try {
        const { email, password } = params
        const response = await connection.run(
            `SELECT password FROM user_info WHERE email=?`,
            [email]
        )
        const { password: hashedpassword } = response[0]
        const isEqual = await bcrypt.compare(password, hashedpassword)

        if (!isEqual) {
            throw 'E0003'
        }

        const payload = { email }
        const JWT_SECRET = process.env.JWT_SECRET as string
        token = JWT.sign(payload, JWT_SECRET)

        await connection.run(`UPDATE user_info SET token=? WHERE email=?`, [
            token,
            email,
        ])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return {
        status: 201,
        data: {
            success: true,
            token,
        },
    }
}

export default {
    postAuth,
}
