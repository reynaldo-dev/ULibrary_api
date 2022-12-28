import { NextFunction, Request, Response } from 'express';
import { Roles } from '../roles';

export const roleGuard = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  console.log(user);
  if (user.role.role === Roles.LIBRARIAN) {
    next();
  } else {
    res.status(401).json({ ok: false, message: 'Unauthorized' });
  }
};
