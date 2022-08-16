// 유저 정보 CRUD API
import { DbConnection } from './../modules/connect'

const getUsersInfo = async (params: any, connection: DbConnection) => {
    const response = await connection.run(
        `SELECT email,name FROM user_info`,
        []
    )
    return { status: 200, data: response }
}

const getIdxUserInfo = async (params: any, connection: DbConnection) => {
    const { insertId } = params
    const response = await connection.run(
        `SELECT * FROM user_info WHERE idx=?`,
        [insertId]
    )
    return { status: 200, data: response }
}

export default {
    getUsersInfo,
    getIdxUserInfo,
}
