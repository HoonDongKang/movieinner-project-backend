//찜한 영화
import { tmdbErrorHandler } from '../../modules/paramsError'
import { DbConnection } from './../../modules/connect'

const checkLiked = async (params: any, connection: DbConnection) => {
    const { type, nickname, movieId } = params
    let isExisted = false
    try {
        const response = await connection.run(
            `SELECT COUNT(*) AS count FROM liked WHERE type=? AND nickname=? AND movie_id=?`,
            [type, nickname, movieId]
        )
        const { count } = response[0]
        if (count > 0) {
            isExisted = true
        }
        return {
            status: 201,
            data: {
                isExisted,
            },
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

//찜한 테마
//최근 감상 작품
//DB 저장
export default {
    checkLiked,
}
