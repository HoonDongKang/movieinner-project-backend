import { DbConnection } from '../../modules/connect'
import NAVER from '../../configs/socialLogin'
import axios from 'axios'
import { paramsErrorHandler } from '../../modules/paramsError'

const {
    NAVER_CLIENT_KEY,
    NAVER_CLIENT_SECRET,
    NAVER_REDIRECT_URL,
    NAVER_STATE,
} = NAVER
const getUserInfoNaver = async (
    params: { authorizationCode: string },
    connection: DbConnection
) => {
    try {
        const { authorizationCode } = params
        //accessToken 발급
        const tokenResponse = await axios.post(
            'https://nid.naver.com/oauth2.0/token',
            null,
            {
                headers: {
                    'Content-type':
                        'application/x-www-form-urlencoded;charset=utf-8',
                },
                params: {
                    code: authorizationCode,
                    client_id: NAVER_CLIENT_KEY,
                    client_secret: NAVER_CLIENT_SECRET,
                    grant_type: 'authorization_code',
                    redirect_uri: NAVER_REDIRECT_URL,
                    state: NAVER_STATE,
                },
            }
        )
        const accessToken = tokenResponse.data.access_token

        //사용자 정보 가져오기
        const userInfoResponse = await axios.get(
            'https://openapi.naver.com/v1/nid/me',
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
    getUserInfoNaver,
}
