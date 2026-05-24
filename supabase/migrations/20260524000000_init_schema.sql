-- Initial database schema for Skin Einfach Schön (Triggering Test Run)

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    service_id TEXT NOT NULL,
    service_name TEXT NOT NULL,
    category TEXT NOT NULL,
    price TEXT NOT NULL,
    duration TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    reminded BOOLEAN DEFAULT false,
    status_reason TEXT,
    expert TEXT DEFAULT 'Keine Präferenz'
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public / anonymous users to insert new appointments (client booking page)
CREATE POLICY "Allow public insert" ON appointments
    FOR INSERT TO anon
    WITH CHECK (true);

-- Policy 2: Allow public / anonymous users to select appointments to check therapist availability (customer booking page checks)
CREATE POLICY "Allow public select for availability" ON appointments
    FOR SELECT TO anon
    USING (status != 'cancelled');

-- Policy 3: Allow authenticated admin staff full access
CREATE POLICY "Allow authenticated full access" ON appointments
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Enable Realtime for the appointments table to support live dashboard updates
alter publication supabase_realtime add table appointments;
