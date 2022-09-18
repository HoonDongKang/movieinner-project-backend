import { DbConnection } from '../../modules/connect'
import TMDB from '../../configs/tmdb'
import { tmdbErrorHandler } from './../../modules/paramsError'
import axios from 'axios'

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

interface MovieInfoType {
    themeName: string
    movieId: string
    movieName: string
    releaseDate: string
    posterPath: string
    backdropPath: string
}

const getAllThemes = async (params: any, connection: DbConnection) => {
    const response = await connection.run(`SELECT * FROM movie_theme`)
    return {
        status: 201,
        data: response,
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

const insertMoviesinTheme = async (params: any, connection: DbConnection) => {
    const { name, movieId } = params
    let insertMovie: MovieInfoType = {
        themeName: '',
        movieId: '',
        movieName: '',
        releaseDate: '',
        posterPath: '',
        backdropPath: '',
    }
    let movieDetails: any = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko`
        )
        movieDetails = response.data
        insertMovie = {
            themeName: name,
            movieId: movieDetails.id,
            movieName: movieDetails.title,
            releaseDate: movieDetails.release_date,
            posterPath: movieDetails.poster_path,
            backdropPath: movieDetails.backdrop_path,
        }
        await connection.run(
            `INSERT INTO movie_theme(theme_name,movie_id,movie_name,release_date,poster_path,backdrop_path) VALUES (?,?,?,?,?,?)`,
            [
                name,
                insertMovie.movieId,
                insertMovie.movieName,
                insertMovie.releaseDate,
                insertMovie.posterPath,
                insertMovie.backdropPath,
            ]
        )
    } catch (e: any) {
        console.log(e)
    }
    return {
        status: 201,
        data: insertMovie,
    }
}

export default {
    getAllThemes,
    getMoviesFromTheme,
    insertMoviesinTheme,
}
