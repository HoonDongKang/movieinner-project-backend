import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'
import { changeDbTimeForm } from './../../modules/changeTimeForm'

const writeContents = async (
    params: { nickname: string; title: string; content: string; file: string },
    connection: DbConnection
) => {
    const { nickname, title, content, file } = params
    try {
        const response = await connection.run(
            `INSERT INTO community(nickname,title,content,file) VALUES (?,?,?,?)`,
            [nickname, title, content, file]
        )
        const idx = response.insertId
        return {
            status: 201,
            data: {
                idx,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const modifyContents = async (
    params: { idx: string; title: string; content: string; file: string },
    connection: DbConnection
) => {
    const { idx, title, content, file } = params
    try {
        await connection.run(
            `UPDATE community SET title=?,content=?,file=? WHERE idx=?`,
            [title, content, file, idx]
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

const deleteContents = async (
    params: { idx: string },
    connection: DbConnection
) => {
    const { idx } = params
    try {
        await connection.run(`DELETE FROM community WHERE idx=?`, [idx])
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

const increaseHit = async (
    params: { idx: string },
    connection: DbConnection
) => {
    const { idx } = params
    try {
        const response = await connection.run(
            `SELECT hit FROM community WHERE idx=?`,
            [idx]
        )
        const { hit } = response[0]
        const increaseHit = hit + 1
        await connection.run(`UPDATE community SET hit=? WHERE idx=?`, [
            increaseHit,
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

const getTopHitContents = async (params: never, connection: DbConnection) => {
    try {
        const response = await connection.run(
            `SELECT idx,title,created_at FROM community ORDER BY hit DESC LIMIT 5`
        )
        changeDbTimeForm(response)
        return {
            status: 200,
            data: { top5Contents: response },
        }
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    writeContents,
    modifyContents,
    deleteContents,
    increaseHit,
    getTopHitContents,
}
