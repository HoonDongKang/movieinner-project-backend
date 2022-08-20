import { DbConnection } from '../modules/connect'
import bcrypt from 'bcrypt'

const postAuth = async (params: any, connection: DbConnection) => {
    const { email, password } = params
    const getHashedPassword = await connection.run(
        `SELECT password FROM user_info WHERE email=?`,
        [email]
    )
}
const isEqual = await bcrypt.compare
