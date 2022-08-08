import express from 'express'
import { Request } from 'express'
import { ReqConnection } from '../middlewares/dbConnect'
import { DbConnection } from '../modules/connect'

// export const router = express.Router()

// router.get('/', async (req: Request, res) => {
//     const request = req as ReqConnection
//     const connection = request.mysqlConnection
//     const response = await connection.run(`SELECT * FROM user_info`, [])
//     res.json({ response: response })
// })

const testAPI = async (params: any, connection: DbConnection) => {
    return {
        status: 200,
        data: { success: true },
    }
}

export default { testAPI }
