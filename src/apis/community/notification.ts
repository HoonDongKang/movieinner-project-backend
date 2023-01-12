import { DbConnection } from '../../modules/connect'

//db 값 type 지정 적용이 안됨
type NotType = 'comment' | 'reply'

interface NotificationType {
    notIdx: string
    userIdx: string
    writerIdx: string
    contentIdx: string
    notType: NotType
    notTypeIdx: string
}
// DB에 알람 삽입
const pushNotificationDB = async (
    params: NotificationType,
    connection: DbConnection
) => {
    const { userIdx, writerIdx, contentIdx, notType, notTypeIdx } = params
    try {
        await connection.run(
            `INSERT INTO notification(user_idx, writer_idx,content_idx,not_type,not_type_idx) VALUES (?,?,?,?,?)`,
            [userIdx, writerIdx, contentIdx, notType, notTypeIdx]
        )
        return {
            status: 201,
            data: {
                success: true,
            },
        }
    } catch (e: any) {
        console.error(e)
    }
}

//유저 별 알람 리스트
// comment, reply 합쳐서 시간 순으로 response
const notification = async (
    params: NotificationType,
    connection: DbConnection
) => {
    const { userIdx } = params //userIdx: path, notType: query
    try {
        const response = await connection.run(
            `SELECT NT.idx, INFO.nickname, INFO.image_URL, CMTY.title, CMTY.idx AS content_idx, CMT.comment,CMT.response_to AS comment_idx FROM notification AS NT INNER JOIN user_info AS INFO ON NT.writer_idx=INFO.idx INNER JOIN community AS CMTY ON NT.content_idx = CMTY.idx INNER JOIN comments AS CMT ON NT.not_type_idx = CMT.idx WHERE NT.user_idx=?`,
            [userIdx]
        )
        console.log(response)
        return {
            status: 201,
            data: {
                response,
            },
        }
    } catch (e: any) {
        console.error(e)
    }
}
// 유저가 확인하지 않은 알람 개수
const numberOfNotification = async (
    params: NotificationType,
    connection: DbConnection
) => {
    const { userIdx } = params
    try {
        const response = await connection.run(
            `SELECT COUNT(*) AS count FROM notification WHERE user_idx=? AND isChecked='1'`,
            [userIdx]
        )
        const { count: numberOfNotification } = response[0]
        return {
            status: 200,
            data: { numberOfNotification },
        }
    } catch (e: any) {
        console.error(e)
    }
}
// 유저가 알람 확인했을 때 isChecked = 0 변경
const checkedNotification = async (
    params: NotificationType,
    connection: DbConnection
) => {
    const { userIdx, notIdx } = params
    try {
        await connection.run(
            `UPDATE notification SET isChecked='0' WHERE user_idx=? AND idx=?`,
            [userIdx, notIdx]
        )
        return {
            status: 201,
            data: { success: true },
        }
    } catch (e: any) {
        console.error(e)
    }
}

// 알람 삭제
const deleteNotification = async (
    params: NotificationType,
    connection: DbConnection
) => {
    const { userIdx, notIdx } = params
    try {
        await connection.run(
            `DELETE FROM notification WHERE user_idx=? AND idx=?`,
            [userIdx, notIdx]
        )
        return {
            status: 201,
            data: { success: true },
        }
    } catch (e: any) {
        console.error(e)
    }
}
export default {
    pushNotificationDB,
    notification,
    numberOfNotification,
    checkedNotification,
    deleteNotification,
}
