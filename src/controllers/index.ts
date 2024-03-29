import { ApiConfigObj } from "../configs/api"
import {
    CookieOptions,
    Express,
    NextFunction,
    Request,
    Response,
} from "express"
import path from "path"
import { ReqConnection } from "../middlewares/dbConnect"
import { DbConnection } from "../modules/connect"
import { authorizer } from "../middlewares/authorizer"

interface responseType {
    status: number
    data: { [key: string]: any }
    render: any
    cookie: { name: string; val: string; options: CookieOptions }
}

export const registerAllApis = async (
    app: Express,
    apiConfigs: ApiConfigObj
) => {
    for (const apiConfigNames in apiConfigs) {
        const apiConfig = apiConfigs[apiConfigNames]
        const {
            urlPath,
            method,
            handlerName,
            handlerPath,
            authorizer: isRequireAuthorizer,
        } = apiConfig
        const getModulePath = path.join(__dirname, "../../", handlerPath)
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
            const params = Object.assign(
                {},
                req.body,
                req.query,
                req.params,
                req.cookies
            )
            console.log(params)
            const connection = req.mysqlConnection
            apiHandlerFunc(params, connection)
                .then((resObj: responseType) => {
                    const { status, data, cookie } = resObj
                    if (!cookie) {
                        res.status(status)
                        res.json(data)
                    } else {
                        res.status(status)
                        res.cookie(
                            cookie.name,
                            cookie.val,
                            cookie.options
                        ).json(data)
                    }
                })
                .catch((e: Error) => next(e))
        }
        isRequireAuthorizer
            ? app[method](urlPath, authorizer, apiHandler)
            : app[method](urlPath, apiHandler)
    }
}
