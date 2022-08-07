import { Request, Response, NextFunction } from 'express'
import mysql, { connectionWithRunFunction } from '../modules/connect'

interface RequestConnection extends Request {
    mysqlConnection?: connectionWithRunFunction
}

export const useMysql = (
    req: RequestConnection,
    res: Response,
    next: NextFunction
) => {
    mysql
        .connect()
        .then((connection) => {
            req.mysqlConnection = connection
            next()
        })
        .catch((e: Error) => {
            next(e)
        })
}