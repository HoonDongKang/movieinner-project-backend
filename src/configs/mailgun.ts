import dotenv from 'dotenv'
dotenv.config()

export default {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY as string,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN as string,
    MAILGUN_FROM: process.env.MAILGUN_FROM as string,
}
