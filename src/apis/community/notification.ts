import { DbConnection } from '../../modules/connect'

//db 값 type 지정 적용이 안됨
type NotType = 'comment' | 'reply'

interface NotificationType {
    userIdx: string
    actionUserIdx: string
    notType: NotType
    notTypeIdx: string
}

const pushNotificationDB = async (
    params: NotificationType,
    connection: DbConnection
) => {
    const { userIdx, actionUserIdx, notType, notTypeIdx } = params
    try {
        await connection.run(
            `INSERT INTO notification(user_idx, action_user_idx, not_type,not_type_idx) VALUES (?,?,?,?)`,
            [userIdx, actionUserIdx, notType, notTypeIdx]
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
            `SELECT user_idx, action_user_idx, not_type,not_type_idx FROM notification WHERE user_idx=? AND isChecked = 1`,
            [userIdx]
        )
        //베열로 보내면 프론트에서 어떻게 api 보내니..
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
