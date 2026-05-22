-- Run this SQL statement in the Supabase Dashboard SQL Editor
-- to add the 'status_reason' column to your 'appointments' table.

ALTER TABLE appointments ADD COLUMN IF NOT EXISTS status_reason TEXT;
