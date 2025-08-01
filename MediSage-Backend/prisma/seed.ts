import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
  await prisma.medicine.createMany({
    data: [
      {
        name: 'Paracetamol',
        description: 'Used to reduce fever and relieve pain.',
        usage: 'Take as directed for headache, fever, or mild pain.',
        sideEffects: 'Rare: rash, liver issues if overdosed.',
        idealTiming: 'With or after food, any time of day.',
        warnings: 'Avoid excess use; not for severe liver disease.',
        language: 'en',
      },
      {
        name: 'Montair LC',
        description: 'Treats allergy symptoms and asthma.',
        usage: 'Take once daily at night.',
        sideEffects: 'Drowsiness, dry mouth.',
        idealTiming: 'Night.',
        warnings: 'Consult doctor if pregnant.',
        language: 'en',
      }
    ]
  });
  console.log('Seed data inserted!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
