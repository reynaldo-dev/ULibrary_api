import { PrismaClient } from '@prisma/client';
import { PostUserDto } from './dto/PostUser-dto';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from '../auth/dto/login-dto';

export class UserService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async findOne(email: string) {
    const user = this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(user: PostUserDto) {
    try {
      const postUser = await this.prisma.users.create({
        data: {
          ...user,
          uuid: uuidv4(),
        },
        include: {
          role: true,
        },
      });

      return postUser;
    } catch (error) {
      return null;
    }
  }

  async findToLogin(loginDto: LoginDto) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          email: loginDto.email,
          first_name: loginDto.first_name,
          last_name: loginDto.last_name,
        },
        include: {
          role: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }
}
