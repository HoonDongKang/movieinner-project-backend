import { DbConnection } from '../../modules/connect'
import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { paramsErrorHandler } from './../../modules/paramsError'

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

const getMoviesDetails = async (params: any, connection: DbConnection) => {
    const { movieId } = params
    console.log(movieId)
    try {
        const response = await axios.post(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko`
        )
        const movieDetails = response
        console.log(response)
        return {
            status: 201,
            data: response,
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    getMoviesDetails,
}
