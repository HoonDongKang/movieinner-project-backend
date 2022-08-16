// 유저 정보 CRUD API
import { DbConnection } from './../modules/connect'

//모든 유저 이메일, 이름 가져오기
const getUsers = async (params: any, connection: DbConnection) => {
    const response = await connection.run(
        `SELECT email,name FROM user_info`,
        []
    )
    return { status: 200, data: response }
}

//특정 유저의 정보 가져오기
const getEmailUser = async (params: any, connection: DbConnection) => {
    const { email } = params
    const response = await connection.run(
        `SELECT * FROM user_info WHERE email=?`,
        [email]
    )
    return { status: 200, data: response }
}

//모든 유저 정보 삭제
const deleteUsers = async (params: any, connection: DbConnection) => {
    await connection.run(`DELETE FROM user_info`)
    return { status: 200, data: { success: true } }
}

//특정 유저 정보 삭제
const deleteEmailUser = async (params: any, connection: DbConnection) => {
    const { email } = params
    await connection.run(`DELETE FROM user_info WHERE email=?`, [email])
    return { status: 200, data: { success: true } }
}
export default {
    getUsers,
    getEmailUser,
    deleteUsers,
    deleteEmailUser,
}
