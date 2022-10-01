import { DbConnection } from '../../modules/connect'

const writeContents = async (params: any, connection: DbConnection) => {
    const { nickname, content, file } = params
}

const modifyContents = async (params: any, connection: DbConnection) => {
    const { nickname, content, file } = params
}

const deleteContents = async (params: any, connection: DbConnection) => {
    const { nickname, content, file } = params
}

export default {
    writeContents,
    modifyContents,
    deleteContents,
}
