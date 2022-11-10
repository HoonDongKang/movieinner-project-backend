import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'
import { changeDbTimeForm } from './../../modules/changeTimeForm'

const contentsTitleSearch = async (params: any, connection: DbConnection) => {
    let { title } = params //query params
    // params 띄어쓰기 제거
    title = title.replace(/ /g, '') // g-> slash 안에 모든 문자 변경
    try {
        // DB 값 띄어쓰기 제거
        const response = await connection.run(
            `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(title," ","") LIKE ? ORDER BY hit DESC`,
            ['%' + title + '%']
        )
        changeDbTimeForm(response)
        return {
            status: 200,
            data: {
                searchResult: response,
            },
        }
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    contentsTitleSearch,
}
