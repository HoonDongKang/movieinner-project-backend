import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from './../../modules/paramsError'

const writeContents = async (params: any, connection: DbConnection) => {
    const { nickname, title, content, file } = params
    try {
        await connection.run(
            `INSERT INTO community(nickname,title,content,file) VALUES (?,?,?,?)`,
            [nickname, title, content, file]
        )
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const modifyContents = async (params: any, connection: DbConnection) => {
    const { nickname, title, content, file } = params
    try {
        await connection.run(
            `UPDATE community(title,content,file) SET (?,?,?) WHERE nickname=?`,
            [title, content, file, nickname]
        )
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

const deleteContents = async (params: any, connection: DbConnection) => {
    const { nickname } = params
    try {
        await connection.run(`DELETE FROM community WHERE nickname=?`, [
            nickname,
        ])
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    writeContents,
    modifyContents,
    deleteContents,
}
