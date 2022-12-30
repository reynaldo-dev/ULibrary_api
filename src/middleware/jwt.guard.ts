import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../app/statusCodes';
import jwt from 'jsonwebtoken';

export const jwtGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(StatusCode.UNAUTHORIZED).json({ ok: false, message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(StatusCode.UNAUTHORIZED).json({ ok: false, message: 'Unauthorized' });
  }
};
