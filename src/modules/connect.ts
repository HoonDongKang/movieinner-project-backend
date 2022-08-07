
import mysql from 'mysql2/promise'
import dbConfig from '../configs/db'

const { ID, PASSWORD, HOST, DB_NAME } = dbConfig
const DB_URL = `mysql://${ID}:${PASSWORD}@${HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`

interface dbConnection extends mysql.Connection {
    run?: Function
}

export interface connectionWithRunFunction extends mysql.Connection {
    run: Function
}

const connect = async () => {
    const connection: dbConnection = await mysql.createConnection(DB_URL)
    const run = async (sql: string, params: any[] = []) => {
        const [rows, fields] = await connection.execute(sql, params)
        return rows
    }
    connection.run = run
    return connection as connectionWithRunFunction
}

export default {
    connect,
}