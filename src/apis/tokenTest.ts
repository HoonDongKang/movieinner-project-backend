import express, { Request, Response } from 'express'
import { DbConnection } from '../modules/connect'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
import { paramsErrorHandler } from '../modules/paramsError'
import { ReqConnection } from '../middlewares/dbConnect'
dotenv.config()

const authRouter = express.Router()
authRouter.post('/', async (req: Request, res: Response) => {
    const request = req as ReqConnection
    const { email, password } = req.body
    let accessToken = ''
    let refreshToken = ''
    const expiredDate = new Date(Date.now() + 3600 * 1000 * 24) //24시간
    const refreshTokenExpiredDate = new Date(
        Date.now() + 3600 * 1000 * 24 * 180
    ) // 6개월
    try {
        const response = await request.mysqlConnection.run(
            `SELECT password,idx,nickname FROM user_info WHERE email=?`,
            [email]
        )
        const { password: hashedpassword, idx, nickname } = response[0]
        const isEqual = await bcrypt.compare(password, hashedpassword)
        //wrong password
        if (!isEqual) {
            throw 'E0003'
        }

        const accessTokenPayload = { email, idx, nickname, expiredDate }
        const JWT_SECRET = process.env.JWT_SECRET as string
        accessToken = JWT.sign(accessTokenPayload, JWT_SECRET)

        const refreshTokenPayload = { accessToken, refreshTokenExpiredDate }
        refreshToken = JWT.sign(refreshTokenPayload, JWT_SECRET)
    } catch (e: any) {
        paramsErrorHandler(e)
    }

    res.status(201)

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        domain: 'http://localhost:3000',
        path: '/',
        sameSite: 'lax',
    }).send({
        accessToken,
        refreshToken,
    })
})

export default authRouter
