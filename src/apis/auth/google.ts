import { DbConnection } from '../../modules/connect'
import GOOGLE from '../../configs/socialLogin'
import axios from 'axios'
import { paramsErrorHandler } from '../../modules/paramsError'

const { GOOGLE_CLIENT_KEY, GOOGLE_CLIENT_PASSWORD, GOOGLE_REDIRECT_URI } =
    GOOGLE
const getUserInfoGoogle = async (
    params: { authorizationCode: string },
    connection: DbConnection
) => {
    try {
        const { authorizationCode } = params
        //accessToken 발급
        const tokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            null,
            {
                headers: {
                    'Content-type':
                        'application/x-www-form-urlencoded;charset=utf-8',
                },
                params: {
                    code: authorizationCode,
                    client_id: GOOGLE_CLIENT_KEY,
                    client_secret: GOOGLE_CLIENT_PASSWORD,
                    grant_type: 'authorization_code',
                    redirect_uri: GOOGLE_REDIRECT_URI,
                },
            }
        )
        const accessToken = tokenResponse.data.access_token

        //사용자 정보 가져오기
        const userInfoResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-type':
                        'application/x-www-form-urlencoded;charset=utf-8',
                },
            }
        )

        return {
            status: 201,
            data: {
                success: userInfoResponse.data,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    getUserInfoGoogle,
}
