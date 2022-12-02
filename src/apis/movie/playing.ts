import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { convertGenreIdtoName } from '../../modules/tmdbConvert'
import { tmdbErrorHandler } from './../../modules/paramsError'
import {
    MovieResultArrayType,
    TmdbResultArrayType,
} from './../search/movieSearch'

const { TMDB_API_KEY } = TMDB

const upcomingMovies = async (
    params: { searchPage: string },
    connection: never
) => {
    const { searchPage } = params
    let resultArray: Array<MovieResultArrayType> = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=ko&page=${searchPage}`
        )
        const { page, results, total_pages, total_results } = response.data

        results.forEach((objects: TmdbResultArrayType) => {
            resultArray.push({
                id: objects.id,
                genre: objects.genre_ids,
                title: objects.title,
                poster_path: objects.poster_path,
                release_date: objects.release_date,
                popularity: objects.popularity,
            })
        })
        convertGenreIdtoName(resultArray)
        return {
            status: 201,
            data: {
                page,
                total_pages,
                total_results,
                resultArray,
            },
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

const nowPlayingMovies = async (
    params: { searchPage: string },
    connection: never
) => {
    const { searchPage } = params
    let resultArray: Array<MovieResultArrayType> = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=ko&page=${searchPage}`
        )
        const { page, results, total_pages, total_results } = response.data

        results.forEach((objects: TmdbResultArrayType) => {
            resultArray.push({
                id: objects.id,
                genre: objects.genre_ids,
                title: objects.title,
                poster_path: objects.poster_path,
                release_date: objects.release_date,
                popularity: objects.popularity,
            })
        })
        convertGenreIdtoName(resultArray)
        return {
            status: 201,
            data: {
                page,
                total_pages,
                total_results,
                resultArray,
            },
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

export default {
    upcomingMovies,
    nowPlayingMovies,
}
