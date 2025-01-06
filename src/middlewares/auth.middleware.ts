import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.util';

const userAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required',
      };
    }
    bearerToken = bearerToken.split(' ')[1];

    const secret = `${process.env.SECRET_TOKEN}`;
    const decoded: any = await verifyToken(bearerToken, secret);

    req.body.createdBy = decoded.userId;
    if (decoded.reset === true)
      req.body.email = decoded.email;
    next();
  } catch (error) {
    next(error);
  }
};

export default userAuthorization;