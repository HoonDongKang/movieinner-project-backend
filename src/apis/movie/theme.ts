import { DbConnection } from "../../modules/connect";
import { paramsErrorHandler } from "../../modules/paramsError";

const getMoviesFromTheme = async (params: any, connection: DbConnection) => {
  const { name } = params; //path
  let response = [];
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

const insertMoviesinTheme = async (params: any, connection: DbConnection) => {};

export default {
  getMoviesFromTheme,
  insertMoviesinTheme,
};
