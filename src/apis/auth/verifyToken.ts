import { DbConnection } from '../../modules/connect'
import { jwtErrorHandler, paramsErrorHandler } from '../../modules/paramsError'
import JWT, { JwtPayload } from 'jsonwebtoken'
import jsonWebToken from '../../configs/jsonWebToken'
const { JWT_SECRET } = jsonWebToken

const getPayloadToken = async (params: any, connection: DbConnection) => {
    let payload: any = {}
    try {
        const { token } = params
        payload = JWT.verify(token, JWT_SECRET)
    } catch (e: any) {
        jwtErrorHandler(e)
    }

    return {
        status: 201,
        data: {
            payload,
        },
    }
}

export default {
    getPayloadToken,
}
