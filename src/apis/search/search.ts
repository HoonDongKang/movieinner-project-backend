import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'
import { changeDbTimeForm } from './../../modules/changeTimeForm'

const contentsSearchByTitle = async (params: any, connection: DbConnection) => {
    let { type, search } = params //query params
    // params 띄어쓰기 제거
    search = search.replace(/ /g, '') // g-> slash 안에 모든 문자 변경
    try {
        // DB 값 띄어쓰기 제거
        if (type === 'title') {
            const response = await connection.run(
                `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(title," ","") LIKE ? ORDER BY hit DESC`,
                ['%' + search + '%']
            )
            changeDbTimeForm(response)
            return {
                status: 200,
                data: {
                    searchResult: response,
                },
            }
        } else if (type === 'content') {
            const response = await connection.run(
                `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(content," ","") LIKE ? ORDER BY hit DESC`,
                ['%' + search + '%']
            )
            changeDbTimeForm(response)
            return {
                status: 200,
                data: {
                    searchResult: response,
                },
            }
        } else if (type === 'writer') {
            const response = await connection.run(
                `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(nickname," ","") LIKE ? ORDER BY hit DESC`,
                ['%' + search + '%']
            )
            changeDbTimeForm(response)
            return {
                status: 200,
                data: {
                    searchResult: response,
                },
            }
        } else if (type === 'titleAndContent') {
            const response = await connection.run(
                `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(content," ","") LIKE ? OR replace(title," ","") LIKE ? ORDER BY hit DESC`,
                ['%' + search + '%', '%' + search + '%']
            )
            changeDbTimeForm(response)
            return {
                status: 200,
                data: {
                    searchResult: response,
                },
            }
        }
    } catch (e: any) {
        console.error(e)
    }
}
//type
//title
//content
//writer
//titleAndContent

//search
export default {
    contentsSearchByTitle,
}
