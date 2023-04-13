import { PrismaClient } from '@prisma/client';
import { genres, roles, users } from './data';
const prisma = new PrismaClient();

async function main() {
  await prisma.genre.deleteMany({});
  await prisma.genre.createMany({
    data: genres,
  });

  await prisma.role.deleteMany({});
  await prisma.role.createMany({
    data: roles,
  });

  await prisma.users.deleteMany({});
  await prisma.users.createMany({
    data: users,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
