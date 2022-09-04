import { DbConnection } from '../modules/connect'

//te
const testAPI = async (params: any, connection: DbConnection) => {
    return {
        status: 200,
        data: { success: true },
    }
}

const authTestAPI = async (params: any, connection: DbConnection) => {
    return {
        status: 200,
        data: {
            auth: true,
        },
    }
}
export default { testAPI, authTestAPI }
