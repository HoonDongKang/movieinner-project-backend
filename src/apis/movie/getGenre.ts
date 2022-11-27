import axios from 'axios'
import TMDB from '../../configs/tmdb'

const { TMDB_API_KEY } = TMDB

const getGenre = async (param: never, connection: never) => {
    try {
        const response: any = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=ko`
        )
        return {
            status: 200,
            data: response.data,
        }
    } catch (e: any) {
        console.error(e)
    }
}

export default { getGenre }
