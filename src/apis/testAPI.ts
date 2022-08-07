import express from 'express'
import { Request } from 'express'
import {  DbConnection } from '../modules/connect'

interface RequestWithDbConnect extends Request{
    dbConnect:DbConnection
}

export const router = express.Router()

router.get('/', async (req:Request, res) => {
    // const request = req as  RequestWithDbConnect
    // const connection=request.dbConnect
    // const response= await connection.run(`SELECT * FROM email_verify`,[])
    res.json({success:true})
})
