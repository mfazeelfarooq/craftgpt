import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10); // Using a default password

  const fazeel = await prisma.user.create({
    data: {
      username: 'fazeel',
      email: 'me.fazeel.farooq@mail.com',
      password: hashedPassword,
    },
  });

  console.log({ fazeel });
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 