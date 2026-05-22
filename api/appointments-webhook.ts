import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  getBookingPendingTemplate,
  getBookingConfirmedTemplate,
  getBookingCancelledTemplate,
  getBookingUpdatedTemplate
} from './helpers/emailTemplates';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Validate webhook secret
  const webhookSecretHeader = req.headers['x-webhook-secret'];
  const expectedSecret = process.env.SUPABASE_WEBHOOK_SECRET;

  if (expectedSecret && webhookSecretHeader !== expectedSecret) {
    return res.status(401).json({ error: 'Unauthorized: Invalid webhook secret' });
  }

  const payload = req.body;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'Bad Request: Invalid body payload' });
  }

  const { type, record, old_record } = payload;
  
  if (!record) {
    return res.status(400).json({ error: 'Bad Request: Missing record data' });
  }

  const {
    customer_name,
    customer_email,
    service_name,
    date,
    time,
    price,
    duration,
    status
  } = record;

  if (!customer_email) {
    return res.status(200).json({ message: 'No customer email provided. Skipping.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Server Configuration Error: Mail API key missing' });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Skin Einfach Schön <onboarding@resend.dev>';

  let subject = '';
  let html = '';

  try {
    if (type === 'INSERT') {
      // New booking is always pending initially
      subject = 'Ihre Terminbuchungsanfrage - Skin Einfach Schön';
      html = getBookingPendingTemplate(customer_name, service_name, date, time, price, duration);
    } else if (type === 'UPDATE') {
      const oldStatus = old_record?.status;
      const newStatus = status;

      if (oldStatus !== newStatus) {
        if (newStatus === 'confirmed') {
          subject = 'Termin bestätigt - Skin Einfach Schön';
          html = getBookingConfirmedTemplate(customer_name, service_name, date, time, price, duration);
        } else if (newStatus === 'cancelled') {
          subject = 'Termin storniert - Skin Einfach Schön';
          html = getBookingCancelledTemplate(customer_name, service_name, date, time);
        } else {
          return res.status(200).json({ message: `Status updated to ${newStatus}. No email trigger mapped.` });
        }
      } else {
        // Status didn't change, check if details changed (time, date, service)
        const oldDate = old_record?.date;
        const oldTime = old_record?.time;
        const oldService = old_record?.service_name;

        if (oldDate !== date || oldTime !== time || oldService !== service_name) {
          subject = 'Terminänderung - Skin Einfach Schön';
          html = getBookingUpdatedTemplate(
            customer_name,
            service_name,
            date,
            time,
            price,
            duration,
            oldDate,
            oldTime,
            oldService
          );
        } else {
          return res.status(200).json({ message: 'No actionable fields changed. Skipping.' });
        }
      }
    } else {
      return res.status(200).json({ message: `Unhandled event type: ${type}. Skipping.` });
    }

    // Call Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [customer_email],
        subject,
        html
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API call failed:', resendData);
      return res.status(resendResponse.status).json({
        error: 'Failed to send email via Resend',
        details: resendData
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email processed and sent successfully',
      id: resendData.id
    });

  } catch (error: any) {
    console.error('Error during webhook execution:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}
