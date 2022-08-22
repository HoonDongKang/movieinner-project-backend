import { NextFunction, Response } from 'express'
import { ReqConnectionUndefined } from './dbConnect'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
dotenv.config()

type ResponseType = { count: number }[]

export const authorizer = (
    req: ReqConnectionUndefined,
    res: Response,
    next: NextFunction
) => {
    const { authorization: bearerToken } = req.headers
    const { mysqlConnection: connection } = req
    const token = bearerToken?.replace('Bearer ', '') || ''
    const JWT_SECRET = process.env.JWT_SECRET as string

    let payload: any = {}
    try {
        payload = JWT.verify(token, JWT_SECRET)
    } catch (e) {
        throw new Error('E0005')
    }
    const { email, iat } = payload
    connection
        ?.run(`SELECT COUNT(*) AS count FROM user_info WHERE email=?`, [email])
        .then((response: ResponseType) => {
            const { count } = response[0]
            if (count >= 1) {
                next()
            } else {
                throw new Error('E0005')
            }
        })
        .catch((e: Error) => {
            next(e)
        })
}
