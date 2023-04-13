import { PrismaClient } from '@prisma/client';
import { BookDto } from './dto/createBookDto';

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
      return await this.getByQuery(query);
    } catch (error) {
      return null;
    }
  }
  async getByQuery(query: string) {
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
  }

  async createBook(book: BookDto) {
    try {
      const newBook = await this.prisma.book.create({
        data: {
          ...book,
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
