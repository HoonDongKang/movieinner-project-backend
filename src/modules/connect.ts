import DB from '../configs/db'
import mysql from 'mysql2/promise'

const { DB_NAME, HOST, ID, PASSWORD } = DB
const DATABASE_URL = `
    mysql://${ID}:${PASSWORD}@${HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`

export const connect = async (sql: string, params: any = []) => {
    const connection = await mysql.createConnection(DATABASE_URL)
    const [rows, fields] = await connection.execute(sql, params)
    return rows
}
