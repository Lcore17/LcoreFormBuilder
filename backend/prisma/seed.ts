import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('demo123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@example.com',
      password: passwordHash,
    },
  });

  const form = await prisma.form.create({
    data: {
      title: 'Customer Feedback',
      description: 'Help us improve our service',
      isPublic: true,
      ownerId: user.id,
      fields: {
        create: [
          { label: 'Your Name', type: 'text', required: true, order: 0 },
          { label: 'Email', type: 'email', required: true, order: 1 },
          {
            label: 'How satisfied are you?',
            type: 'radio',
            required: true,
            order: 2,
            options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
          },
          { label: 'Comments', type: 'textarea', required: false, order: 3 },
        ],
      },
    },
  });

  console.log('Seeded demo user and form:', user.email, form.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
