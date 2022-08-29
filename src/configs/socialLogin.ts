import dotenv from 'dotenv'
dotenv.config()

export default {
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY as string,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECURITY_PASSWORD: process.env
        .GOOGLE_CLIENT_SECURITY_PASSWORD as string,
    GOOGLE_CLIENT_REDIRECT_URI: process.env
        .GOOGLE_CLIENT_REDIRECT_URI as string,
}
