import { PrismaClient } from '@prisma/client';

export class GenreService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getGenres() {
    return await this.prisma.genre.findMany();
  }
}
