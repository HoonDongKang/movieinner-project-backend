// 이메일 인증 링크 전송 및 인증 API
import mailgun from 'mailgun-js'
import MAIL from '../../configs/mailgun'
import { DbConnection } from '../../modules/connect'
import md5 from 'md5'
const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } = MAIL

const emailVerifyLink = async (params: any, connection: DbConnection) => {
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
        if (count > 0) throw new Error('E0000')

        //이메일 정보 및 만료 기한 저장
        const postResponse = await connection.run(
            `INSERT INTO email_verify(type,email,email_code,expired_date) VALUES(?,?,?,?)`,
            [type, email, hashedEmail, expiredDate]
        )
        //Error: TypeError: Bind parameters must not contain undefined. To pass SQL NULL specify JS null

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
        throw new Error(e)
    }

    return {
        status: 201,
        data: {
            success: true,
            message: '이메일로 링크 발송 성공',
        },
    }
}

const checkEmailLink = async (params: any, connection: DbConnection) => {
    const { key, type } = params
    const response = await connection.run(
        `SELECT expired_date FROM email_verify WHERE email_code=? AND type=?`,
        [key, type]
    )
    if (!response) {
        throw new Error('E0002')
    }

    const { expired_date: expiredDate } = response[0]
    const intExpiredDate = expiredDate.getTime()
    const nowDate = new Date().getTime()
    const isVerified = nowDate > intExpiredDate ? false : true
    return {
        status: 200,
        data: { isVerified: isVerified },
    }
}
export default {
    emailVerifyLink,
    checkEmailLink,
}
