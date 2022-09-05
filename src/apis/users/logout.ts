import { DbConnection } from "../../modules/connect";
import { paramsErrorHandler } from "../../modules/paramsError";

const logout = async (params: any, connection: DbConnection) => {
  const { refreshToken } = params;
  try {
    const response = await connection.run(
      `SELECT COUNT(*) as count FROM user_token WHERE refresh_token=?`,
      [refreshToken]
    );
    const { count } = response[0];
    if (count === 0){throw 'E0005'}
    else{
        return {
            status:201,
            data:{
                logout:true
            },
            cookie:{
                name:'refreshToken',
                val:'',
                options: {
                    httpOnly: true,
                    path: '/',
                    sameSite: 'lax',
                    expires:new Date(Date.now())
                    // domain: 'http://localhost:3000',
                },
            }
        }
    }
    
  } catch (e: any) {
    throw paramsErrorHandler(e)
  }
};

export default{
    logout
}