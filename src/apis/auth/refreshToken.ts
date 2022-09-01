import { DbConnection } from "../../modules/connect";
import JWT from 'jsonwebtoken'
import jsonWebToken from '../../configs/jsonWebToken'
const { JWT_SECRET } = jsonWebToken

const refreshToken = async (params: any, connection: DbConnection) => {
    try{
        const {accessToken, refreshToken} = params
        const accessTokehPayload = JWT.verify(accessToken,JWT_SECRET)
        const refreshTokenPayload = JWT.verify(refreshToken,JWT_SECRET)

        const getResponse=await connection.run(`SELECT access_token,expires_in, refresh_token_expires_in FROM user_token WHERE refresh_token=?`,[refreshToken])
        //1) refresh token의 만료기한이 지나지 않았는지
        //2) refresh token에 담긴 access token이 db에 저장된 access token과 같은지  
    } catch (e:any){
        throw new Error(e)
    }
};

export default { refreshToken };
