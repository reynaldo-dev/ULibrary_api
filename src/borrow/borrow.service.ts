import { PrismaClient } from '@prisma/client';
import { BorrowDto } from './dto/borrowDto';
import { UpdateBorrowDto } from './dto/updateBorrowDto';

export class BorrowService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getBorrows(student: string) {
    try {
      if (student == undefined || student == null || +student == 0) {
        return await this.prisma.borrow.findMany({
          include: {
            book: true,
            users: true,
          },
        });
      }
      return await this.prisma.borrow.findMany({
        where: {
          id_user: +student,
        },
        include: {
          book: true,
          users: true,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async createBorrow(borrowDto: BorrowDto[]) {
    try {
      borrowDto.forEach(borrow => {
        borrow.from_date = new Date(borrow.from_date);
        borrow.to_date = new Date(borrow.to_date);
      });

      return await this.prisma.borrow.createMany({
        data: borrowDto,
      });
    } catch (error) {
      return null;
    }
  }

  async updateBorrow(updateBorrowDto: UpdateBorrowDto) {
    try {
      return await this.prisma.borrow.update({
        where: {
          id_borrow: updateBorrowDto.id_borrow,
        },
        data: {
          state: updateBorrowDto.state,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
