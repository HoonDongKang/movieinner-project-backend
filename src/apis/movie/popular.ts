import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { convertGenreIdtoName } from '../../modules/tmdbConvert'
import { MovieResultArrayType } from '../search/movieSearch'
import { tmdbErrorHandler } from './../../modules/paramsError'

const { TMDB_API_KEY } = TMDB

const getPopularMovies = async (params: never, connection: never) => {
    let trendingMovieArray: Array<MovieResultArrayType> = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&language=ko&page=1`
        )
        const { results } = response.data

        for (let i = 0; i < 10; i++) {
            trendingMovieArray.push({
                id: results[i].id,
                genre: results[i].genre_ids,
                title: results[i].title,
                poster_path: results[i].poster_path,
                release_date: results[i].release_date,
                popularity: results[i].popularity,
            })
        }
        convertGenreIdtoName(trendingMovieArray)
        return {
            status: 201,
            data: trendingMovieArray,
        }
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
}

export default {
    getPopularMovies,
}
