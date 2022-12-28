import { Request, Response } from 'express';
import { PostUserDto } from './dto/PostUser-dto';
import { StatusCode } from '../statusCodes';
import { UserService } from './user.service';
import { validateSchema } from '../helpers/validate-schema';

export const postUser = async (req: Request, res: Response) => {
  const userService = new UserService();
  const user = new PostUserDto();
  const { first_name, last_name, email, id_role } = req.body;
  user.first_name = first_name;
  user.last_name = last_name;
  user.email = email;
  user.id_role = id_role;

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
