// 테마별 영화 정리
export const organizeThemeForm = (themeArray: any) => {
    let duplicateThemeNames: any[] = []
    themeArray.map((resObj: any) => {
        duplicateThemeNames.push(resObj.theme_name)
    })
    //theme 이름 중복 제거
    const themeNames = [...new Set(duplicateThemeNames)]

    //db theme 가져오기
    let movieInfo: any[] = []

    for (let i = 0; i < themeArray.length; i++) {
        movieInfo.push({
            theme_name: themeArray[i].theme_name,
            movie_id: themeArray[i].movie_id,
            movie_name: themeArray[i].movie_name,
            poster_path: themeArray[i].poster_path,
            backdrop_path: themeArray[i].backdrop_path,
            release_date: themeArray[i].release_date,
        })
    }
    //theme 별 영화 객체
    let movieThemeList: any = {}

    for (let i = 0; i < themeNames.length; i++) {
        movieThemeList[themeNames[i]] = []
        for (let j = 0; j < movieInfo.length; j++) {
            if (themeNames[i] === movieInfo[j].theme_name) {
                movieThemeList[themeNames[i]] = [
                    ...movieThemeList[themeNames[i]],
                    movieInfo[j],
                ]
            }
        }
    }
    return movieThemeList
}
