import { ErrorRequestHandler } from 'express'
import errorConfigs from '../configs/error'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const errMsg: string = err.toString()
    let errCode = errMsg.replace('Error: ', '')
    let errConfig = errorConfigs[errCode]
    if (!errConfig) {
        console.log(errMsg)
        errCode = 'E0004'
        errConfig = errorConfigs[errCode]
    }

    const { code, message, status } = errConfig
    res.status(status)
    res.send({
        errCode: code,
        errMessage: message,
    })
}
