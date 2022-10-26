import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'
//
const writeComment = async (params: any, connection: DbConnection) => {
    const { contentIdx, nickname, comment, commentedAt } = params
    try {
        await connection.run(
            `INSERT INTO comments(content_idx,nickname,comment,commented_at) VALUES (?,?,?,?)`,
            [contentIdx, nickname, comment, commentedAt]
        )
        return {
            status: 201,
            data: {
                success: true,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}
const modifyComment = async (params: any, connection: DbConnection) => {
    const { idx, contentIdx, comment } = params
    try {
        await connection.run(
            `UPDATE comments SET comment=? WHERE idx=? AND content_idx=?`,
            [comment, idx, contentIdx]
        )
        return {
            status: 201,
            data: {
                success: true,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}
const deleteComment = async (params: any, connection: DbConnection) => {
    const { idx, contentIdx } = params
    try {
        await connection.run(
            `DELETE FROM community WHERE idx=? AND content_idx=?`,
            [idx, contentIdx]
        )
        return {
            status: 201,
            data: {
                success: true,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const getIdxComments = async (params: any, connection: DbConnection) => {
    const { idx } = params
    try {
        await connection.run(`SELECT FROM community WHERE idx=?`, [idx])
        return {
            status: 201,
            data: {
                success: true,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const getUserComments = async (params: any, connection: DbConnection) => {}

export default {
    writeComment,
    modifyComment,
    deleteComment,
    getIdxComments,
    getUserComments,
}
