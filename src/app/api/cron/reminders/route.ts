import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getBookingReminderTemplate } from '../../helpers/emailTemplates';

export async function GET(req: NextRequest) {
  // 1. Verify cron invocation authorization in production
  const authHeader = req.headers.get('authorization');
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;

  if (isProduction && !isVercelCron) {
    return NextResponse.json({ error: 'Unauthorized: Cron signature verification failed' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Supabase credentials are not configured inside the serverless environment');
    return NextResponse.json({ error: 'Server Configuration Error: Database credentials missing' }, { status: 500 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured');
    return NextResponse.json({ error: 'Server Configuration Error: Mail API key missing' }, { status: 500 });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Skin Einfach Schön <onboarding@resend.dev>';

  try {
    // 2. Determine tomorrow's date string in Germany (Europe/Berlin timezone)
    // to match the date format of appointments (e.g., "Sa, 23. Mai")
    const dateStrInBerlin = new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' });
    const berlinDateTomorrow = new Date(dateStrInBerlin);
    berlinDateTomorrow.setDate(berlinDateTomorrow.getDate() + 1);

    const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

    const dayName = daysOfWeek[berlinDateTomorrow.getDay()];
    const dayNum = berlinDateTomorrow.getDate();
    const monthName = months[berlinDateTomorrow.getMonth()];

    const tomorrowString = `${dayName}, ${dayNum}. ${monthName}`;
    console.log(`Searching for appointments on date: "${tomorrowString}"`);

    // 3. Initialize Supabase client using Service Role API key
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    // 4. Fetch confirmed appointments scheduled for tomorrow that haven't been reminded
    const { data: appointments, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', 'confirmed')
      .eq('date', tomorrowString)
      // Check for reminded is false (default is false) or null
      .or('reminded.eq.false,reminded.is.null');

    if (fetchError) {
      throw fetchError;
    }

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({
        success: true,
        message: `No pending reminders found for tomorrow (${tomorrowString}).`,
        remindersSent: 0
      }, { status: 200 });
    }

    console.log(`Found ${appointments.length} appointments for tomorrow requiring reminders.`);

    let sentCount = 0;
    const failures: any[] = [];

    // 5. Send reminders and update status
    for (const app of appointments) {
      if (!app.customer_email) {
        console.warn(`Appointment ${app.id} lacks customer_email. Skipping.`);
        continue;
      }

      try {
        const html = getBookingReminderTemplate(
          app.customer_name,
          app.service_name,
          app.date,
          app.time,
          app.expert
        );

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [app.customer_email],
            subject: 'Terminerinnerung - Skin Einfach Schön',
            html
          })
        });

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
          throw new Error(`Resend API returned status ${resendResponse.status}: ${JSON.stringify(resendData)}`);
        }

        // Update reminded status in Supabase
        const { error: updateError } = await supabase
          .from('appointments')
          .update({ reminded: true })
          .eq('id', app.id);

        if (updateError) {
          console.error(`Error updating reminded flag for appointment ID ${app.id}:`, updateError);
          // Don't throw, we already sent the email, but log the error
        }

        sentCount++;
      } catch (err) {
        const sendError = err as Error;
        console.error(`Failed to send reminder for appointment ID ${app.id}:`, sendError);
        failures.push({ appointmentId: app.id, error: sendError.message });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Finished processing reminders. Sent: ${sentCount}, Failed: ${failures.length}`,
      remindersSent: sentCount,
      failures
    }, { status: 200 });

  } catch (err) {
    const error = err as Error;
    console.error('Error during reminders cron execution:', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      message: error.message
    }, { status: 500 });
  }
}
