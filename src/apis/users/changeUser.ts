// 유저 정보 CRUD API
import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'

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

const changeUserNickname = async (
    params: { nickname: string; email: string; newNickname: string },
    connection: DbConnection
) => {
    //닉네임 유효성 검사 이후
    const { nickname, email, newNickname } = params
    try {
        const selectRes = await connection.run(
            `SELECT COUNT(*) as count FROM user_info WHERE email=? AND nickname=?`,
            [email, nickname]
        )
        const { count } = selectRes[0]
        console.log(count)
        if (count > 0) {
            await connection.run(
                `UPDATE user_info as U, liked as L, community as CMTY, comments as CMTS SET U.nickname=?, L.nickname=?, CMTY.nickname=?, CMTS.nickname=?`,
                [newNickname, newNickname, newNickname, newNickname]
            )
        } else {
            throw 'E0008'
        }
        return {
            status: 201,
            data: {
                success: true,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    changeUserPassword,
    changeUserNickname,
}
