import { PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/login-dto';
import { UserService } from '../user/user.service';
import jwt from 'jsonwebtoken';

export class AuthService {
  private prisma: PrismaClient;
  private userService: UserService;
  constructor() {
    this.prisma = new PrismaClient();
    this.userService = new UserService();
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findToLogin(loginDto);
      if (!user) {
        return null;
      }

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return {
        user,
        token,
      };
    } catch (error) {
      return null;
    }
  }

  async whoami(token: string) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    } catch (error) {
      return null;
    }
  }
}
