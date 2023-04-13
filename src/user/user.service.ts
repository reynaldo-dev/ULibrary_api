import { PrismaClient } from '@prisma/client';
import { PostUserDto } from './dto/PostUser-dto';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from '../auth/dto/login-dto';

export class UserService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getUsers(first_name: string) {
    try {
      if (first_name == undefined || first_name == null || first_name == '') {
        return await this.prisma.users.findMany({
          include: {
            borrow: true,
            role: true,
          },
        });
      }

      return await this.prisma.users.findMany({
        where: {
          first_name: {
            contains: first_name,
            mode: 'insensitive',
          },
        },
        include: {
          borrow: true,
          role: true,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async createUser(user: PostUserDto) {
    try {
      const postUser = await this.prisma.users.create({
        data: user,
        include: {
          role: true,
        },
      });
      return postUser;
    } catch (error) {
      return null;
    }
  }

  async findOne(loginDto: LoginDto) {
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
      console.log(error);
      return null;
    }
  }
}
