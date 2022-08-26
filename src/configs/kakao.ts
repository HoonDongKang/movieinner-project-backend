import dotenv from 'dotenv'
dotenv.config()

export default {
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY as string,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI as string,
}
