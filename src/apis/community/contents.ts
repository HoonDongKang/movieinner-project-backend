import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'

const writeContents = async (params: any, connection: DbConnection) => {
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

const modifyContents = async (params: any, connection: DbConnection) => {
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

const deleteContents = async (params: any, connection: DbConnection) => {
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

//조회수
//게시글 클릭 시 조회 수 1 증가 API
const increaseHit = async (params: any, connection: DbConnection) => {}

export default {
    writeContents,
    modifyContents,
    deleteContents,
}
