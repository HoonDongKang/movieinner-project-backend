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
    params: { userIdx: string },
    connection: DbConnection
) => {
    let response = []
    try {
        const { userIdx } = params
        response = await connection.run(`SELECT * FROM user_info WHERE idx=?`, [
            userIdx,
        ])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 200, data: response }
}

const getUserImage = async (
    params: { userIdx: string },
    connection: DbConnection
) => {
    const { userIdx } = params
    try {
        const response = await connection.run(
            `SELECT image_URL FROM user_info WHERE idx=?`,
            [userIdx]
        )
        const { image_URL } = response[0]
        return { status: 200, data: { image_URL } }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    getUsers,
    getIdxUser,
    getUserImage,
}
