import { DbConnection } from '../../modules/connect'
import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { paramsErrorHandler } from './../../modules/paramsError'

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

const getCredits = async (params: any, conncetion: DbConnection) => {
    const { movieId } = params
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=ko`
        )
        const movieDetails = response.data.cast
        return {
            status: 201,
            data: movieDetails,
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    getCredits,
}
