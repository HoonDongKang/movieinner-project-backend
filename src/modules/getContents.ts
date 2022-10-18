export const getContentsPerPages = (
    array: any[], // contents array
    contentsNumberPerPage: number, // a number of contents in a page
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
            let j = contentsNumber;
            j > contentsNumber - contentsNumberPerPage;
            j--
        ) {
            console.log(j)
            contents[i].push(array[j])
        }
        contentsNumber -= contentsNumberPerPage
    }
    const responseContents = contents[page]
    //undefined to void obj
    for (let i = 0; i < responseContents.length; i++) {
        if (!responseContents[i]) {
            responseContents[i] = {}
        }
    }
    // 배열 10개씩 말고 있는 수만큼만 보여주기
    return { totalPage: totalPage, contents: responseContents }
}
