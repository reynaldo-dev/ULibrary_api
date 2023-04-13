import { PrismaClient } from '@prisma/client';
import { BorrowDto } from './dto/borrowDto';
import { UpdateBorrowDto } from './dto/updateBorrowDto';
import { BorrowStates } from '../app/borrowStates';

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
      return await this.getByStudent(student);
    } catch (error) {
      return null;
    }
  }

  async getByStudent(student: string) {
    return await this.prisma.borrow.findMany({
      where: {
        OR: [
          {
            users: {
              email: {
                contains: student,
                mode: 'insensitive',
              },
            },
          },

          {
            users: {
              first_name: {
                contains: student,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        book: true,
        users: true,
      },
    });
  }

  async createBorrow(borrowDto: BorrowDto) {
    const isAvailable = await this.isAvailable(borrowDto.bookId);
    if (!isAvailable) return null;

    try {
      borrowDto.from_date = new Date();
      borrowDto.to_date = new Date();

      const newBorrow = await this.prisma.borrow.create({
        data: borrowDto,
      });

      if (newBorrow) {
        this.decrementStock(newBorrow.bookId);
      }

      return newBorrow ? newBorrow : null;
    } catch (error) {
      return null;
    }
  }

  async updateBorrow(updateBorrowDto: UpdateBorrowDto) {
    try {
      const updatedBorrow = await this.prisma.borrow.update({
        where: {
          id: updateBorrowDto.id,
        },
        data: {
          state: updateBorrowDto.state,
        },
      });

      if (updateBorrowDto.state == BorrowStates.RETURNED) {
        this.incrementStock(updatedBorrow.bookId);
      }

      return updatedBorrow ? updatedBorrow : null;
    } catch (error) {
      return null;
    }
  }

  async incrementStock(bookId: string) {
    try {
      await this.prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          stock: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      return null;
    }
  }

  async decrementStock(bookId: string) {
    try {
      await this.prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          stock: {
            decrement: 1,
          },
        },
      });
    } catch (error) {
      return null;
    }
  }

  async isAvailable(bookId: string) {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

      return book.stock > 0;
    } catch (error) {
      return null;
    }
  }
}
