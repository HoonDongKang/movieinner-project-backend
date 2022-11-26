import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'
import { changeDbTimeForm } from '../../modules/changeTimeForm'
import { getContentsPerPages } from '../../modules/getContents'

const contentsSearch = async (
    params: { type: string; search: string; page: string },
    connection: DbConnection
) => {
    let { type, search, page } = params //path: type,  query: search,page
    let response: any[] = []
    // params 띄어쓰기 제거
    search = search.replace(/ /g, '') // g-> slash 안에 모든 문자 변경
    try {
        // DB 값 띄어쓰기 제거
        if (type === 'title') {
            response = await connection.run(
                `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(title," ","") LIKE ? ORDER BY hit DESC`,
                ['%' + search + '%']
            )
        } else if (type === 'content') {
            response = await connection.run(
                `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(content," ","") LIKE ? ORDER BY hit DESC`,
                ['%' + search + '%']
            )
        } else if (type === 'writer') {
            response = await connection.run(
                `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(nickname," ","") LIKE ? ORDER BY hit DESC`,
                ['%' + search + '%']
            )
        } else if (type === 'titleAndContent') {
            response = await connection.run(
                `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(content," ","") LIKE ? OR replace(title," ","") LIKE ? ORDER BY hit DESC`,
                ['%' + search + '%', '%' + search + '%']
            )
        }
        changeDbTimeForm(response)
        const { totalPage, contents: responseContents } = getContentsPerPages(
            response,
            20,
            page
        )
        return {
            status: 200,
            data: {
                searchResult: {
                    totalPage,
                    currentPage: page,
                    responseContents,
                },
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    contentsSearch,
}
