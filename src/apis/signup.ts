import express from 'express'
import DB from '../configs/db'
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import mailgun from 'mailgun-js'
import MAIL from '../configs/mailgun'
export const signUpRouter = express.Router()

const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } = MAIL
const { DB_NAME, HOST, ID, PASSWORD } = DB
const DATABASE_URL = `
    mysql://${ID}:${PASSWORD}@${HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`

//회원가입 정보 보내기
signUpRouter.post('/', async (req, res) => {
    const { email, password, image_URL, name, gender, age, nickname } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPw = await bcrypt.hash(password, salt)
    const connection = await mysql.createConnection(DATABASE_URL)
    await connection.execute(
        `INSERT INTO user_info(email,pw,image_URL,name,gender,age,nickname) VALUES(?,?,?,?,?,?,?)`,
        [email, hashedPw, image_URL, name, gender, age, nickname]
    )

    res.json({
        success: true,
    })
})

//이메일 인증 링크
signUpRouter.post('/verify', async (req, res) => {
    const { email } = req.body
    const userKey = email.substr(0, email.indexOf('@'))
    const salt = await bcrypt.genSalt(10)
    const hashedUserKey = await bcrypt.hash(userKey, salt)
    const expiredDate = Date.now() + 60 * 1000 * 1

    // const connection = await mysql.createConnection(DATABASE_URL)

    // // 이미 존재하는 이메일 검증
    // const [[rows], fields] = await connection.execute(
    //     `SELECT COUNT(*) AS count FROM user_info WHERE email=?`,
    //     [email]
    // )
    // const { count } = rows
    // if (count > 0) {
    //     throw new Error('Already Existed Email')
    // }

    // // 존재하지 않을 경우 이메일 링크 전송
    // const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN })
    // const emailLink = `http://localhost:3000/verify?key=${hashedUserKey}` //임시 verify 주소
    // const data = {
    //     from: MAILGUN_FROM,
    //     to: email,
    //     subject: 'Please verify your email address.',
    //     text: `Pleace click the link : ${emailLink}`,
    // }
    // await mg.messages().send(data, function (error: any, body: any) {
    //     console.log(body)
    // })

    // 이메일 정보 및 만료 기한 저장

    res.json({
        rows: expiredDate,
    })
})
