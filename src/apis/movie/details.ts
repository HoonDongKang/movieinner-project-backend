import { DbConnection } from '../../modules/connect'
import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { tmdbErrorHandler } from './../../modules/paramsError'

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

const getMoviesDetails = async (params: any, connection: DbConnection) => {
    const { movieId } = params
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko`
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
    getMoviesDetails,
}
