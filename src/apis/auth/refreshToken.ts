import { DbConnection } from "../../modules/connect";
import JWT from 'jsonwebtoken'
import jsonWebToken from '../../configs/jsonWebToken'
import { jwtErrorHandler } from "../../modules/paramsError";
const { JWT_SECRET } = jsonWebToken

const refreshToken = async (params: any, connection: DbConnection) => {
    let newAccessToken=''
    let newRefreshToken=''
    try{
        const {accessToken, refreshToken} = params
        const accessTokehPayload:any = JWT.verify(accessToken,JWT_SECRET)
        const {email,idx,nickname}=accessTokehPayload
        const refreshTokenPayload:any = JWT.verify(refreshToken,JWT_SECRET)
        const now = Date.now()
        
        const getResponse=await connection.run(`SELECT access_token,expires_in, refresh_token_expires_in FROM user_token WHERE refresh_token=?`,[refreshToken])
        //refresh token이 db에 존재할 경우
        if(getResponse[0]){
            //refresh token의 access token이 parameter로 온 access token과 같을 경우
            if(refreshTokenPayload.accessToken===accessToken){
                const {access_token,expires_in,refresh_token_expires_in}=getResponse[0]
                const refresh_token_expires_in_number= Date.parse(refresh_token_expires_in)
                // refresh token의 만료가 1개월 미만일 경우
                if(refresh_token_expires_in_number>now+3600 * 1000 * 24 * 30){
                    const newAccessTokenPayload={email,idx,nickname,now}
                    
                }
            }else{
                throw 'E0005'
            }
        }else{
            throw 'E0008'
        }
        //1) refresh token의 만료기한이 지나지 않았는지
        //2) refresh token에 담긴 access token이 db에 저장된 access token과 같은지  
    } catch (e:any){
        jwtErrorHandler(e)
    }
};

export default { refreshToken };
