import mysql from 'mysql2/promise'
import dbConfig from '../configs/db'

const { ID, PASSWORD, HOST, DB_NAME } = dbConfig
const DB_URL = `mysql://${ID}:${PASSWORD}@${HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`

interface DbConnectionUndefined extends mysql.Connection {
    run?: Function
}

export interface DbConnection extends mysql.Connection {
    run: Function
}

export const connect = async () => {
    const connection: DbConnectionUndefined = await mysql.createConnection(
        DB_URL
    )
    const run = async (sql: string, params: any[] = []) => {
        const [rows, fields] = await connection.execute(sql, params)
        return rows
    }
    connection.run = run
    //connection 객체에 담아주는 이유는 하나의 connection 으로 여러 쿼리를 실행하기 위해서
    return connection as DbConnection
}
