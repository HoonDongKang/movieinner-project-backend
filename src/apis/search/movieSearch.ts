import { DbConnection } from './../../modules/connect'
import TMDB from '../../configs/tmdb'
import axios from 'axios'
import { paramsErrorHandler } from './../../modules/paramsError'
import {
    convertGenderIdtoName,
    convertGenreIdtoName,
} from './../../modules/tmdbConvert'
import { organizeThemeForm } from '../../modules/organizeThemeForm'
import { getContentsPerPages } from './../../modules/getContents'

export interface MovieResultArrayType {
    id: string
    genre: number[] | string[]
    title: string
    poster_path: string
    release_date: string
    popularity: number
}
export interface ActorResultArrayType {
    id: string
    gender: number | string
    department: string
    name: string
    popularity: number
    profile_path: string
}

const { TMDB_API_KEY } = TMDB
//genre id 추가하기
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
                genre: results[i].genre_ids,
                title: results[i].title,
                poster_path: results[i].poster_path,
                release_date: results[i].release_date,
                popularity: results[i].popularity,
            })
        }
        convertGenreIdtoName(resultArray)
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
        convertGenderIdtoName(resultArray)
        const descArray = resultArray.sort(
            (a, b) => b.popularity - a.popularity
        )
        return {
            status: 201,
            data: {
                total_pages,
                total_results,
                current_page: page,
                search: descArray,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

//page 별 설정?
//하나의 객체?
const genreSearch = async (params: any, connection: DbConnection) => {
    let { search, searchPage } = params
    search = search.replace(/ /g, '')
    try {
        const response = await connection.run(
            `SELECT theme_name, movie_id,movie_name,poster_path,backdrop_path,release_date FROM movie_theme WHERE replace(theme_name," ","") LIKE ?`,
            ['%' + search + '%']
        )
        const searchResult = organizeThemeForm(response)
        return {
            status: 200,
            data: searchResult,
        }
    } catch (e: any) {
        console.error(e)
    }
}

//장르 검색 추가

export default {
    movieSearch,
    actorSearch,
    genreSearch,
}
