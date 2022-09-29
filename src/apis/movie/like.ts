import { paramsErrorHandler, tmdbErrorHandler } from "../../modules/paramsError";
import { DbConnection } from "./../../modules/connect";
//err handler 확인
//찜하기 확인
const checkLiked = async (params: any, connection: DbConnection) => {
  const { type, nickname, movieId,name } = params;
  let isExisted = false;
  try {
    if (type === "movie") {
      const response = await connection.run(
        `SELECT COUNT(*) AS count FROM liked WHERE type=? AND nickname=? AND movie_id=?`,
        [type, nickname, movieId]
      );
      const { count } = response[0];
      if (count > 0) {
        isExisted = true;
      }
    } else if (type === "theme") {
      const response = await connection.run(
        `SELECT COUNT(*) AS count FROM liked WHERE type=? AND nickname=? AND name=?`,
        [type, nickname, name]
      );
      const { count } = response[0];
      if (count > 0) {
        isExisted = true;
      }
    }else{
        throw 'E0001'
    }
  } catch (e: any) {
    paramsErrorHandler(e)
  }
  return {
    status: 201,
    data: {
      isExisted,
    },
  };
};
//찜한 영화
const likedMovie = async (params: any, connection: DbConnection) => {
  const { type, nickname, movieId, name, poster_path, backdrop_path } = params;
  try {
    if (type === "movie") {
      const response = await connection.run(
        `INSERT INTO liked(type,nickname,movie_id,name,poster_path,backdrop_path) VALUES (?,?,?,?,?,?)`,
        [type, nickname, movieId, name, poster_path, backdrop_path]
      );
    } else if (type === "theme") {
      const response = await connection.run(
        `INSERT INTO liked(type,nickname,name) VALUES (?,?,?)`,
        [type, nickname, name]
      );
    }

    return {
      status: 201,
      data: {
        success: true,
      },
    };
  } catch (e: any) {
    tmdbErrorHandler(e);
  }
};

//찜하기 취소
const deleteLike = async (params: any, connection: DbConnection) => {
  const { type, nickname, name } = params;
  try {
    const response = await connection.run(
      `DELETE FROM liked WHERE type=? AND nickname=? AND name=?`,
      [type, nickname, name]
    );
    return {
      status: 201,
      data: {
        success: true,
      },
    };
  } catch (e: any) {
    tmdbErrorHandler(e);
  }
};
//최근 감상 작품

export default {
  checkLiked,
  likedMovie,
  deleteLike,
};
