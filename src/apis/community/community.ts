import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'
//
const getAllContents = async (params: any, connection: DbConnection) => {
    const { page } = params
    let contents: any = {}
    try {
        const response: any = await connection.run(
            `SELECT idx,nickname,title,content,file FROM community`,
            []
        )
        //게시글 번호
        for (let i = 0; i < response.length; i++) {
            response[i]['number'] = i + 1
        }
        // 게시글 수
        let contentsNumber: number = response.length - 1
        // 페이지 당 게시글 표시 수
        const contentsNumberInPage: number = 10
        // 총 페이지 수
        const pageNumber = Math.trunc(contentsNumber / contentsNumberInPage)
        const totalPage =
            contentsNumber % contentsNumberInPage === 0
                ? pageNumber
                : pageNumber + 1

        for (let i = 1; i < totalPage + 1; i++) {
            contents[i] = []
            for (
                let j = contentsNumber;
                j > contentsNumber - contentsNumberInPage;
                j--
            ) {
                console.log(j)
                contents[i].push(response[j])
            }
            contentsNumber -= contentsNumberInPage
        }
        const responseContents = contents[page]

        for (let i = 0; i < responseContents.length; i++) {
            if (!responseContents[i]) {
                responseContents[i] = {}
            }
        }
        return {
            status: 200,

            data: {
                contents: { page: page, responseContents },
            },
        }
    } catch (e: any) {
        console.error(e)
    }
}

const getUserContent = async (params: any, connection: DbConnection) => {
    const { nickname } = params //query
    try {
        const response = await connection.run(
            `SELECT nickname,title,content,file FROM community WHERE nickname=?`,
            [nickname]
        )
        return {
            status: 200,
            data: {
                response,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const getIdxContent = async (params: any, connection: DbConnection) => {
    const { idx } = params //query
    try {
        const response = await connection.run(
            `
        SELECT nickname,title,content,file FROM community WHERE idx =?`,
            [idx]
        )

        return {
            status: 200,
            data: {
                content: response[0],
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    getAllContents,
    getUserContent,
    getIdxContent,
}
