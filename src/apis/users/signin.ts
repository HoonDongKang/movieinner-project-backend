// 로그인 API
import bcrypt from 'bcrypt'
import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'

const signin = async (
    params: { email: string; password: string },
    connection: DbConnection
) => {
    let isEqual = false
    try {
        const { email, password } = params //idx값을 줘야하나?
        const response = await connection.run(
            `SELECT password FROM user_info WHERE email=?`,
            [email]
        )
        if (!response[0]) {
            throw 'E0006'
        }
        const { password: hashedpassword } = response[0]
        isEqual = await bcrypt.compare(password, hashedpassword)
        if (!isEqual) {
            throw 'E0003'
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 200, data: { success: isEqual } }
}

export default { signin }
