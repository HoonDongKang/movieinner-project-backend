import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'
import { getContentsPerPages } from './../../modules/getContents'

const getAllContents = async (params: any, connection: DbConnection) => {
    const { page } = params
    try {
        const response: any = await connection.run(
            `SELECT idx,nickname,title,content,file,hit,created_at FROM community`,
            []
        )
        for (let i = 0; i < response.length; i++) {
            const timeStamp = new Date(
                response[i].updated_at - new Date().getTimezoneOffset() * 120000 //한국 시간
            )
            const date = timeStamp.toISOString().substring(0, 10)
            response[i].updated_at = date
        }

        const { totalPage, contents: responseContents } = getContentsPerPages(
            response,
            10,
            page
        )
        return {
            status: 200,

            data: {
                contents: { totalPage, currentPage: page, responseContents },
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
        SELECT nickname,title,content,file,created_at FROM community WHERE idx =?`,
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
