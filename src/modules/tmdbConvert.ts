import { MovieResultArrayType } from "../apis/search/movieSearch";

export const genreId = [
  {
    id: 28,
    name: "액션",
  },
  {
    id: 12,
    name: "모험",
  },
  {
    id: 16,
    name: "애니메이션",
  },
  {
    id: 35,
    name: "코미디",
  },
  {
    id: 80,
    name: "범죄",
  },
  {
    id: 99,
    name: "다큐멘터리",
  },
  {
    id: 18,
    name: "드라마",
  },
  {
    id: 10751,
    name: "가족",
  },
  {
    id: 14,
    name: "판타지",
  },
  {
    id: 36,
    name: "역사",
  },
  {
    id: 27,
    name: "공포",
  },
  {
    id: 10402,
    name: "음악",
  },
  {
    id: 9648,
    name: "미스터리",
  },
  {
    id: 10749,
    name: "로맨스",
  },
  {
    id: 878,
    name: "SF",
  },
  {
    id: 10770,
    name: "TV 영화",
  },
  {
    id: 53,
    name: "스릴러",
  },
  {
    id: 10752,
    name: "전쟁",
  },
  {
    id: 37,
    name: "서부",
  },
];

const genderId = [
  {
    id: 0,
    name: "정해지지 않음",
  },
  {
    id: 1,
    name: "여",
  },
  {
    id: 2,
    name: "남",
  },
];
// 장르 별 숫자 -> 글자로 변환

export const convertGenreIdtoName = (tmdbArray: any) => {
  for (let i = 0; i < tmdbArray.length; i++) {
    let { genre } = tmdbArray[i];
    for (let j = 0; j < genre.length; j++) {
      for (let k = 0; k < genreId.length; k++) {
        if (genre[j] === genreId[k].id) {
          genre[j] = genreId[k].name;
        }
      }
    }
  }
};
export const convertGenderIdtoName = (tmdbArray: any) => {
  for (let i = 0; i < tmdbArray.length; i++) {
    let { gender } = tmdbArray[i];
    for (let j = 0; j < genderId.length; j++) {
      if (gender === genderId[j].id) {
        tmdbArray[i].gender = genderId[j].name;
      }
    }
  }
};
