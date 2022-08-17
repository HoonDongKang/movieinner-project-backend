import dotenv from 'dotenv'
dotenv.config()

export default {
    AWS_S3_ACCESS_ID: process.env.AWS_S3_ACCESS_ID,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
}
