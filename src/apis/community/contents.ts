import { DbConnection } from '../../modules/connect'

const writeContents = async (params: any, connection: DbConnection) => {
    const { nickname, title, content, file } = params
    try {
        await connection.run(
            `INSERT INTO community(nickname,title,content,file) VALUES (?,?,?,?)`,
            [nickname, title, content, file]
        )
    } catch (e: any) {}
}

const modifyContents = async (params: any, connection: DbConnection) => {
    const { nickname, title, content, file } = params
    try {
        await connection.run()
    } catch (e: any) {}
}

const deleteContents = async (params: any, connection: DbConnection) => {
    const { nickname, title, content, file } = params
    try {
        await connection.run()
    } catch (e: any) {}
}

export default {
    writeContents,
    modifyContents,
    deleteContents,
}
