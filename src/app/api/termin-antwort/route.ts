import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('id');
  const action = searchParams.get('action');
  const origin = req.nextUrl.origin;

  if (!id || !action || (action !== 'accept' && action !== 'decline')) {
    return NextResponse.redirect(new URL(`/termin-antwort?result=error&reason=invalid_link`, origin));
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return NextResponse.redirect(new URL(`/termin-antwort?result=error&reason=server_config`, origin));
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // 1. Fetch the appointment
    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select('id, customer_name, service_name, category, date, time, price, duration, status, status_reason')
      .eq('id', id)
      .single();

    if (fetchError || !appointment) {
      console.error('Appointment not found:', fetchError);
      return NextResponse.redirect(new URL(`/termin-antwort?result=error&reason=not_found`, origin));
    }

    // 2. Check if already processed
    const isAcceptProcessed = appointment.status === 'confirmed' && appointment.status_reason === 'Verschiebung vom Kunden akzeptiert';
    const isDeclineProcessed = appointment.status === 'cancelled' && appointment.status_reason === 'Verschiebung vom Kunden abgelehnt';

    if (isAcceptProcessed || isDeclineProcessed) {
      const params = new URLSearchParams({
        result: 'already_processed',
        status: appointment.status,
        name: appointment.customer_name,
        service: appointment.service_name,
        date: appointment.date,
        time: appointment.time,
      });
      return NextResponse.redirect(new URL(`/termin-antwort?${params.toString()}`, origin));
    }

    // 3. Update the appointment
    const newStatus = action === 'accept' ? 'confirmed' : 'cancelled';
    const newReason = action === 'accept' ? 'Verschiebung vom Kunden akzeptiert' : 'Verschiebung vom Kunden abgelehnt';

    const { error: updateError } = await supabase
      .from('appointments')
      .update({ status: newStatus, status_reason: newReason })
      .eq('id', id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.redirect(new URL(`/termin-antwort?result=error&reason=update_failed`, origin));
    }

    // 4. Redirect to the frontend with success info
    const params = new URLSearchParams({
      result: 'success',
      action: action,
      status: newStatus,
      name: appointment.customer_name,
      service: appointment.service_name,
      date: appointment.date,
      time: appointment.time,
    });
    return NextResponse.redirect(new URL(`/termin-antwort?${params.toString()}`, origin));

  } catch (err) {
    const error = err as Error;
    console.error('termin-antwort handler error:', error);
    return NextResponse.redirect(new URL(`/termin-antwort?result=error&reason=server_error`, origin));
  }
}
