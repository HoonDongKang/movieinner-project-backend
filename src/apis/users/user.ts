// 유저 정보 CRUD API
import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'

//모든 유저 이메일, 이름 가져오기
const getUsers = async (params: never, connection: DbConnection) => {
    let response = []
    try {
        response = await connection.run(`SELECT email,name FROM user_info`, [])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 200, data: response }
}

//특정 유저의 정보 가져오기
const getIdxUser = async (
    params: { insertId: string },
    connection: DbConnection
) => {
    let response = []
    try {
        const { insertId } = params
        response = await connection.run(`SELECT * FROM user_info WHERE idx=?`, [
            insertId,
        ])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 200, data: response }
}

//모든 유저 정보 삭제
const deleteUsers = async (params: never, connection: DbConnection) => {
    try {
        await connection.run(`DELETE FROM user_info`)
    } catch (e: any) {
        throw new Error(e)
    }
    return { status: 200, data: { success: true } }
}

//특정 유저 정보 삭제
const deleteIdxUser = async (
    params: { insertId: string },
    connection: DbConnection
) => {
    try {
        const { insertId } = params
        await connection.run(`DELETE FROM user_info WHERE idx=?`, [insertId])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 200, data: { success: true } }
}

//특정 유저 비밀번호 변경
const changeUserPassword = async (
    params: { email: string; newPassword: string },
    connection: DbConnection
) => {
    try {
        const { email, newPassword } = params
        await connection.run(`UPDATE user_info SET password=? WHERE email=?`, [
            newPassword,
            email,
        ])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 200, data: { success: true } }
}

const checkUserEmail = async (
    params: { email: string },
    connection: DbConnection
) => {
    let isExisted = true
    try {
        const { email } = params
        const removeString = email.substring(email.indexOf('.'))
        const emailRemoveString = email.replace(removeString, '')
        const emailWithDotCom = emailRemoveString + '.com'
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

const changeUserNickname=async(
    params:{nickname:string,email:string,newNickname:string},
    connection:DbConnection
    )=>{
        //닉네임 유효성 검사 이후
        const {nickname, email, newNickname}=params
        try{
            const response = await connection.run(``)
        } catch(e:any){
            console.error(e)
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
        if (nicknameExisted === 0) isExisted = false
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
export default {
    getUsers,
    getIdxUser,
    deleteUsers,
    deleteIdxUser,
    changeUserPassword,
    checkUserEmail,
    checkUserNickname,
}
