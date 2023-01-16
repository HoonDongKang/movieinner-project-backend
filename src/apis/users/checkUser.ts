import { DbConnection } from "../../modules/connect"
import { paramsErrorHandler } from "../../modules/paramsError"
import bcrypt from "bcrypt"

const checkUserEmail = async (
    params: { email: string },
    connection: DbConnection
) => {
    let isExisted = true
    try {
        const { email } = params
        const removeString = email.substring(email.indexOf("."))
        const emailRemoveString = email.replace(removeString, "")
        const emailWithDotCom = emailRemoveString + ".com"
        const response = await connection.run(
            `SELECT COUNT(*) AS count FROM user_info WHERE email=?`,
            [emailWithDotCom]
        )
        const { count: emailExisted } = response[0]
        if (emailExisted === 0) isExisted = false
        return {
            status: 201,
            data: {
                isEmailExisted: isExisted,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const checkUserNickname = async (
    params: { nickname: string },
    connection: DbConnection
) => {
    let isExisted = true

    try {
        const { nickname } = params
        const response = await connection.run(
            `SELECT COUNT(*) AS count FROM user_info WHERE nickname=?`,
            [nickname]
        )
        const { count: nicknameExisted } = response[0]
        isExisted = nicknameExisted === 0 ? false : true

        return {
            status: 201,
            data: {
                isNicknameExisted: isExisted,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const checkUserPassword = async (
    params: { password: string; email: string },
    connection: DbConnection
) => {
    const { password, email } = params
    let isEqual = false
    try {
        const response = await connection.run(
            `SELECT password FROM user_info WHERE email=?`,
            [email]
        )
        const { password: hashedpassword } = response[0]
        isEqual = await bcrypt.compare(password, hashedpassword)
        return {
            status: 201,
            data: {
                isEqual,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const checkSocialOrOrdinaryUser = async (
    params: { userIdx: string },
    connection: DbConnection
) => {
    const { userIdx } = params
    let IsSocial = false
    try {
        const response = await connection.run(
            `SELECT password FROM user_info WHERE idx=?`,
            [userIdx]
        )
        const { password } = response[0]
        IsSocial = password == null ? true : false
        return {
            status: 201,
            data: {
                IsSocial,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}
//
export default {
    checkUserEmail,
    checkUserNickname,
    checkUserPassword,
    checkSocialOrOrdinaryUser,
}
