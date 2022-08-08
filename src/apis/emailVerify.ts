import mailgun from 'mailgun-js'
import MAIL from '../configs/mailgun'
import bcrypt from 'bcrypt'
import { DbConnection } from '../modules/connect'
const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } = MAIL

const emailVerifyLink = async (params: any, connection: DbConnection) => {
    const { email } = params
    //email hash화로 key값 생성
    const salt = await bcrypt.genSalt(10)
    const hashedEmail = await bcrypt.hash(email, salt)
    const expiredDate = new Date(Date.now() + 60 * 1000 * 1) //만료기간 1분
    const getResponse = await connection.run(
        `SELECT COUNT(*) AS count FROM user_info WHERE email=?`,
        [email]
    )
    const { count } = getResponse[0]
    if (count > 0) throw new Error('Alreayd Existed Email')

    // 이메일 정보 및 만료 기한 저장
    const postResponse: any = await connection.execute(
        `INSERT INTO email_verify(email,email_code,expired_date) VALUES(?,?,?)`,
        [email, hashedEmail, expiredDate]
    )
    const { insertId } = postResponse[0]

    // 존재하지 않을 경우 이메일 링크 전송
    const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN })
    const emailLink = `http://localhost:3000/verify/${insertId}?key=${hashedEmail}` //임시 verify 주소
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
            idx: insertId,
            success: true,
            message: '이메일로 링크 발송 성공',
        },
    }
}

const checkEmailLink = async (params: any, connection: DbConnection) => {
    const { insertId, key } = params
    const response = await connection.run(
        `SELECT expired_date FROM email_verify WHERE idx=? AND email_code=?`,
        [insertId, key]
    )
    const { expired_date: expiredDate } = response[0]
    const intExpiredDate = expiredDate.getTime()
    const nowDate = new Date().getTime()
    const isVerified = nowDate > intExpiredDate ? false : true
    return {
        status: 200,
        data: { isverified: isVerified },
    }
}
export default {
    emailVerifyLink,
    checkEmailLink,
}
