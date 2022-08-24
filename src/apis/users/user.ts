// 유저 정보 CRUD API
import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'

//모든 유저 이메일, 이름 가져오기
const getUsers = async (params: any, connection: DbConnection) => {
    let response = []
    try {
        response = await connection.run(`SELECT email,name FROM user_info`, [])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 200, data: response }
}

//특정 유저의 정보 가져오기
const getIdxUser = async (params: any, connection: DbConnection) => {
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
const deleteUsers = async (params: any, connection: DbConnection) => {
    try {
        await connection.run(`DELETE FROM user_info`)
    } catch (e: any) {
        throw new Error(e)
    }
    return { status: 200, data: { success: true } }
}

//특정 유저 정보 삭제
const deleteIdxUser = async (params: any, connection: DbConnection) => {
    try {
        const { insertId } = params
        await connection.run(`DELETE FROM user_info WHERE idx=?`, [insertId])
    } catch (e: any) {
        throw new Error(e)
    }
    return { status: 200, data: { success: true } }
}

//특정 유저 비밀번호 변경
const changeUserPassword = async (params: any, connection: DbConnection) => {
    try {
        const { email, newPassword } = params
        await connection.run(`UPDATE user_info SET password=? WHERE email=?`, [
            newPassword,
            email,
        ])
    } catch (e) {
        throw new Error(e)
    }
    return { status: 200, data: { success: true } }
}
export default {
    getUsers,
    getIdxUser,
    deleteUsers,
    deleteIdxUser,
    changeUserPassword,
}
