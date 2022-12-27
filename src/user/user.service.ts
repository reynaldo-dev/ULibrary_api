import { PrismaClient } from '@prisma/client';
import { PostUserDto } from './dto/PostUser-dto';

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
}
