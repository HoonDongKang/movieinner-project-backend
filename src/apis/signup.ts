import express from 'express'
import DB from '../configs/db'
import mysql from 'mysql2/promise'
export const signUpRouter = express.Router()

const { DB_NAME, HOST, ID, PASSWORD } = DB

const DATABASE_URL = `
    mysql://${ID}:${PASSWORD}@${HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`

signUpRouter.post('/', async (req, res) => {
    const { email, password, image_URL, name, gender, age, nickname } = req.body
    const connection = await mysql.createConnection(DATABASE_URL)
    await connection.execute(
        `INSERT INTO user_info(email,pw,image_URL,name,gender,age,nickname) VALUES(?,?,?,?,?,?,?)`,
        [email, password, image_URL, name, gender, age, nickname]
    )

    res.json({
        success: true,
    })
})
