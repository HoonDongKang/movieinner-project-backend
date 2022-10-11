import { DbConnection } from './../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'

const writeComment = async (params: any, connection: DbConnection) => {
    const { contentIdx, nickname, comment, commented_at } = params
    try {
        await connection.run(
            `INSERT INTO comments(content_idx,nickname,comment,commented_at) VALUES (?,?,?,?)`,
            [contentIdx, nickname, comment, commented_at]
        )
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}
const modifyComment = async (params: any, connection: DbConnection) => {}
const deleteComment = async (params: any, connection: DbConnection) => {}

const getIdxComments = async (params: any, connection: DbConnection) => {}

const getUserComments = async (params: any, connection: DbConnection) => {}

export default {
    writeComment,
    modifyComment,
    deleteComment,
    getIdxComments,
    getUserComments,
}
