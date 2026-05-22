-- Run this SQL statement in the Supabase Dashboard SQL Editor
-- to add the 'expert' column to your 'appointments' table.

ALTER TABLE appointments ADD COLUMN IF NOT EXISTS expert TEXT DEFAULT 'Keine Präferenz';
