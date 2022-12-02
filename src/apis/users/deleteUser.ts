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

//나중에 delete 통합하는 법 찾기
const deleteUser = async (
    params: { email: string; nickname: string },
    connection: DbConnection
) => {
    try {
        const { email, nickname } = params
        await connection.run(
            `DELETE FROM a,b,c,d,e,f USING user_info AS a LEFT JOIN user_token AS b ON a.email=b.email LEFT JOIN email_verify AS c ON a.email=c.email LEFT JOIN community AS d ON a.nickname=d.nickname LEFT JOIN liked AS e ON a.nickname=e.nickname LEFT JOIN comments AS f ON a.nickname=f.nickname WHERE a.email=? AND a.nickname=?`,
            [email, nickname]
        )
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return { status: 201, data: { success: true } }
}

export default {
    deleteUsers,
    deleteUser,
}
