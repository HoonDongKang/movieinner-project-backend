import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const errMsg = err.toString()
    console.log(errMsg)
}
