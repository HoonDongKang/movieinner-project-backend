import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'
//
const writeComment = async (params: any, connection: DbConnection) => {
    const { contentIdx, nickname, comment, commentedAt } = params
    try {
        if (commentedAt === undefined) {
            await connection.run(
                `INSERT INTO comments(content_idx,nickname,comment) VALUES (?,?,?)`,
                [contentIdx, nickname, comment]
            )
        } else {
            await connection.run(
                `INSERT INTO comments(content_idx,nickname,comment,commentedAt) VALUES (?,?,?,?)`,
                [contentIdx, nickname, comment, commentedAt]
            )
        }
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
            `DELETE FROM comments WHERE idx=? AND content_idx=?`,
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
        const response = await connection.run(
            `SELECT FROM comments WHERE idx=?`,
            [idx]
        )
        return {
            status: 201,
            data: {
                response,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}
//nickname 수정 필요
const getUserComments = async (params: any, connection: DbConnection) => {
    const { nickname, idx } = params
    try {
        const response = await connection.run(
            `SELECT FROM comments WHERE nickname=? AND idx=?`,
            [nickname, idx]
        )
        return {
            status: 201,
            data: {
                response,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    writeComment,
    modifyComment,
    deleteComment,
    getIdxComments,
    getUserComments,
}
