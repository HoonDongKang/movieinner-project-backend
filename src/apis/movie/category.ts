import axios from "axios"
import { convertGenreIdtoName } from "../../modules/tmdbConvert"
import TMDB from "../../configs/tmdb"
import {
    MovieResultArrayType,
    TmdbResultArrayType,
} from "../search/movieSearch"
import { paramsErrorHandler } from "../../modules/paramsError"

const { TMDB_API_KEY } = TMDB

const searchCategory = async (
    params: { search: string; searchPage: string },
    connection: never
) => {
    const { search, searchPage } = params //query search:id
    let resultArray: Array<MovieResultArrayType> = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${search}&page=${searchPage}&language=ko`
        )
        const { page, results, total_pages, total_results } = response.data

        results.forEach((objects: TmdbResultArrayType) => {
            resultArray.push({
                id: objects.id,
                genre: objects.genre_ids,
                title: objects.title,
                poster_path: objects.poster_path,
                release_date: objects.release_date,
                popularity: objects.popularity,
            })
        })
        convertGenreIdtoName(resultArray)

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
        paramsErrorHandler(e)
    }
}

export default {
    searchCategory,
}
