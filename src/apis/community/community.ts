import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'

const getAllContents = async (params: any, connection: DbConnection) => {
    const { page } = params
    let contents:any={}
    try {
        const response: any = await connection.run(
            `SELECT nickname,title,content,file FROM community`,
            []
        )
        // 게시글 수
        const contentsNumber: number = response.length
        // 페이지 당 게시글 표시 수
        const contentsNumberInPage: number = 10
        // 총 페이지 수
        const pageNumber = Math.trunc(contentsNumber / contentsNumberInPage)
        const totalPage =
            contentsNumber % contentsNumberInPage === 0
                ? pageNumber
                : pageNumber + 1
        //반복문 반복마다 array에 push할 contents의 index
        let pushNumber = 0
        for (let i=1;i<totalPage+1;i++){
            contents[i]=[]
          for (let j=pushNumber;j<pushNumber+contentsNumberInPage;j++){
            contents[i].push(response[j])
          }
          pushNumber+=contentsNumberInPage
        }
        const responseContents=contents[page]
        return {
            status: 200,
            data: {
                contents:{"page":page,
                    responseContents},
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

export default {
    getAllContents,
    getUserContent,
}
