import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { validateSchema } from '../helpers/validate-schema';
import { StatusCode } from '../app/statusCodes';

const authService = new AuthService();
const loginDto = new LoginDto();

export const login = async (req: Request, res: Response) => {
  const { email, first_name, last_name } = req.body;
  loginDto.email = email;
  loginDto.first_name = first_name;
  loginDto.last_name = last_name;

  const isValidationError = await validateSchema(loginDto);
  if (isValidationError) {
    return res.status(StatusCode.BAD_REQUEST).json({
      ok: false,
      message: 'Validation error',
    });
  }

  const login = await authService.login(loginDto);
  return !login
    ? res.status(StatusCode.BAD_REQUEST).json({ ok: false, message: 'Login error' })
    : res.status(StatusCode.OK).json({ ok: true, login });
};

export const whoami = async (req: Request, res: Response) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  const user = await authService.whoami(token);
  return !user
    ? res.status(StatusCode.BAD_REQUEST).json({ ok: false, message: 'Whoami error' })
    : res.status(StatusCode.OK).json({ ok: true, user });
};
