import { DbConnection } from "../../modules/connect";
import { paramsErrorHandler } from "../../modules/paramsError";

const getMoviesFromTheme = async (params: any, connection: DbConnection) => {
  const { name } = params; //path
  let response = {};
  try {
    if (name) {
      response = await connection.run(
        `SELECT * FROM movie_theme WHERE theme_name=?`,
        [name]
      );
    } else {
      response = await connection.run(`SELECT * FROM movie_theme`);
    }
  } catch (e: any) {
    paramsErrorHandler(e);
  }
  return {
    status: 201,
    data: response,
  };
};

const insertMoviesinTheme = async (params: any, connection: DbConnection) => {
  const { themeName, movieId, movieName } = params;
  try {
    await connection.run(
      `INSERT INTO movie_theme(theme_name,movie_id,movie_name) VALUES (?,?,?)`,
      [themeName, movieId, movieName]
    );
  } catch (e: any) {
    paramsErrorHandler(e);
  }
  return{
    status:201,
    data:{
        success:true
    }
  }
};

export default {
  getMoviesFromTheme,
  insertMoviesinTheme,
};
