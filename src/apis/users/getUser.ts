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

export default {
    getUsers,
    getIdxUser,
}
