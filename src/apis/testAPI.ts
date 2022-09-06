import { DbConnection } from '../modules/connect'

//test
const testAPI = async (params: any, connection: DbConnection) => {
    return {
        status: 200,
        data: { success: true },
    }
}

//test bearer token
const authTestAPI = async (params: any, connection: DbConnection) => {
    return {
        status: 200,
        data: {
            auth: true,
        },
    }
}
export default { testAPI, authTestAPI }
