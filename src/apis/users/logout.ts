import { DbConnection } from '../../modules/connect'

const logout = async (params: any, connection: DbConnection) => {
    const {refreshToken}=params
    try{
        const response=await connection.run(`SELECT COUNT(*) as count FROM user_token WHERE refresh_token=?`,[refreshToken])
        const {count}=response[0]
        if (count===0)throw 'E0008'
    } catch(e:any){
        throw new Error(e)
    }
}
