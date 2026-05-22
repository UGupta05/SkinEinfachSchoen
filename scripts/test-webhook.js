import http from 'http';
import fs from 'fs';
import path from 'path';

// Load .env manually
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
        process.env[key] = val;
      }
    });
  }
} catch (e) {
  console.warn('Could not load .env file:', e.message);
}

const sendRequest = (method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        let parsed = data;
        try {
          parsed = data ? JSON.parse(data) : {};
        } catch (e) {
          // ignore
        }
        resolve({
          statusCode: res.statusCode,
          body: parsed
        });
      });
    });

    req.on('error', (e) => reject(e));
    if (body) {
      req.write(postData);
    }
    req.end();
  });
};

const mockAppointment = {
  id: 'a3d6f112-c2b4-4b5d-9ef8-e04e9bc35384',
  customer_name: 'Max Mustermann',
  customer_email: 'test@example.com', // Change this to your email to test real delivery!
  customer_phone: '+49 170 1234567',
  service_id: 'microneedling_gesicht_1',
  service_name: 'Microneedling Gesicht & Hals',
  category: 'Microneedling',
  price: '149 €',
  duration: '60 Min.',
  date: 'Di, 26. Mai',
  time: '14:30 Uhr',
  notes: 'Bitte sensible Hautpartien vorsichtig behandeln.',
  status: 'pending',
  reminded: false
};

const run = async () => {
  const args = process.argv.slice(2);
  const action = args[0] || 'all';

  console.log(`\n🧪 Supabase & Vercel Webhook / Cron Local Test Suite`);
  console.log(`====================================================`);

  // Allow setting custom email from command line: node scripts/test-webhook.js insert myemail@domain.com
  if (args[1]) {
    mockAppointment.customer_email = args[1];
    console.log(`📧 Target Email overridden to: ${mockAppointment.customer_email}`);
  }

  const webhookSecretHeaders = {
    'x-webhook-secret': process.env.SUPABASE_WEBHOOK_SECRET || 'test_webhook_secret'
  };

  const cronHeaders = {
    'Authorization': 'Bearer ' + (process.env.CRON_SECRET || 'test_cron_secret')
  };

  try {
    if (action === 'insert' || action === 'all') {
      console.log('\n[TEST 1] Triggering INSERT Webhook (New Booking Confirmation)...');
      const payload = {
        type: 'INSERT',
        table: 'appointments',
        record: mockAppointment,
        old_record: null
      };
      const res = await sendRequest('POST', '/api/appointments-webhook', payload, webhookSecretHeaders);
      console.log(`Result Status: ${res.statusCode}`);
      console.log('Response Body:', res.body);
    }

    if (action === 'confirm' || action === 'all') {
      console.log('\n[TEST 2] Triggering UPDATE Webhook (Status change to confirmed)...');
      const payload = {
        type: 'UPDATE',
        table: 'appointments',
        record: { ...mockAppointment, status: 'confirmed', status_reason: 'Bestätigt! Ihr exklusiver Behandlungstermin ist nun fest gebucht.' },
        old_record: { ...mockAppointment, status: 'pending' }
      };
      const res = await sendRequest('POST', '/api/appointments-webhook', payload, webhookSecretHeaders);
      console.log(`Result Status: ${res.statusCode}`);
      console.log('Response Body:', res.body);
    }

    if (action === 'cancel' || action === 'all') {
      console.log('\n[TEST 3] Triggering UPDATE Webhook (Status change to cancelled)...');
      const payload = {
        type: 'UPDATE',
        table: 'appointments',
        record: { ...mockAppointment, status: 'cancelled', status_reason: 'Wir haben Ihren Termin storniert, da Sie uns telefonisch um eine Verschiebung gebeten haben.' },
        old_record: { ...mockAppointment, status: 'confirmed' }
      };
      const res = await sendRequest('POST', '/api/appointments-webhook', payload, webhookSecretHeaders);
      console.log(`Result Status: ${res.statusCode}`);
      console.log('Response Body:', res.body);
    }

    if (action === 'modify' || action === 'all') {
      console.log('\n[TEST 4] Triggering UPDATE Webhook (Date and time changed)...');
      const payload = {
        type: 'UPDATE',
        table: 'appointments',
        record: { ...mockAppointment, date: 'Fr, 29. Mai', time: '10:30 Uhr', status_reason: 'Aufgrund einer teaminternen Fortbildung mussten wir Ihren Termin um einige Tage verschieben. Wir bitten um Verständnis.' },
        old_record: mockAppointment
      };
      const res = await sendRequest('POST', '/api/appointments-webhook', payload, webhookSecretHeaders);
      console.log(`Result Status: ${res.statusCode}`);
      console.log('Response Body:', res.body);
    }

    if (action === 'cron' || action === 'all') {
      console.log('\n[TEST 5] Triggering GET Cron (Appointment Reminders)...');
      console.log('(Note: This requires connection to a live Supabase DB since it queries appointments)');
      const res = await sendRequest('GET', '/api/cron/reminders', null, cronHeaders);
      console.log(`Result Status: ${res.statusCode}`);
      console.log('Response Body:', res.body);
    }

    console.log('\n----------------------------------------------------');
    console.log('✅ Testing session complete.\n');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    console.log('Make sure the test server is running on http://localhost:3000 first (run: npx tsx scripts/test-server.ts)');
  }
};

run();
