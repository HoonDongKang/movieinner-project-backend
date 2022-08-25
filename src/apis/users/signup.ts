//회원가입 API
import bcrypt from 'bcrypt'
import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'

//회원가입

interface SignupParamsType {
    email: string
    password: string
    image_URL: string
    name: string
    gender: string
    birth: string
    nickname: string
}

const signup = async (params: SignupParamsType, connection: DbConnection) => {
    try {
        const { email, password, image_URL, name, gender, birth, nickname } =
            params
        const salt = await bcrypt.genSalt(10)
        if (!password) throw 'E0003'
        const hashedPw = await bcrypt.hash(password, salt)
        await connection.run(
            `INSERT INTO user_info(email,password,image_URL,name,gender,birth,nickname) VALUES(?,?,?,?,?,?,?)`,
            [email, hashedPw, image_URL, name, gender, birth, nickname]
        )
        return {
            status: 201,
            data: { success: true },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    signup,
}
