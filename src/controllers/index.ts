import { ApiConfigObj } from '../configs/api'
import { Express, NextFunction, Request, Response } from 'express'
import path from 'path'
import { ReqConnection, ReqConnectionUndefined } from '../middlewares/dbConnect'
import { DbConnection } from '../modules/connect'

interface responseType {
    status: number
    data: { [key: string]: any }
    render: any
}

export const registerAllApis = async (
    app: Express,
    apiConfigs: ApiConfigObj
) => {
    for (const apiConfigNames in apiConfigs) {
        const apiConfig = apiConfigs[apiConfigNames]
        const { urlPath, method, handlerName, handlerPath } = apiConfig
        const getModulePath = path.join(__dirname, '../../', handlerPath)
        const { default: apiModule } = await import(getModulePath)
        const apiHandlerFunc: (
            params: any,
            dbConnect: DbConnection
        ) => Promise<any> = apiModule[handlerName]

        const apiHandler = (
            request: Request,
            response: Response,
            next: NextFunction
        ) => {
            const req = request as ReqConnection
            const res = response
            const params = Object.assign({}, req.body, req.query, req.params)
            const connection = req.mysqlConnection
            apiHandlerFunc(params, connection)
                .then((resObj: responseType) => {
                    const { status, data, render } = resObj
                    if (!render) {
                        res.status(status)
                        res.json(data)
                    } else {
                        res.status(status)
                        res.json(data)
                        res.render(render)
                    }
                })
                .catch((e: Error) => next(e))
        }
        app[method](urlPath, apiHandler)
    }
}
