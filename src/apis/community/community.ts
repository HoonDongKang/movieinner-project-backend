import { DbConnection } from "./../../modules/connect"
import { paramsErrorHandler } from "./../../modules/paramsError"
import { getContentsPerPages } from "./../../modules/getContents"
import { changeDbTimeForm } from "./../../modules/changeTimeForm"
//
const getAllContents = async (
    params: { page: string },
    connection: DbConnection
) => {
    const { page } = params
    try {
        const response = await connection.run(
            `SELECT CMT.idx,INFO.nickname,CMT.title,CMT.content,CMT.file,CMT.hit,CMT.created_at FROM community as CMT INNER JOIN user_info as INFO on CMT.user_idx=INFO.idx`,
            []
        )
        changeDbTimeForm(response)
        const { totalPage, contents: responseContents } = getContentsPerPages(
            response,
            20,
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

const getUserContent = async (
    params: { userIdx: string },
    connection: DbConnection
) => {
    const { userIdx } = params //query
    try {
        const response = await connection.run(
            `SELECT CMT.idx, INFO.nickname ,CMT.title,CMT.content,CMT.file,CMT.created_at FROM community AS CMT INNER JOIN user_info AS INFO ON CMT.user_idx = INFO.idx WHERE INFO.idx=?`,
            [userIdx]
        )
        changeDbTimeForm(response)
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
const getIdxContent = async (
    params: { idx: string },
    connection: DbConnection
) => {
    const { idx } = params //path
    try {
        const response = await connection.run(
            `SELECT INFO.nickname,INFO.image_URL,CMT.title,CMT.content,CMT.file,CMT.created_at FROM community AS CMT INNER JOIN user_info AS INFO ON CMT.user_idx = INFO.idx WHERE CMT.idx=?`,
            [idx]
        )
        changeDbTimeForm(response)
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
