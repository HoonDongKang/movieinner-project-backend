//카테고리별 영화 만들기
import { genreId } from '../../modules/tmdbConvert'
import { DbConnection } from './../../modules/connect'

const searchCategory = async (params: any, connection: DbConnection) => {
    const { search, searchPage } = params //query search:id
    let genreName = ''
    try {
        for (const id of genreId) {
            if (Number(search) === id.id) {
                genreName = id.name
                break
            } else {
                genreName = 'undefined genre'
            }
        }

        return {
            status: 200,
            data: genreName,
        }
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    searchCategory,
}
