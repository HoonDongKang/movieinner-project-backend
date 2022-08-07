import express from 'express'
import { Request } from 'express'
import { connectionWithRunFunction } from '../modules/connect'

interface RequestConnection extends Request {
    mysqlConnection?: connectionWithRunFunction
}

export const router = express.Router()

router.get('/', async (req:Request, res) => {
    // const request = req as  RequestWithDbConnect
    // const connection=request.dbConnect
    // const response= await connection.run(`SELECT * FROM email_verify`,[])
    res.json({success:true})
})
