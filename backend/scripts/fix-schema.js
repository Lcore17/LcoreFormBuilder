// This script ensures the passwordHash column exists in the database
// Run this after prisma migrate deploy to fix schema sync issues

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixSchema() {
  try {
    console.log('Checking database schema...');
    
    // Try to run raw SQL to add the column if it doesn't exist
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 
              FROM information_schema.columns 
              WHERE table_name = 'Form' 
              AND column_name = 'passwordHash'
          ) THEN
              ALTER TABLE "Form" ADD COLUMN "passwordHash" TEXT;
              RAISE NOTICE 'Added passwordHash column to Form table';
          ELSE
              RAISE NOTICE 'passwordHash column already exists';
          END IF;
      END $$;
    `);
    
    console.log('✅ Database schema check complete');
  } catch (error) {
    console.error('❌ Error fixing schema:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixSchema();
