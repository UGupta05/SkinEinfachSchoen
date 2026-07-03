import { NextRequest, NextResponse } from 'next/server';
import {
  getBookingPendingTemplate,
  getBookingConfirmedTemplate,
  getBookingCancelledTemplate,
  getBookingUpdatedTemplate
} from '../helpers/emailTemplates';

export async function POST(req: NextRequest) {
  try {
    // 1. Validate webhook secret
    const webhookSecretHeader = req.headers.get('x-webhook-secret');
    const expectedSecret = process.env.SUPABASE_WEBHOOK_SECRET;

    if (expectedSecret && webhookSecretHeader !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized: Invalid webhook secret' }, { status: 401 });
    }

    const payload = await req.json();
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Bad Request: Invalid body payload' }, { status: 400 });
    }

    const { type, record, old_record } = payload;
    
    if (!record) {
      return NextResponse.json({ error: 'Bad Request: Missing record data' }, { status: 400 });
    }

    const {
      id,
      customer_name,
      customer_email,
      service_name,
      date,
      time,
      price,
      duration,
      status,
      status_reason,
      expert
    } = record;

    if (!customer_email) {
      return NextResponse.json({ message: 'No customer email provided. Skipping.' }, { status: 200 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Server Configuration Error: Mail API key missing' }, { status: 500 });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Skin Einfach Schön <onboarding@resend.dev>';

    let subject = '';
    let html = '';

    if (type === 'INSERT') {
      // New booking is always pending initially
      subject = 'Ihre Terminbuchungsanfrage - Skin Einfach Schön';
      html = getBookingPendingTemplate(customer_name, service_name, date, time, price, duration, expert);
    } else if (type === 'UPDATE') {
      const oldStatus = old_record?.status;
      const newStatus = status;
      const oldDate = old_record?.date;
      const oldTime = old_record?.time;
      const oldService = old_record?.service_name;
      const oldExpert = old_record?.expert;

      // Check if date, time, or service changed first (rescheduling takes priority over status updates)
      if (oldDate !== date || oldTime !== time || oldService !== service_name) {
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const host = req.headers.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;

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
          oldService,
          status_reason,
          id,
          baseUrl,
          expert,
          oldExpert
        );
      } else if (oldStatus !== newStatus) {
        if (newStatus === 'confirmed') {
          subject = 'Termin bestätigt - Skin Einfach Schön';
          html = getBookingConfirmedTemplate(customer_name, service_name, date, time, price, duration, status_reason, expert);
        } else if (newStatus === 'cancelled') {
          subject = 'Termin storniert - Skin Einfach Schön';
          html = getBookingCancelledTemplate(customer_name, service_name, date, time, status_reason);
        } else {
          return NextResponse.json({ message: `Status updated to ${newStatus}. No email trigger mapped.` }, { status: 200 });
        }
      } else {
        return NextResponse.json({ message: 'No actionable fields changed (or only expert changed). Skipping.' }, { status: 200 });
      }
    } else {
      return NextResponse.json({ message: `Unhandled event type: ${type}. Skipping.` }, { status: 200 });
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
      return NextResponse.json({
        error: 'Failed to send email via Resend',
        details: resendData
      }, { status: resendResponse.status });
    }

    return NextResponse.json({
      success: true,
      message: 'Email processed and sent successfully',
      id: resendData.id
    }, { status: 200 });

  } catch (err) {
    const error = err as Error;
    console.error('Error during webhook execution:', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      message: error.message
    }, { status: 500 });
  }
}
