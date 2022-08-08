import { Request, Response, NextFunction } from 'express'
import { connect, DbConnection } from '../modules/connect'

export interface ReqConnectionUndefined extends Request {
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
    connect()
        .then((connection) => {
            req.mysqlConnection = connection
            next()
        })
        .catch((e: Error) => {
            next(e)
        })
}
