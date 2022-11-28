//카테고리별 영화 만들기
import axios from 'axios'
import { convertGenreIdtoName, genreId } from '../../modules/tmdbConvert'
import { DbConnection } from './../../modules/connect'
import TMDB from '../../configs/tmdb'

const { TMDB_API_KEY } = TMDB

const searchCategory = async (params: any, connection: DbConnection) => {
    const { search, searchPage } = params //query search:id

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${search}&page${searchPage}&langauge=ko`)
        convertGenreIdtoName(response)
        return {
            status: 200,
            data: response,
        }
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    searchCategory,
}
