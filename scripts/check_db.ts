import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env manually
let supabaseUrl = '';
let supabaseKey = '';

try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        } else if (val.startsWith("'") && val.endsWith("'")) {
          val = val.substring(1, val.length - 1);
        }
        if (key === 'VITE_SUPABASE_URL' || key === 'SUPABASE_URL') {
          supabaseUrl = val;
        }
        if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
          supabaseKey = val;
        }
      }
    });
  }
} catch (e) {
  console.warn('Could not load .env file:', e instanceof Error ? e.message : e);
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Credentials missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log('Record samples:', data);
  }
}

test();
