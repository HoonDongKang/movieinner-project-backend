import { DbConnection } from '../../modules/connect'
import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { tmdbErrorHandler } from './../../modules/paramsError'

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

const getPopularMovies = async (params: any, connection: DbConnection) => {
    //query
    const { page } = params //path
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ko&page=${page}`
        )
        const popularMovieList = response.data.results
        return {
            status: 201,
            data: popularMovieList,
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

export default {
    getPopularMovies,
}
