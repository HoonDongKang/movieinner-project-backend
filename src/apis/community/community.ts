import { DbConnection } from './../../modules/connect'

const getAllContents = async (params: any, connection: DbConnection) => {
    const response = await connection.run(
        `SELECT nickname,title,content,file FROM community`,
        []
    )
    return {
        status: 200,
        data: {
            response,
        },
    }
}

export default {
    getAllContents,
}
