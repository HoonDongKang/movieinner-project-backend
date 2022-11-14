import { DbConnection } from './../../modules/connect'
import TMDB from '../../configs/tmdb'
import axios from 'axios'

const { TMDB_API_KEY } = TMDB

const movieSearch = async (params: any, connection: DbConnection) => {
    const { search, searchPage } = params
    let resultArray: any[] = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko&query=${search}&page=${searchPage}`
        )
        const { page, results, total_pages, total_results } = response.data
        for (let i = 0; i < results.length; i++) {
            resultArray.push({
                id: results[i].id,
                title: results[i].title,
                poster_path: results[i].poster_path,
                release_date: results[i].release_date,
                popularity: results[i].popularity,
            })
        }
        return {
            status: 200,
            data: {
                total_pages,
                total_results,
                current_page: page,
                search: resultArray,
            },
        }
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    movieSearch,
}
