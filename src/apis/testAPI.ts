import { DbConnection } from '../modules/connect'


//te
const testAPI = async (params: any, connection: DbConnection) => {
    return {
        status: 200,
        data: { success: true },
    }
}

export default { testAPI }
