import { DbConnection } from '../../modules/connect'
import KAKAO from '../../configs/kakao'
import axios from 'axios'
import { paramsErrorHandler } from '../../modules/paramsError'

const { KAKAO_REDIRECT_URI, KAKAO_REST_API_KEY } = KAKAO
const getKakaoAccessToken = async (params: any, connection: DbConnection) => {
    try {
        const { authorizationCode } = params

        const tokenResponse = await axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${authorizationCode}`,
            {
                headers: {
                    'Content-type':
                        'application/x-www-form-urlencoded;charset=utf-8',
                },
            }
        )
        return {
            status: 201,
            data: {
                success: tokenResponse,
            },
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    getKakaoAccessToken,
}
