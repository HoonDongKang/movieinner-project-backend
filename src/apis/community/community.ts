import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'

const getAllContents = async (params: any, connection: DbConnection) => {
    try {
        const response: any = await connection.run(
            `SELECT nickname,title,content,file FROM community`,
            []
        )
        let contents: any = {}
        return {
            status: 200,
            data: {
                contents,
            },
        }
    } catch (e: any) {
        console.error(e)
    }
}

const getUserContent = async (params: any, connection: DbConnection) => {
    const { nickname } = params //path
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
