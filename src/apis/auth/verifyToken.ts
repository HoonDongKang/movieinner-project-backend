import { DbConnection } from '../../modules/connect'
import { paramsErrorHandler } from '../../modules/paramsError'
import JWT from 'jsonwebtoken'
import jsonWebToken from '../../configs/jsonWebToken'
const { JWT_SECRET } = jsonWebToken

const getPayloadToken = async (params: any, connection: DbConnection) => {
    try {
        const { refreshToken } = params
        const payload = JWT.verify(refreshToken, JWT_SECRET)
        console.log(payload)
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    getPayloadToken,
}
