import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'
import { changeDbTimeForm } from './../../modules/changeTimeForm'
import { getContentsPerPages } from './../../modules/getContents'
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
    const { idx, comment } = params
    try {
        await connection.run(`UPDATE comments SET comment=? WHERE idx=?`, [
            comment,
            idx,
        ])
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
    const { idx } = params
    try {
        await connection.run(`DELETE FROM comments WHERE idx=?`, [idx])
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
    const { contentIdx, page } = params //path: contentIdx, query: page
    try {
        const response = await connection.run(
            `SELECT idx, content_idx, nickname,comment, commented_at, created_at FROM comments WHERE content_idx=?`,
            [contentIdx]
        )
        changeDbTimeForm(response)
        const { totalPage, contents: comments } = getContentsPerPages(
            response,
            10,
            page
        )
        return {
            status: 201,
            data: {
                contents: { totalPage, comments },
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const getUserComments = async (params: any, connection: DbConnection) => {
    const { nickname, page } = params //path: nickname, query: page
    try {
        const response = await connection.run(
            `SELECT idx, content_idx, nickname,comment, commented_at, created_at FROM comments WHERE nickname=?`,
            [nickname]
        )
        changeDbTimeForm(response)
        const { totalPage, contents: comments } = getContentsPerPages(
            response,
            10,
            page
        )
        return {
            status: 201,
            data: {
                contents: { totalPage, comments },
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
