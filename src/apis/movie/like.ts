//찜한 영화
import { DbConnection } from './../../modules/connect'

const likedMovie = async (params: any, connection: DbConnection) => {
    const { type, nickname, movieId } = params
}

//찜한 테마
//최근 감상 작품
//DB 저장
export default {
    likedMovie,
}
