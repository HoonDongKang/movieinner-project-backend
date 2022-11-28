//카테고리별 영화 만들기
import axios from "axios";
import {
  convertGenderIdtoName,
  convertGenreIdtoName,
  genreId,
} from "../../modules/tmdbConvert";
import { DbConnection } from "./../../modules/connect";
import TMDB from "../../configs/tmdb";

const { TMDB_API_KEY } = TMDB;

const searchCategory = async (params: any, connection: DbConnection) => {
  const { search, searchPage } = params; //query search:id
  let resultArray: any[] = [];
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${search}&page=${searchPage}&language=ko`
    );
    const { page, results, total_pages, total_results } = response.data;

    results.forEach((objects:any) => {
      resultArray.push({
        id: objects.id,
        genre: objects.genre_ids,
        title: objects.title,
        poster_path: objects.poster_path,
        release_date: objects.release_date,
        popularity: objects.popularity,
      });
    });
    return {
      status: 200,
      data: resultArray,
    };
  } catch (e: any) {
    console.error(e);
  }
};

export default {
  searchCategory,
};
