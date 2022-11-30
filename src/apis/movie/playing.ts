import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { tmdbErrorHandler } from './../../modules/paramsError'

const { TMDB_API_KEY } = TMDB

const upcomingMovies = async (params: { page: string }, connection: never) => {
    const { page } = params
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=ko&page=${page}`
        )
        const movieDetails = response.data
        return {
            status: 201,
            data: movieDetails,
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

const nowPlayingMovies = async (
    params: { page: string },
    connection: never
) => {
    const { page } = params
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=ko&page=${page}`
        )
        const movieDetails = response.data
        return {
            status: 201,
            data: movieDetails,
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

export default {
    upcomingMovies,
    nowPlayingMovies,
}
