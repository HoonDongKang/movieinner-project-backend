import { NextFunction, Response } from "express";
import { ReqConnectionUndefined, ReqConnection } from "./dbConnect";
import JWT from "jsonwebtoken";
import jsonWebToken from "../configs/jsonWebToken";
import { jwtErrorHandler } from "../modules/paramsError";
const { JWT_SECRET } = jsonWebToken;

type ResponseType = { count: number }[];

export const authorizer = (
  req: ReqConnectionUndefined,
  res: Response,
  next: NextFunction
) => {
  let payload: any = {};
  const request = req as ReqConnection;
  const { authorization: bearerToken } = req.headers;
  const { mysqlConnection: connection } = request;
  const token = bearerToken?.replace("Bearer ", "") || "";
  try {
    payload = JWT.verify(token, JWT_SECRET);
  } catch (e: any) {
    throw new Error("E0005");
  }
  const { email, iat } = payload;
  connection
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
};
