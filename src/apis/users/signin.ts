// 로그인 API
import bcrypt from 'bcrypt'
import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'

const signin = async (
    params: { email: string; password: string },
    connection: DbConnection
) => {
    try {
        const { email, password } = params
        const response = await connection.run(
            `SELECT password FROM user_info WHERE email=?`,
            [email]
        )
        if (response[0]) {
            const { password: hashedpassword } = response[0]
            const isPasswordEqual = await bcrypt.compare(
                password,
                hashedpassword
            )
            return {
                status: 200,
                data: {
                    isEmailEqual: true,
                    isPasswordEqual: isPasswordEqual,
                },
            }
        } else {
            return {
                status: 200,
                data: {
                    isEmailEqual: false,
                    isPasswordEqual: false,
                },
            }
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default { signin }
