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

const notification = async (
    params: NotificationType,
    connection: DbConnection
) => {
    const { userIdx } = params
    try {
        const response = await connection.run(
            `SELECT INFO.nickname, INFO.image_URL, CMTY.title FROM notification AS NT INNER JOIN user_info AS INFO ON NT.writer_idx=INFO.idx INNER JOIN community AS CMTY ON NT.content_idx = CMTY.idx WHERE NT.idx=''`
        )

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
// notfication
// 1) 내가 작성한 게시물에 댓글이 달렸다
// ㄴ user_nickname: 나
// ㄴ action_user_nicknmae: 댓글 단 사람
// ㄴ not_type : content
// ㄴ not_type_id : content_idx
// ㄴ isChecked : 알림 확인했으면 0 안했으면 1

// => 알림 숫자 : isChecked가 1인 개수
// => 알림 내용 : content_idx 로 게시글 내용 불러와서 미리보기 OR comment_idx로 새로 달린 댓글 미리보기

// 2) 내가 달은 댓글에 대댓글이 달렸다
// ㄴ user_nickname: 나
// ㄴ action_user_nicknmae: 대댓글 단 사람
// ㄴ not_type : reply
// ㄴ not_type_id : comments_idx
// ㄴ isChecked : 알림 확인했으면 0 안했으면 1

// => 알림 숫자 : isChecked가 1인 개수
// => 알림 내용 : comments_idx 로 댓글 내용 불러와서 미리보기 OR 새로 달린 대댓글 내용 미리보기

// s3 이미지 변경 api  multer

//이미지 변경 + 알림
