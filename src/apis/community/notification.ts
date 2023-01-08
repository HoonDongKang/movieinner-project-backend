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

//notification 마무리 하기
const notification = async (
    params: NotificationType,
    connection: DbConnection
) => {
    const { userIdx, notType } = params //userIdx: path, notType: query
    let response = ''
    try {
        if (notType === 'comment') {
            response = await connection.run(
                `SELECT NT.idx, INFO.nickname, INFO.image_URL, CMTY.title, CMTY.idx AS content_idx, CMT.comment FROM notification AS NT INNER JOIN user_info AS INFO ON NT.writer_idx=INFO.idx INNER JOIN community AS CMTY ON NT.content_idx = CMTY.idx INNER JOIN comments AS CMT ON NT.not_type_idx = CMT.idx WHERE NT.user_idx=?`,
                [userIdx]
            )
        } else {
            //notType==='reply'
            response = await connection.run(
                `SELECT NT.idx, INFO.nickname, INFO.image_URL, CMT.comment AS reply, CMT.response_to AS comment_idx, CMTY.idx AS content_idx FROM notification AS NT INNER JOIN user_info AS INFO ON NT.writer_idx=INFO.idx INNER JOIN community AS CMTY ON NT.content_idx = CMTY.idx INNER JOIN comments AS CMT ON NT.not_type_idx = CMT.idx WHERE NT.user_idx=?`,
                [userIdx]
            )
        }

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
