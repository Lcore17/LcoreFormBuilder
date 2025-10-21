-- Manual migration to add passwordHash column if it doesn't exist
-- This handles the case where migration tracking is out of sync with actual database schema

-- Check if column exists, if not add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'Form' 
        AND column_name = 'passwordHash'
    ) THEN
        ALTER TABLE "Form" ADD COLUMN "passwordHash" TEXT;
    END IF;
END $$;
