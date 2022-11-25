import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'
import { changeDbTimeForm } from './../../modules/changeTimeForm'
import { getContentsPerPages } from './../../modules/getContents'

const writeComment = async (
    params: {
        contentIdx: string
        nickname: string
        comment: string
        responseTo: string
    },
    connection: DbConnection
) => {
    const { contentIdx, nickname, comment, responseTo } = params
    let response: any = []
    let idx = 0
    try {
        if (responseTo === undefined) {
            response = await connection.run(
                `INSERT INTO comments(content_idx,nickname,comment) VALUES (?,?,?)`,
                [contentIdx, nickname, comment]
            )
            const { insertId } = response
            idx = insertId
        } else {
            response = await connection.run(
                `INSERT INTO comments(content_idx,nickname,comment,response_to) VALUES (?,?,?,?)`,
                [contentIdx, nickname, comment, responseTo]
            )
            const { insertId } = response
            idx = insertId
        }
        const getResponse = await connection.run(
            `SELECT idx, content_idx,nickname,comment,response_to,created_at FROM comments WHERE idx=?`,
            [idx]
        )
        changeDbTimeForm(getResponse)
        return {
            status: 201,
            data: {
                success: true,
                comments: getResponse[0],
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}
const modifyComment = async (
    params: { idx: string; comment: string },
    connection: DbConnection
) => {
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
const deleteComment = async (
    params: { idx: string },
    connection: DbConnection
) => {
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

const getIdxComments = async (
    params: { contentIdx: string },
    connection: DbConnection
) => {
    const { contentIdx } = params //path: contentIdx
    try {
        const response = await connection.run(
            `SELECT idx, content_idx, nickname,comment, response_to, created_at FROM comments WHERE content_idx=?`,
            [contentIdx]
        )
        changeDbTimeForm(response)
        return {
            status: 201,
            data: {
                contents: response,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const getUserComments = async (
    params: { nickname: string; page: string },
    connection: DbConnection
) => {
    const { nickname, page } = params //path: nickname, query: page
    try {
        const response = await connection.run(
            `SELECT idx, content_idx, nickname,comment, response_to, created_at FROM comments WHERE nickname=?`,
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
