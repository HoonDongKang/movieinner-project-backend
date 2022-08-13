import mailgun from 'mailgun-js'
import MAIL from '../configs/mailgun'
import { DbConnection } from '../modules/connect'
import md5 from 'md5'
const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } = MAIL

const emailVerifyLink = async (params: any, connection: DbConnection) => {
    const { email } = params
    //email hash화로 key값 생성

    const expiredDate = new Date(Date.now() + 60 * 1000 * 5) //만료기간 5분
    const hashedEmailFull = md5(email + expiredDate)
    const hashedEmail = hashedEmailFull.substr(0, 12)
    const getResponse = await connection.run(
        `SELECT COUNT(*) AS count FROM user_info WHERE email=?`,
        [email]
    )
    const { count } = getResponse[0]
    if (count > 0) throw new Error('Alreayd Existed Email')

    //이메일 정보 및 만료 기한 저장
    const postResponse: any = await connection.execute(
        `INSERT INTO email_verify(email,email_code,expired_date) VALUES(?,?,?)`,
        [email, hashedEmail, expiredDate]
    )

    // 존재하지 않을 경우 이메일 링크 전송
    const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN })
    const emailLink = `http://localhost:3000/signup/pw?key=${hashedEmail}` //임시 verify 주소
    const data = {
        from: MAILGUN_FROM,
        to: email,
        subject: 'Please verify your email address.',
        text: `Pleace click the link : ${emailLink}`,
    }
    await mg.messages().send(data, function (error: any, body: any) {
        console.log(body)
    })

    return {
        status: 201,
        data: {
            success: true,
            message: '이메일로 링크 발송 성공',
        },
    }
}

const checkEmailLink = async (params: any, connection: DbConnection) => {
    const { key } = params
    const response = await connection.run(
        `SELECT expired_date FROM email_verify WHERE email_code=?`,
        [key]
    )

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
