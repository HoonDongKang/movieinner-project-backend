import { DbConnection } from './../../modules/connect'
import TMDB from '../../configs/tmdb'
import axios from 'axios'
import { paramsErrorHandler } from './../../modules/paramsError'

const { TMDB_API_KEY } = TMDB
interface ResultArrayType {
    id: string
    title: string
    poster_path: string
    release_date: string
    popularity: number
}

const movieSearch = async (
    params: { search: string; searchPage: string },
    connection: DbConnection
) => {
    const { search, searchPage } = params
    let resultArray: Array<ResultArrayType> = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko&query=${search}&page=${searchPage}`
        )
        const { page, results, total_pages, total_results } = response.data
        for (let i = 0; i < results.length; i++) {
            resultArray.push({
                id: results[i].id,
                title: results[i].title,
                poster_path: results[i].poster_path,
                release_date: results[i].release_date,
                popularity: results[i].popularity,
            })
        }
        // 유명도 순 내림차순 = 근데 페이지 별 내림차순이라,,
        const descResultArray = resultArray.sort((a, b) => {
            return b.popularity - a.popularity
        })
        return {
            status: 200,
            data: {
                total_pages,
                total_results,
                current_page: page,
                search: descResultArray,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

//배우, 장르 검색 추가

export default {
    movieSearch,
}
