import express from 'express'
import { Request } from 'express'
import { ReqConnection } from '../middlewares/dbConnect'

export const router = express.Router()

router.get('/', async (req:Request, res) => {
    const request = req as  ReqConnection
    const connection=request.mysqlConnection
    const response= await connection.run(`SELECT * FROM signup`,[])
    res.json({response:response})
})
