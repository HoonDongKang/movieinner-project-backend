import { DbConnection } from './../../modules/connect'
import TMDB from '../../configs/tmdb'
import axios from 'axios'
import { paramsErrorHandler } from './../../modules/paramsError'

interface MovieResultArrayType {
    id: string
    title: string
    poster_path: string
    release_date: string
    popularity: number
}
interface ActorResultArrayType {
    id: string
    gender: number
    department: string
    name: string
    popularity: number
    profile_path: string
}

const { TMDB_API_KEY } = TMDB
const movieSearch = async (
    params: { search: string; searchPage: string },
    connection: DbConnection
) => {
    const { search, searchPage } = params

    let resultArray: Array<MovieResultArrayType> = []
    try {
        //한글 검색 인코딩
        const encodedSearch = encodeURIComponent(search)
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko&query=${encodedSearch}&page=${searchPage}`
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
        const descResultArray = resultArray.sort(
            (a, b) => b.popularity - a.popularity
        )
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

const actorSearch = async (
    params: { search: string; searchPage: string },
    connection: DbConnection
) => {
    const { search, searchPage } = params
    let resultArray: Array<ActorResultArrayType> = []
    try {
        const encodedSearch = encodeURIComponent(search)
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&language=ko&query=${encodedSearch}&page=${searchPage}&include_adult=true`
        )
        const { page, results, total_pages, total_results } = response.data
        for (let i = 0; i < results.length; i++) {
            resultArray.push({
                id: results[i].id,
                gender: results[i].gender,
                department: results[i].known_for_department,
                name: results[i].name,
                popularity: results[i].popularity,
                profile_path: results[i].profile_path,
            })
        }
        const descArray = resultArray.sort(
            (a, b) => b.popularity - a.popularity
        )
        return {
            status: 201,
            data: {
                total_pages,
                total_results,
                current_page: page,
                search: resultArray,
            },
        }
    } catch (e: any) {
        console.error(e)
    }
}

const genreSearch = async (params: any, connection: DbConnection) => {}

//장르 검색 추가

export default {
    movieSearch,
    actorSearch,
}
