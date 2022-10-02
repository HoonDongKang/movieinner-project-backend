import { DbConnection } from './../../modules/connect'

const getAllContents = async (params: any, connection: DbConnection) => {
    const response = await connection.run(
        `SELECT nickname,title,content,file FROM community`,
        []
    )
    // page 별 정리
    return {
        status: 200,
        data: {
            response,
        },
    }
}

const getUserContent = async (params: any, connection: DbConnection) => {
    const { nickname } = params //path
    const response = await connection.run(
        `SELECT nickname,title,content,file FROM community WHERE nickname=?`,
        [nickname]
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
    getUserContent,
}
