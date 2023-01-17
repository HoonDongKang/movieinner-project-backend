import { paramsErrorHandler } from '../../modules/paramsError'
import { DbConnection } from './../../modules/connect'

interface LikedMoviesType {
    type: string
    userIdx: string
    movieId?: string
    name?: string
    poster_path?: string
    backdrop_path?: string
}

//찜하기 확인
const checkLiked = async (
    params: LikedMoviesType,
    connection: DbConnection
) => {
    const { type, userIdx, movieId, name } = params
    let isExisted = false
    try {
        if (type === 'movie') {
            const response = await connection.run(
                `SELECT COUNT(*) AS count FROM liked WHERE type=? AND user_idx=? AND movie_id=?`,
                [type, userIdx, movieId]
            )
            const { count } = response[0]
            if (count > 0) {
                isExisted = true
            }
        } else if (type === 'theme') {
            const response = await connection.run(
                `SELECT COUNT(*) AS count FROM liked WHERE type=? AND user_idx=? AND name=?`,
                [type, userIdx, name]
            )
            const { count } = response[0]
            if (count > 0) {
                isExisted = true
            }
        } else {
            throw 'E0001'
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return {
        status: 201,
        data: {
            isExisted,
        },
    }
}
//찜한 영화
const liked = async (params: LikedMoviesType, connection: DbConnection) => {
    const { type, userIdx, movieId, name, poster_path, backdrop_path } = params
    try {
        if (type === 'movie') {
            await connection.run(
                `INSERT INTO liked(type,user_idx,movie_id,name,poster_path,backdrop_path) VALUES (?,?,?,?,?,?)`,
                [type, userIdx, movieId, name, poster_path, backdrop_path]
            )
        } else if (type === 'theme') {
            await connection.run(
                `INSERT INTO liked(type,user_idx,name,poster_path) VALUES (?,?,?,?)`,
                [type, userIdx, name, poster_path]
            )
        } else {
            throw 'E0001'
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

//찜하기 취소
const deleteLike = async (
    params: LikedMoviesType,
    connection: DbConnection
) => {
    const { type, userIdx, movieId } = params
    try {
        await connection.run(
            `DELETE FROM liked WHERE type=? AND user_idx=? AND movie_id=?`,
            [type, userIdx, movieId]
        )
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
//유저 별 좋아요 영화, 테마 불러오기
const getLiked = async (params: LikedMoviesType, connection: DbConnection) => {
    const { type, userIdx } = params //type:path, userIdx:query
    let response = []
    try {
        if (type === 'movie') {
            response = await connection.run(
                `SELECT L.idx,L.type,INFO.nickname,L.movie_id,L.name,L.poster_path,L.backdrop_path FROM liked AS L INNER JOIN user_info AS INFO ON L.user_idx = INFO.idx WHERE L.type=? AND L.user_idx=?`,
                [type, userIdx]
            )
        } else if (type === 'theme') {
            response = await connection.run(
                `SELECT L.idx,L.type,INFO.nickname,L.name,L.poster_path FROM liked AS L INNER JOIN user_info AS INFO ON L.user_idx = INFO.idx WHERE L.type=? AND L.user_idx=?`,
                [type, userIdx]
            )
        } else {
            throw 'E0001'
        }

        return {
            status: 201,
            data: {
                liked: response,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}
export default {
    checkLiked,
    liked,
    deleteLike,
    getLiked,
}
