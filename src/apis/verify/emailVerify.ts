// 이메일 인증 링크 전송 및 인증 API
import mailgun from 'mailgun-js'
import MAIL from '../../configs/mailgun'
import { DbConnection } from '../../modules/connect'
import md5 from 'md5'
import { paramsErrorHandler } from './../../modules/paramsError'
const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } = MAIL

const emailVerifyLink = async (
    params: { email: string; type: string },
    connection: DbConnection
) => {
    try {
        const { email, type } = params
        //email hash화로 key값 생성

        const expiredDate = new Date(Date.now() + 60 * 1000 * 5) //만료기간 5분
        const hashedEmailFull = md5(email + expiredDate)
        const hashedEmail = hashedEmailFull.substring(0, 12)
        const getResponse = await connection.run(
            `SELECT COUNT(*) AS count FROM user_info WHERE email=?`,
            [email]
        )
        const { count } = getResponse[0]
        //이미 등록된 이메일일 경우
        if (count > 0) throw 'E0000'

        //이메일 정보 및 만료 기한 저장
        await connection.run(
            `INSERT INTO email_verify(type,email,email_code,expired_date) VALUES(?,?,?,?)`,
            [type, email, hashedEmail, expiredDate]
        )

        // 존재하지 않을 경우 이메일 링크 전송
        const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN })
        const emailLink = `http://localhost:3000/signup/verify?key=${hashedEmail}&email=${email}&type=${type}` //임시 verify 주소
        const data = {
            from: MAILGUN_FROM,
            to: email,
            subject: 'Movie-inner: Please verify your email address.',
            text: `Pleace click the link : ${emailLink}`,
        }
        await mg.messages().send(data, function (error: any, body: any) {
            console.log(body)
        })
    } catch (e: any) {
        paramsErrorHandler(e)
    }
    return {
        status: 201,
        data: {
            success: true,
            message: '이메일로 링크 발송 성공',
        },
    }
}

const checkEmailLink = async (
    params: { key: string; type: string }, //query
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
            throw 'E0002'
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
        data: { isVerified: isVerified },
    }
}
export default {
    emailVerifyLink,
    checkEmailLink,
}
