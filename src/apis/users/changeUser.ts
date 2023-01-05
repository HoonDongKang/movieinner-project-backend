// 유저 정보 CRUD API
import { IsValidateName } from '../../configs/regExp'
import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'
import bcrypt from 'bcrypt'

//특정 유저 비밀번호 변경
const changeUserPassword = async (
    params: { userIdx: string; crtPassword: string; newPassword: string },
    connection: DbConnection
) => {
    const { userIdx, crtPassword, newPassword } = params
    const salt = await bcrypt.genSalt(10)
    try {
        const response = await connection.run(
            `SELECT password FROM user_info WHERE idx=?`,
            [userIdx]
        )
        if (response[0]) {
            const { password: dbPassword } = response[0]
            const isValidPw = await bcrypt.compare(crtPassword, dbPassword)
            if (isValidPw) {
                const hashedPassword = await bcrypt.hash(newPassword, salt)
                await connection.run(
                    `UPDATE user_info SET password=? WHERE idx=?`,
                    [hashedPassword, userIdx]
                )
                return {
                    status: 201,
                    data: {
                        success: true,
                    },
                }
            } else {
                throw 'E0003'
            }
        } else {
            throw 'E0009'
        }
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

const changeUserImage = async (
    params: { imageURL: string; userIdx: string },
    connection: DbConnection
) => {
    const { imageURL, userIdx } = params
    try {
        await connection.run(`UPDATE user_info SET image_URL=? WHERE idx=?`, [
            imageURL,
            userIdx,
        ])
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    changeUserPassword,
    changeUserNickname,
    changeUserImage,
}
