import { Request, Response } from 'express';
import { validate, validateOrReject } from 'class-validator';
import { PostUserDto } from './dto/PostUser-dto';
import { StatusCode } from '../statusCodes';
import { UserService } from './user.service';

export const postUser = async (req: Request, res: Response) => {
  const userService = new UserService();
  const user = new PostUserDto();
  const { first_name, last_name, email, id_role } = req.body;

  user.first_name = first_name;
  user.last_name = last_name;
  user.email = email;
  user.id_role = id_role;

  validate(user).then(errors => {
    if (errors.length > 0) {
      return res.status(StatusCode.BAD_REQUEST).json({ ok: false, errors });
    } else {
      userService.createUser(user).then(userCreated => {
        return userCreated
          ? res.status(StatusCode.OK).json({ ok: true, user: userCreated })
          : res
              .status(StatusCode.BAD_REQUEST)
              .json({ ok: false, message: 'User already exists or there is some error!' });
      });
    }
  });
};
