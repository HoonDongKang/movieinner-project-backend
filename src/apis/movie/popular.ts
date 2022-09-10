import { DbConnection } from '../../modules/connect'
import axios from 'axios'
import TMDB from '../../configs/tmdb'

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

const getPopularMovies = async (params: any, connection: DbConnection) => {
    try {
        const response = axios.post(
            `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ko&page=1`
        )
    } catch (e: any) {
        throw new Error(e)
    }
}
