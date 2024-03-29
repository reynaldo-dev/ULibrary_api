import { Request, Response } from 'express';
import { PostUserDto } from './dto/PostUser-dto';
import { StatusCode } from '../app/statusCodes';
import { UserService } from './user.service';
import { validateSchema } from '../helpers/validate-schema';

const userService = new UserService();
export const postUser = async (req: Request, res: Response) => {
  const user = new PostUserDto();
  const { first_name, last_name, email, roleId } = req.body;
  user.first_name = first_name;
  user.last_name = last_name;
  user.email = email;
  user.roleId = roleId;

  const isValidationError = await validateSchema(user);
  if (isValidationError) {
    return res.status(StatusCode.BAD_REQUEST).json({
      ok: false,
      message: 'Validation error',
    });
  }

  const newUser = await userService.createUser(user);
  if (!newUser) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      ok: false,
      message: 'User already exists or there is some error',
    });
  }

  return res.status(StatusCode.CREATED).json({
    ok: true,
    message: 'User created!',
    user: newUser,
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const { first_name } = req.query;
  const users = await userService.getUsers(first_name as string);
  return users
    ? res.status(StatusCode.OK).json({ ok: true, users })
    : res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ ok: false, message: 'Error getting users' });
};
