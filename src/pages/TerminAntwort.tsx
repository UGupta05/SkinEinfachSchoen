import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { CheckCircle2, XCircle, Calendar, Clock, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface Appointment {
  id: string;
  service_name: string;
  category: string;
  price: string;
  duration: string;
  date: string;
  time: string;
  customer_name: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  status_reason?: string | null;
}

export const TerminAntwort: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const action = searchParams.get('action');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [alreadyProcessed, setAlreadyProcessed] = useState(false);

  useEffect(() => {
    const processResponse = async () => {
      if (!id || !action || (action !== 'accept' && action !== 'decline')) {
        setError('Ungültiger Link. Bitte überprüfen Sie den Link in Ihrer E-Mail.');
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch appointment details
        const { data, error: fetchError } = await supabase
          .from('appointments')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError || !data) {
          throw new Error('Termin konnte nicht gefunden werden.');
        }

        const appData = data as Appointment;
        setAppointment(appData);

        // 2. Check if the response was already processed
        // If it was already accepted (confirmed and reason is accept)
        // or already declined (cancelled and reason is decline)
        const isAcceptProcessed = appData.status === 'confirmed' && appData.status_reason === 'Verschiebung vom Kunden akzeptiert';
        const isDeclineProcessed = appData.status === 'cancelled' && appData.status_reason === 'Verschiebung vom Kunden abgelehnt';

        if (isAcceptProcessed || isDeclineProcessed) {
          setAlreadyProcessed(true);
          setLoading(false);
          return;
        }

        // 3. Perform update if status permits it
        // We only update if the status is not already cancelled (unless we decline, which keeps it cancelled or sets it)
        // If they accept, we update status to 'confirmed' and status_reason
        // If they decline, we update status to 'cancelled' and status_reason
        const newStatus = action === 'accept' ? 'confirmed' : 'cancelled';
        const newReason = action === 'accept' ? 'Verschiebung vom Kunden akzeptiert' : 'Verschiebung vom Kunden abgelehnt';

        const { error: updateError } = await supabase
          .from('appointments')
          .update({
            status: newStatus,
            status_reason: newReason
          })
          .eq('id', id);

        if (updateError) {
          throw new Error('Status konnte nicht aktualisiert werden: ' + updateError.message);
        }

        // Update local state to reflect change
        setAppointment(prev => prev ? { ...prev, status: newStatus, status_reason: newReason } : null);

      } catch (err: any) {
        console.error('Error processing appointment response:', err);
        setError(err.message || 'Ein unerwarteter Fehler ist aufgetreten.');
      } finally {
        setLoading(false);
      }
    };

    processResponse();
  }, [id, action]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-primary/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <p className="font-display text-sm font-bold text-slate-muted uppercase tracking-widest animate-pulse">
          Antwort wird übermittelt...
        </p>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-margin-mobile md:px-gutter py-12">
        <div className="w-full max-w-md bg-pure-white border border-outline-variant/10 rounded-2xl p-8 text-center medical-glow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-500/50"></div>
          <AlertCircle className="w-12 h-12 text-red-500/80 mx-auto mb-6" />
          <h2 className="font-display text-xl font-bold text-primary mb-3">Hoppla!</h2>
          <p className="font-sans text-sm text-tertiary leading-relaxed mb-8">{error || 'Termin wurde nicht gefunden.'}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:opacity-90 text-pure-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Zur Startseite <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const isConfirmed = appointment.status === 'confirmed';

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-margin-mobile md:px-gutter py-12 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-fixed-dim/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full max-w-lg bg-pure-white border border-outline-variant/10 rounded-2xl shadow-xl p-8 md:p-10 text-center medical-glow relative overflow-hidden">
        {/* Dynamic Indicator bar based on status */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isConfirmed ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500' : 'bg-gradient-to-r from-red-500 via-rose-400 to-red-500'}`}></div>
        
        {isConfirmed ? (
          <>
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            
            <h1 className="font-display text-2xl font-bold text-primary mb-2">
              {alreadyProcessed ? 'Termin bereits bestätigt!' : 'Verschiebung bestätigt!'}
            </h1>
            
            <p className="font-sans text-sm text-tertiary mb-8 leading-relaxed max-w-md mx-auto">
              {alreadyProcessed 
                ? 'Dieser Termin wurde bereits bestätigt. Wir freuen uns darauf, Sie in unserer Praxis begrüßen zu dürfen.'
                : `Hallo ${appointment.customer_name}, vielen Dank für Ihre Bestätigung. Wir haben die Terminverschiebung vermerkt.`}
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-50 border border-red-200/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in-50 duration-300">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="font-display text-2xl font-bold text-primary mb-2">
              {alreadyProcessed ? 'Termin bereits storniert!' : 'Verschiebung abgelehnt!'}
            </h1>
            
            <p className="font-sans text-sm text-tertiary mb-8 leading-relaxed max-w-md mx-auto">
              {alreadyProcessed
                ? 'Dieser Termin wurde bereits storniert. Sie können jederzeit einen neuen Termin vereinbaren.'
                : `Hallo ${appointment.customer_name}, Sie haben die Verschiebung abgelehnt. Der Termin wurde storniert.`}
            </p>
          </>
        )}

        {/* Appointment Details Box */}
        <div className="bg-soft-shell/30 border border-outline-variant/5 rounded-2xl p-6 text-left mb-8 space-y-4">
          <div className="border-b border-outline-variant/10 pb-3">
            <span className="font-display text-[9px] font-bold text-slate-muted uppercase tracking-wider block mb-1">
              Behandlung
            </span>
            <span className="font-display text-sm font-bold text-onyx-text">
              {appointment.service_name}
            </span>
            <span className="text-xs text-outline block mt-0.5">
              {appointment.category} • {appointment.duration}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-primary/75 mt-0.5 shrink-0" />
              <div>
                <span className="font-display text-[9px] font-bold text-slate-muted uppercase tracking-wider block">
                  Datum
                </span>
                <span className="font-sans text-xs font-semibold text-onyx-text">
                  {appointment.date}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-primary/75 mt-0.5 shrink-0" />
              <div>
                <span className="font-display text-[9px] font-bold text-slate-muted uppercase tracking-wider block">
                  Uhrzeit
                </span>
                <span className="font-sans text-xs font-semibold text-onyx-text">
                  {appointment.time}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isConfirmed ? (
            <>
              <a
                href="https://maps.google.com/?q=Lotter+Strasse+33,+49078+Osnabrueck"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border border-outline-variant/15 hover:bg-soft-shell/30 text-tertiary text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Anfahrt planen
              </a>
              <Link
                to="/"
                className="px-6 py-3 bg-primary hover:opacity-90 text-pure-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                Zur Homepage <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="px-6 py-3 border border-outline-variant/15 hover:bg-soft-shell/30 text-tertiary text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Zur Homepage
              </Link>
              <Link
                to="/terminbuchung"
                className="px-6 py-3 bg-primary hover:opacity-90 text-pure-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                Neuen Termin buchen <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
