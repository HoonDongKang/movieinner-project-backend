import { NextFunction, Response } from "express";
import { ReqConnectionUndefined, ReqConnection } from "./dbConnect";
import JWT from "jsonwebtoken";
import jsonWebToken from "../configs/jsonWebToken";
import { DbConnection } from "../modules/connect";
const { JWT_SECRET } = jsonWebToken;

type ResponseType = { count: number }[];

export const authorizer = async (
  req: ReqConnectionUndefined,
  res: Response,
  next: NextFunction
) => {
  let payload: any = {};
  const request = req as ReqConnection;
  try {
    const { authorization: bearerToken } = req.headers;
    const { mysqlConnection: connection } = request;
    const token = bearerToken?.replace("Bearer ", "") || "";
    payload = JWT.verify(token, JWT_SECRET);
    const { email, iat } = payload;
    await connection
      .run(`SELECT COUNT(*) AS count FROM user_info WHERE email=?`, [email])
      .then((response: ResponseType) => {
        const { count } = response[0];
        if (count >= 1) {
          next();
        } else {
          throw new Error("E0005");
        }
      })
      .catch((e: Error) => {
        next(e);
      });
  } catch (e) {
    throw new Error("E0005");
  }
};
