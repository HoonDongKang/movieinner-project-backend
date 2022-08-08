import { DbConnection } from '../modules/connect'

const testAPI = async (params: any, connection: DbConnection) => {
    return {
        status: 200,
        data: { success: true },
    }
}

export default { testAPI }
