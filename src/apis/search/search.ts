import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'

const contentsTitleSearch = async (params: any, connection: DbConnection) => {
    let { title } = params
    title = title.replace(/ /g, '') // g-> slash 안에 모든 문자 변경
    try {
        const response = await connection.run(
            `SELECT idx,nickname,title,content,file,hit,created_at FROM community WHERE replace(title," ","") LIKE ?`,
            ['%' + title + '%']
        )
        return {
            status: 200,
            data: {
                response,
            },
        }
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    contentsTitleSearch,
}
