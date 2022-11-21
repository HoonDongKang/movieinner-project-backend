import { DbConnection } from '../../modules/connect'
import TMDB from '../../configs/tmdb'
import { tmdbErrorHandler } from './../../modules/paramsError'
import axios from 'axios'
import { organizeThemeForm } from './../../modules/organizeThemeForm'

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

const getAllThemes = async (params: any, connection: DbConnection) => {
    const response = await connection.run(`SELECT * FROM movie_theme`)
    const movieThemeList = organizeThemeForm(response)
    return {
        status: 201,
        data: movieThemeList,
    }
}

const getMoviesFromTheme = async (params: any, connection: DbConnection) => {
    const { name } = params //path
    let response = {}
    try {
        response = await connection.run(
            `SELECT * FROM movie_theme WHERE theme_name=?`,
            [name]
        )
    } catch (e: any) {
        tmdbErrorHandler(e)
    }
    return {
        status: 201,
        data: response,
    }
}

const insertMoviesInTheme = async (params: any, connection: DbConnection) => {
    const { name, movieId } = params
    let movieDetails: any = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko`
        )
        movieDetails = response.data
        await connection.run(
            `INSERT INTO movie_theme(theme_name,movie_id,movie_name,release_date,poster_path,backdrop_path) VALUES (?,?,?,?,?,?)`,
            [
                name,
                movieDetails.id,
                movieDetails.title,
                movieDetails.release_date,
                movieDetails.poster_path,
                movieDetails.backdrop_path,
            ]
        )
    } catch (e: any) {
        console.log(e)
    }
    return {
        status: 201,
        success: true,
    }
}

export default {
    getAllThemes,
    getMoviesFromTheme,
    insertMoviesInTheme,
}
