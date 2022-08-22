import { DbConnection } from '../modules/connect'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
dotenv.config()

//JWT 토큰 발급
const postAuth = async (params: any, connection: DbConnection) => {
    const { email, password } = params
    const response = await connection.run(
        `SELECT password FROM user_info WHERE email=?`,
        [email]
    )
    const { password: hashedpassword } = response[0]
    const isEqual = await bcrypt.compare(password, hashedpassword)

    if (!isEqual) {
        throw new Error('Password is wrong')
    }

    const payload = { email }
    const JWT_SECRET = process.env.JWT_SECRET as string
    const token = JWT.sign(payload, JWT_SECRET)

    return {
        status: 201,
        data: {
            token,
        },
    }
}

export default {
    postAuth,
}
