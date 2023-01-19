// 이메일 인증 링크 전송 및 인증 API
import Mailgun from 'mailgun.js'
import formData from 'form-data'
import MAIL from '../../configs/mailgun'
import { DbConnection } from '../../modules/connect'
import md5 from 'md5'
import { paramsErrorHandler } from './../../modules/paramsError'
const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } = MAIL

const pwResetEmailLink = async (
    params: { email: string; type: string },
    connection: DbConnection
) => {
    let isEmailExist: boolean = true
    try {
        const { email, type } = params
        //email hash화로 key값 생성
        const expiredDate = new Date(Date.now() + 60 * 1000 * 5) //만료기간 5분
        const hashedEmailFull = md5(email + expiredDate)
        const hashedEmail = hashedEmailFull.substr(0, 12)
        const getResponse = await connection.run(
            `SELECT COUNT(*) AS count FROM user_info WHERE email=?`,
            [email]
        )
        const { count } = getResponse[0]
        if (count < 1) {
            isEmailExist = false
            return {
                status: 403,
                data: { isEmailExist },
            }
        }

        //이메일 정보 및 만료 기한 저장
        await connection.run(
            `INSERT INTO email_verify(type,email,email_code,expired_date) VALUES(?,?,?,?)`,
            [type, email, hashedEmail, expiredDate]
        )

        // 존재하지 않을 경우 이메일 링크 전송
        const mailgun = new Mailgun(formData)
        const client = mailgun.client({ username: 'api', key: MAILGUN_API_KEY })
        //`http://localhost:3000/signup/verify?key=${hashedEmail}&email=${email}&type=${type}` //임시 verify 주소
        const data = {
            from: MAILGUN_FROM,
            to: email,
            subject: 'Movie-inner: Please verify your email address.',
            template: 'reset_a_password',
            't:variables': JSON.stringify({
                hashedEmail,
                email,
                type,
            }),
        }
        await client.messages.create(MAILGUN_DOMAIN, data)
    } catch (e: any) {
        paramsErrorHandler(e)
    }

    return {
        status: 201,
        data: {
            isEmailExist: isEmailExist,
            message: '이메일로 링크 발송 성공',
        },
    }
}
//
const checkPwResetEmailLink = async (
    params: { key: string; type: string },
    connection: DbConnection
) => {
    let isVerified = false
    try {
        const { key, type } = params
        const response = await connection.run(
            `SELECT expired_date FROM email_verify WHERE email_code=? AND type=?`,
            [key, type]
        )
        if (!response[0]) {
            throw new Error('E0002')
        }

        const { expired_date: expiredDate } = response[0]
        const intExpiredDate = expiredDate.getTime()
        const nowDate = new Date().getTime()
        isVerified = nowDate > intExpiredDate ? false : true
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return {
        status: 200,
        data: { isVerified },
    }
}
export default {
    pwResetEmailLink,
    checkPwResetEmailLink,
}
