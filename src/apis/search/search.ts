import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'

const contentsSearch = async (params: any, connection: DbConnection) => {
    const { keyWord } = params
    try {
        const response = await connection.run(
            `SELECT * FROM community WHERE content LIKE '%'+?+'%'`,
            [keyWord]
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
    contentsSearch,
}
