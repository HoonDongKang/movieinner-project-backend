import { DbConnection } from './../../modules/connect'
import TMDB from '../../configs/tmdb'

const { TMDB_API_KEY } = TMDB

const movieSearch = async (params: any, connection: DbConnection) => {
    const { search, searchPage } = params
    let
    try {
        const response = await connection.run(`
        https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko&query=${search}&page=${searchPage}`)
        const { page, results, total_pages, total_results } = response
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    movieSearch,
}
