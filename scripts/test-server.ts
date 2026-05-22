import http from 'http';
import fs from 'fs';
import path from 'path';
import appointmentsWebhook from '../api/appointments-webhook';
import remindersCron from '../api/cron/reminders';

// Manual simple .env parser since dotenv might not be installed
const loadEnv = () => {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        // Remove surrounding quotes if present
        if (val.length > 0 && val.charAt(0) === '"' && val.charAt(val.length - 1) === '"') {
          val = val.substring(1, val.length - 1);
        }
        if (val.length > 0 && val.charAt(0) === '\'' && val.charAt(val.length - 1) === '\'') {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
    console.log('Loaded environment variables from local .env');
  } else {
    console.log('No local .env file found');
  }
};

loadEnv();

const port = 3000;

const server = http.createServer(async (req, res) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-webhook-secret');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Parse body
  const reqBody = await new Promise<any>((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });

  const vercelReq: any = req;
  vercelReq.body = reqBody;
  
  const urlObj = new URL(req.url || '', `http://localhost:${port}`);
  vercelReq.query = Object.fromEntries(urlObj.searchParams);

  const vercelRes: any = res;
  vercelRes.status = (statusCode: number) => {
    res.statusCode = statusCode;
    return vercelRes;
  };
  vercelRes.json = (data: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    return vercelRes;
  };

  try {
    if (urlObj.pathname === '/api/appointments-webhook') {
      await appointmentsWebhook(vercelReq, vercelRes);
    } else if (urlObj.pathname === '/api/cron/reminders') {
      await remindersCron(vercelReq, vercelRes);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  } catch (err: any) {
    console.error('Error handling request:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
});

server.listen(port, () => {
  console.log(`\n🚀 Test Server started on port ${port}`);
  console.log(`-----------------------------------------------`);
  console.log(`👉 Webhook: POST http://localhost:${port}/api/appointments-webhook`);
  console.log(`👉 Cron:    GET  http://localhost:${port}/api/cron/reminders`);
  console.log(`-----------------------------------------------\n`);
});
