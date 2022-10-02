import { DbConnection } from '../../modules/connect'

const writeContents = async (params: any, connection: DbConnection) => {
    const { nickname, content, file } = params
    try {
        await connection.run()
    } catch (e: any) {}
}

const modifyContents = async (params: any, connection: DbConnection) => {
    const { nickname, content, file } = params
    try {
        await connection.run()
    } catch (e: any) {}
}

const deleteContents = async (params: any, connection: DbConnection) => {
    const { nickname, content, file } = params
    try {
        await connection.run()
    } catch (e: any) {}
}

export default {
    writeContents,
    modifyContents,
    deleteContents,
}
