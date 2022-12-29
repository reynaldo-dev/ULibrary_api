import { PrismaClient } from '@prisma/client';
import { BookDto } from './dto/createBookDto';
import { v4 as uuidv4 } from 'uuid';

export class BookService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getBooks(query: string) {
    try {
      if (query == undefined || query == null || query == '') {
        return await this.prisma.book.findMany({
          include: {
            genre: true,
          },
        });
      }

      return await this.prisma.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              genre: {
                genre: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
            {
              author: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          genre: true,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createBook(book: BookDto) {
    try {
      const newBook = await this.prisma.book.create({
        data: {
          ...book,
          uuid: uuidv4(),
          published: new Date(book.published),
        },
        include: {
          genre: true,
        },
      });
      return newBook ? newBook : null;
    } catch (error) {
      return null;
    }
  }
}
