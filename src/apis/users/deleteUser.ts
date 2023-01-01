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
// notification table 삭제 추가하기
const deleteUser = async (
    params: { email: string; userIdx: string },
    connection: DbConnection
) => {
    try {
        const { email, userIdx } = params
        const response = await connection.run(
            `DELETE FROM a,b,c,d,e,f USING user_info AS a LEFT JOIN user_token AS b ON a.email=b.email LEFT JOIN email_verify AS c ON a.email=c.email LEFT JOIN community AS d ON a.idx=d.user_idx LEFT JOIN liked AS e ON a.idx=e.user_idx LEFT JOIN comments AS f ON a.idx=f.user_idx WHERE a.email=? AND a.idx=?`,
            [email, userIdx]
        )
        const { affectedRows } = response
        if (affectedRows === 0) throw 'E0008'
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return {
        status: 201,
        data: { success: true },
        cookie: {
            name: 'refreshToken',
            val: '',
            options: {
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
                expires: new Date(Date.now()),
                // domain: 'http://localhost:3000',
            },
        },
    }
}

export default {
    deleteUsers,
    deleteUser,
}
