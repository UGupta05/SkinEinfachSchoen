import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id, action } = req.query;

  if (!id || !action || (action !== 'accept' && action !== 'decline')) {
    return res.redirect(302, `/termin-antwort?result=error&reason=invalid_link`);
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return res.redirect(302, `/termin-antwort?result=error&reason=server_config`);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // 1. Fetch the appointment
    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select('id, customer_name, service_name, category, date, time, price, duration, status, status_reason')
      .eq('id', id as string)
      .single();

    if (fetchError || !appointment) {
      console.error('Appointment not found:', fetchError);
      return res.redirect(302, `/termin-antwort?result=error&reason=not_found`);
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
      return res.redirect(302, `/termin-antwort?${params.toString()}`);
    }

    // 3. Update the appointment
    const newStatus = action === 'accept' ? 'confirmed' : 'cancelled';
    const newReason = action === 'accept' ? 'Verschiebung vom Kunden akzeptiert' : 'Verschiebung vom Kunden abgelehnt';

    const { error: updateError } = await supabase
      .from('appointments')
      .update({ status: newStatus, status_reason: newReason })
      .eq('id', id as string);

    if (updateError) {
      console.error('Update error:', updateError);
      return res.redirect(302, `/termin-antwort?result=error&reason=update_failed`);
    }

    // 4. Redirect to the frontend with success info
    const params = new URLSearchParams({
      result: 'success',
      action: action as string,
      status: newStatus,
      name: appointment.customer_name,
      service: appointment.service_name,
      date: appointment.date,
      time: appointment.time,
    });
    return res.redirect(302, `/termin-antwort?${params.toString()}`);

  } catch (err) {
    const error = err as Error;
    console.error('termin-antwort handler error:', error);
    return res.redirect(302, `/termin-antwort?result=error&reason=server_error`);
  }
}
