import mysql,{ DbConnection, DbConnectionWithUndefined } from "../modules/connect";
import { Request, Response, NextFunction } from "express";
import { ErrorRequestHandler } from "express";

 interface RequestWithUndfinedDbConnect extends Request{
    dbConnect?:DbConnection
}



export const dbConnect = (req: RequestWithUndfinedDbConnect, res: Response, next: NextFunction) => {
  mysql.connect()
    .then((connection) => {
      req.dbConnect = connection;
    })
    .catch((e:ErrorRequestHandler) => next(e));
};
//