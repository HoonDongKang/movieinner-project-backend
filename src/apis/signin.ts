import express from 'express'
import mysql from 'mysql2/promise'
import DB from '../configs/db'
export const signInRouter = express.Router()
const { DB_NAME, HOST, ID, PASSWORD } = DB
const DATABASE_URL = `
    mysql://${ID}:${PASSWORD}@${HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`

signInRouter.post('/', async (req, res) => {
    const { id, password } = req.body
    const connection = await mysql.createConnection(DATABASE_URL)
    const [[rows], fields] = await connection.execute(
        `SELECT COUNT(*) AS count FROM user_info WHERE id=? AND password=?`,
        [id, password]
    )
    const { count } = rows
    if (count > 0) {
    }
})
