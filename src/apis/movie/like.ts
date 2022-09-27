import { tmdbErrorHandler } from '../../modules/paramsError'
import { DbConnection } from './../../modules/connect'

//찜하기 확인
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
//찜한 영화
const likedMovie = async (params: any, connection: DbConnection) => {
    const { type, nickname, movieId, name, poster_path, backdrop_path } = params
    try {
        if (type === 'movie') {
            const response = await connection.run(
                `INSERT INTO liked(type,nickname,movie_id,name,poster_path,backdrop_path) VALUES (?,?,?,?,?,?)`,
                [type, nickname, movieId, name, poster_path, backdrop_path]
            )
        } else if (type === 'theme') {
            const response = await connection.run(
                `INSERT INTO liked(type,nickname,name) VALUES (?,?,?)`,
                [type, nickname, name]
            )
        }

        return {
            status: 201,
            data: {
                success: true,
            },
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

//찜한 테마
//찜하기 취소
//최근 감상 작품
//DB 저장
export default {
    checkLiked,
    likedMovie,
}
