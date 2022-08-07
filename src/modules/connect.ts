import DB from '../configs/db'
import mysql from 'mysql2/promise'
import e from 'cors'

const { DB_NAME, HOST, ID, PASSWORD } = DB
const DATABASE_URL = `
    mysql://${ID}:${PASSWORD}@${HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`

export interface DbConnectionWithUndefined extends mysql.Connection{
    run?:Function
}

export interface DbConnection extends mysql.Connection{
    run:Function
}

 const connect = async () => {
    const connection:DbConnectionWithUndefined = await mysql.createConnection(DATABASE_URL)
    const run = async( sql: string, params: any[] = [])=>{
        const [rows,fields]=await connection.execute(sql,params)
        return rows
    }
    //하나의 connection 재활용해서 여러 query 실행
    connection.run = run
    return connection as DbConnection
}

export default{connect}
