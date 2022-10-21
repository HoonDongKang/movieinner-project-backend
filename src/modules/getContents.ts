export const getContentsPerPages = (
    array: any[], // contents array
    contentsNumberPerPage: number, // the number of contents in a page
    page: string // a page that to be responsed
) => {
    let contents: any = {}
    //게시글 번호
    for (let i = 0; i < array.length; i++) {
        array[i]['number'] = i + 1
    }
    // 게시글 수
    let contentsNumber: number = array.length - 1

    // 총 페이지 수
    const pageNumber = Math.trunc(contentsNumber / contentsNumberPerPage)
    const totalPage =
        contentsNumber % contentsNumberPerPage === 0
            ? pageNumber
            : pageNumber + 1

    for (let i = 1; i < totalPage + 1; i++) {
        contents[i] = []
        for (
            // 총 게시글 수 - 페이지 별 게시글 수 < 0 -> 남아있는 게시글만 표시되게
            let j = contentsNumber;
            contentsNumber - contentsNumberPerPage > 0
                ? j > contentsNumber - contentsNumberPerPage
                : j >= 0;
            j--
        ) {
            contents[i].push(array[j])
        }
        contentsNumber -= contentsNumberPerPage
    }
    const responseContents = contents[page]

    // 배열 10개씩 말고 있는 수만큼만 보여주기
    return { totalPage: totalPage, contents: responseContents }
}
