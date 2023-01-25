import Mailgun from "mailgun.js"
import formData from "form-data"
import MAIL from "../configs/mailgun"

const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } = MAIL

//http://localhost:3000/signup/verify?key=${hashedEmail}&email=${email}&type=${type}` //임시 verify 주소
const senVerifyEmail = async (
    hashedEmail: string,
    email: string,
    type: string
) => {
    try {
        const mailgun = new Mailgun(formData)
        const client = mailgun.client({ username: "api", key: MAILGUN_API_KEY })
        const data = {
            from: MAILGUN_FROM,
            to: email,
            subject: "Movie-inner: Please verify your email address.",
            template: "verifying_email",
            "t:variables": JSON.stringify({
                hashedEmail,
                email,
                type,
            }),
        }
        await client.messages.create(MAILGUN_DOMAIN, data)
    } catch (e: any) {
        console.error(e)
    }
}

const sendResetPWEmail = async (
    hashedEmail: string,
    email: string,
    type: string
) => {
    try {
        const mailgun = new Mailgun(formData)
        const client = mailgun.client({ username: "api", key: MAILGUN_API_KEY })
        const data = {
            from: MAILGUN_FROM,
            to: email,
            subject: "Movie-inner: Please verify your email address.",
            template: "reset_a_password",
            "t:variables": JSON.stringify({
                hashedEmail,
                email,
                type,
            }),
        }
        await client.messages.create(MAILGUN_DOMAIN, data)
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    senVerifyEmail,
    sendResetPWEmail,
}
