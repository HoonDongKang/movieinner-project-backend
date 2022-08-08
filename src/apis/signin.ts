import { DbConnection } from './../modules/connect'

const signIn = async (params: any, connection: DbConnection) => {
    const { id, password } = params
    await connection.run(
        `SELECT COUNT(*) AS count FROM user_info WHERE id=? AND password=?`,
        [id, password]
    )
    return { status: 200, data: { success: true } }
}

const getUserInfo = async (params: any, connection: DbConnection) => {
    const response = await connection.run(`SELECT * FROM user_info`, [])
    return { status: 200, data: response }
}

export default { signIn, getUserInfo }
