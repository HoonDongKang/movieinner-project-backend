// 유저 정보 CRUD API
import { IsValidateName } from '../../configs/regExp'
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
    params: { userIdx: string; email: string; newNickname: string },
    connection: DbConnection
) => {
    //닉네임 유효성 검사 이후
    const { userIdx, newNickname } = params
    try {
        const IsValid = IsValidateName(newNickname)
        if (IsValid) {
            const selectRes = await connection.run(
                `SELECT COUNT(*) as count FROM user_info WHERE idx=?`,
                [userIdx]
            )
            const { count } = selectRes[0]
            if (count > 0) {
                await connection.run(
                    `UPDATE user_info SET nickname=? WHERE idx=?`,
                    [newNickname, userIdx]
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
        } else {
            return {
                status: 400,
                data: {
                    success: false,
                },
            }
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    changeUserPassword,
    changeUserNickname,
}
