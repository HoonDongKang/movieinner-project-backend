import { Request, Response, NextFunction } from 'express'
import mysql, { DbConnection } from '../modules/connect'

interface ReqConnectionUndefined extends Request {
    mysqlConnection?: DbConnection
}

export interface ReqConnection extends Request {
    mysqlConnection: DbConnection
}

export const useMysql = (
    req: ReqConnectionUndefined,
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
