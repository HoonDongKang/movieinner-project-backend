import NAVER from "../../configs/socialLogin"
import axios from "axios"
import { unauthorizedErrorHandler } from "../../modules/paramsError"

const { NAVER_CLIENT_KEY, NAVER_CLIENT_SECRET, NAVER_STATE } = NAVER
const getUserInfoNaver = async (
    params: { authorizationCode: string },
    connection: never
) => {
    try {
        const { authorizationCode } = params
        //accessToken 발급
        const tokenResponse = await axios.post(
            "https://nid.naver.com/oauth2.0/token",
            null,
            {
                params: {
                    code: authorizationCode,
                    client_id: NAVER_CLIENT_KEY,
                    client_secret: NAVER_CLIENT_SECRET,
                    grant_type: "authorization_code",
                    state: NAVER_STATE,
                },
            }
        )
        const accessToken = tokenResponse.data.access_token

        //사용자 정보 가져오기
        const userInfoResponse = await axios.get(
            "https://openapi.naver.com/v1/nid/me",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
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
        unauthorizedErrorHandler(e)
    }
}

export default {
    getUserInfoNaver,
}
