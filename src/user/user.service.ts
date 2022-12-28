import { PrismaClient } from '@prisma/client';
import { PostUserDto } from './dto/PostUser-dto';
import { v4 as uuidv4 } from 'uuid';

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
}
