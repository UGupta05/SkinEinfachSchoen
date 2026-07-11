import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limit store
interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitInfo>();

const LIMIT = 3; // Max 3 requests
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes window

// Cleanup expired entries every minute
if (typeof global !== 'undefined') {
  const interval = setInterval(() => {
    const now = Date.now();
    for (const [ip, info] of rateLimitMap.entries()) {
      if (now > info.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 60000);
  // Ensure serverless functions don't hang if they support unref
  if (interval && typeof interval.unref === 'function') {
    interval.unref();
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Get client IP address
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
               req.headers.get('x-real-ip') || 
               '127.0.0.1';

    // 2. Check rate limit
    const now = Date.now();
    const info = rateLimitMap.get(ip);

    if (!info || now > info.resetTime) {
      // New window or first request
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    } else if (info.count >= LIMIT) {
      const remainingSeconds = Math.ceil((info.resetTime - now) / 1000);
      const remainingMinutes = Math.ceil(remainingSeconds / 60);
      return NextResponse.json({
        error: 'Too Many Requests',
        message: `Zu viele Anfragen. Bitte warten Sie ${remainingMinutes} Minute(n), bevor Sie es erneut versuchen.`
      }, { status: 429 });
    } else {
      info.count += 1;
    }

    const payload = await req.json();
    const { vorname, nachname, email, telefon, betreff, nachricht } = payload;

    if (!vorname || !nachname || !email || !nachricht) {
      return NextResponse.json({ error: 'Bad Request: Missing required fields' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Server Configuration Error: Mail API key missing' }, { status: 500 });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Skin Einfach Schön <onboarding@resend.dev>';
    const toEmail = 'info@skin-einfachschoen.de';

    const subject = `Neue Kontaktanfrage: ${betreff} - von ${vorname} ${nachname}`;
    
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #416373; border-bottom: 2px solid #EFF4F6; padding-bottom: 10px; margin-top: 0;">Neue Kontaktanfrage</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #4b5563;">Name:</td>
            <td style="padding: 8px 0; color: #1f2937;">${vorname} ${nachname}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">E-Mail:</td>
            <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${email}" style="color: #02658d; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Telefon:</td>
            <td style="padding: 8px 0; color: #1f2937;">${telefon || 'Nicht angegeben'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Betreff:</td>
            <td style="padding: 8px 0; color: #1f2937;">${betreff}</td>
          </tr>
        </table>
        
        <div style="margin-top: 25px; padding: 15px; background-color: #EFF4F6; border-radius: 6px; border-left: 4px solid #416373;">
          <h4 style="margin-top: 0; margin-bottom: 8px; color: #416373;">Nachricht:</h4>
          <p style="margin: 0; color: #1f2937; white-space: pre-wrap; line-height: 1.5;">${nachricht}</p>
        </div>
        
        <div style="margin-top: 30px; font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          Diese Nachricht wurde über das Kontaktformular von SKIN einfach schön gesendet.
        </div>
      </div>
    `;

    // Call Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
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
      message: 'Contact form message sent successfully',
      id: resendData.id
    }, { status: 200 });

  } catch (err) {
    const error = err as Error;
    console.error('Error in contact form API:', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      message: error.message
    }, { status: 500 });
  }
}
