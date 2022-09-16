import { DbConnection } from "../../modules/connect";
import TMDB from "../../configs/tmdb";
import { tmdbErrorHandler } from "./../../modules/paramsError";
import axios from "axios";

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB;

const getAllThemes = async (params: any, connection: DbConnection) => {
  const response = await connection.run(`SELECT * FROM movie_theme`);
  return {
    status: 201,
    data: response,
  };
};

const getMoviesFromTheme = async (params: any, connection: DbConnection) => {
  const { name } = params; //path
  let response = {};
  try {
    response = await connection.run(
      `SELECT * FROM movie_theme WHERE theme_name=?`,
      [name]
    );
  } catch (e: any) {
    tmdbErrorHandler(e);
  }
  return {
    status: 201,
    data: response,
  };
};

interface MovieInfoType {
  themeName: string;
  movieId: string;
  movieName: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
}

const insertMoviesinTheme = async (params: any, connection: DbConnection) => {
  const { name, movieId } = params;
  let insertMovie: MovieInfoType;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko`
    );
    const movieDetails = response.data;
    await connection.run(
      "INSERT INTO movie_theme(theme_name,movie_id,movie_name,release_date,poster_path,backdrop_path) VALUES (?,?,?,?,?,?)",
      [
        name,
        movieDetails.id,
        movieDetails.title,
        movieDetails.release_date,
        movieDetails.poster_path,
        movieDetails.backdrop_path,
      ]
    );
    insertMovie = {
      themeName: name,
      movieId: movieDetails.id,
      movieName: movieDetails.title,
      releaseDate: movieDetails.release_date,
      posterPath: movieDetails.poster_path,
      backdropPath: movieDetails.backdrop_path,
    };
    console.log(insertMovie);
    return {
      status: 201,
      data: insertMovie,
    };
  } catch (e: any) {
    tmdbErrorHandler(e);
  }
};

export default {
  getAllThemes,
  getMoviesFromTheme,
  insertMoviesinTheme,
};
