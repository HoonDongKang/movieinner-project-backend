import bcrypt from 'bcrypt'
import { DbConnection } from '../modules/connect'

const signIn = async (params: any, connection: DbConnection) => {
    const { email, insertId, password } = params //idx값을 줘야하나?
    const response = await connection.run(
        `SELECT password FROM user_info WHERE email=? AND idx=?`,
        [email, insertId]
    )
    const { password: hashedpassword } = response[0]
    const isEqual = await bcrypt.compare(password, hashedpassword)
    return { status: 200, data: { success: isEqual } }
}

const getUserInfo = async (params: any, connection: DbConnection) => {
    const response = await connection.run(`SELECT * FROM user_info`, [])
    return { status: 200, data: response }
}

export default { signIn, getUserInfo }
