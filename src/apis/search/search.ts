import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'

const contentsTitleSearch = async (params: any, connection: DbConnection) => {
    let { title } = params
    title = title.replace(/ /g, '')
    try {
        const response = await connection.run(
            `SELECT * FROM community WHERE content LIKE ?`,
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
