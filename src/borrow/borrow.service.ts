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
    } catch (error) {
      return null;
    }
  }

  async createBorrow(borrowDto: BorrowDto) {
    try {
      borrowDto.from_date = new Date();
      borrowDto.to_date = new Date();
      const newBorrow = await this.prisma.borrow.create({
        data: borrowDto,
      });

      if (newBorrow) {
        this.decrementStock(newBorrow.id_book);
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
          id_borrow: updateBorrowDto.id_borrow,
        },
        data: {
          state: updateBorrowDto.state,
        },
      });

      if (updateBorrowDto.state == BorrowStates.RETURNED) {
        this.incrementStock(updatedBorrow.id_book);
      }

      return updatedBorrow ? updatedBorrow : null;
    } catch (error) {
      return null;
    }
  }

  async incrementStock(id_book: number) {
    try {
      await this.prisma.book.update({
        where: {
          id_book: id_book,
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

  async decrementStock(id_book: number) {
    try {
      await this.prisma.book.update({
        where: {
          id_book: id_book,
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
}
