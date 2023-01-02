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

  async verifyAvailableBooks(id_book: number) {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          id_book: id_book,
        },
      });
      return book.stock > 0;
    } catch (error) {
      return null;
    }
  }

  async createBorrow(borrowDto: BorrowDto[]) {
    try {
      let available = true;
      borrowDto.forEach(async borrow => {
        borrow.from_date = new Date(borrow.from_date);
        borrow.to_date = new Date(borrow.to_date);

        const isAvailable = await this.verifyAvailableBooks(borrow.id_book);
        if (!isAvailable) {
          available = false;
          return;
        }
      });
      console.log('available', available);
      return available;
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
