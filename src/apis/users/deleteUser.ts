// 유저 정보 CRUD API
import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'

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
    params: { email: string; nickname: string },
    connection: DbConnection
) => {
    try {
        const { email, nickname } = params
        await connection.run(`SELECT user_info `, [,])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 200, data: { success: true } }
}

export default {
    deleteUsers,
    deleteIdxUser,
}
