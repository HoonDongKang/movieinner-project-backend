import { DbConnection } from "../../modules/connect";
import TMDB from '../../configs/tmdb'
import { paramsErrorHandler } from './../../modules/paramsError'
import axios from "axios";

const { TMDB_API_KEY, TMDB_IMAGE_URL } = TMDB

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
    paramsErrorHandler(e);
  }
  return {
    status: 201,
    data: response,
  };
};

const insertMoviesinTheme = async (params: any, connection: DbConnection) => {
  const { movieId } = params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko`
  )
  } catch (e: any) {
    paramsErrorHandler(e);
  }
  return {
    status: 201,
    data: {
      success: true,
    },
  };
};

export default {
  getAllThemes,
  getMoviesFromTheme,
  insertMoviesinTheme,
};
