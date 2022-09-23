import { DbConnection } from '../../modules/connect'
import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { tmdbErrorHandler } from './../../modules/paramsError'

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

const getCredits = async (params: any, conncetion: DbConnection) => {
    const { movieId } = params
    const movieCredits: any[] = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=ko`
        )
        for (let i = 0; i < 7; i++) {
            movieCredits.push(response.data.cast[i])
        }
        return {
            status: 201,
            data: movieCredits,
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

export default {
    getCredits,
}
