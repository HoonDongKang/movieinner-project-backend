import { DbConnection } from '../../modules/connect'

//db 값 type 지정 적용이 안됨
type NotType = 'content' | 'comment'

interface NotificationType {
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
        if (notType === 'content') {
            response = await connection.run(
                `SELECT INFO.nickname, INFO.image_URL, CMTY.title, CMTY.idx AS content_idx FROM notification AS NT INNER JOIN user_info AS INFO ON NT.writer_idx=INFO.idx INNER JOIN community AS CMTY ON NT.content_idx = CMTY.idx WHERE NT.user_idx=''`,
                [userIdx]
            )
        } else {
            //notType==='comment'
            response = await connection.run(
                `SELECT INFO.nickname, INFO.image_URL, CMT.idx AS comments_idx FROM notification AS NT INNER JOIN user_info AS INFO ON NT.writer_idx=INFO.idx INNER JOIN comments AS CMT ON NT.not_type_idx = CMT.idx WHERE NT.user_idx=''`,
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
export default {
    pushNotificationDB,
    notification,
}
