import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { validateSchema } from '../helpers/validate-schema';
import { StatusCode } from '../statusCodes';

export const login = async (req: Request, res: Response) => {
  const { email, first_name, last_name } = req.body;

  const authService = new AuthService();
  const loginDto = new LoginDto();
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
