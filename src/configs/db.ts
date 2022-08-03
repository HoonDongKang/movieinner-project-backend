import dotenv from 'dotenv'
dotenv.config()

export default {
    ID: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
}
