import dotenv from 'dotenv'
dotenv.config()

export default {
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY as string,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI as string,
    GOOGLE_CLIENT_KEY: process.env.GOOGLE_CLIENT_KEY as string,
    GOOGLE_CLIENT_PASSWORD: process.env.GOOGLE_CLIENT_PASSWORD as string,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI as string,
    NAVER_CLIENT_KEY: process.env.NAVER_CLIENT_KEY as string,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET as string,
    NAVER_REDIRECT_URL: process.env.NAVER_REDIRECT_URL as string,
    NAVER_STATE: process.env.NAVER_STATE as string,
}
