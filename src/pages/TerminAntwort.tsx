import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Calendar, Clock, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export const TerminAntwort: React.FC = () => {
  const [searchParams] = useSearchParams();
  const result = searchParams.get('result');
  // action param is passed through by the API but we only need result/status for display
  const status = searchParams.get('status');
  const name = searchParams.get('name');
  const service = searchParams.get('service');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const reason = searchParams.get('reason');

  // Error states
  if (!result || result === 'error') {
    const errorMessages: Record<string, string> = {
      invalid_link: 'Ungültiger Link. Bitte überprüfen Sie den Link in Ihrer E-Mail.',
      not_found: 'Der Termin konnte leider nicht gefunden werden. Möglicherweise wurde er bereits gelöscht.',
      update_failed: 'Die Aktualisierung konnte nicht durchgeführt werden. Bitte versuchen Sie es erneut.',
      server_config: 'Ein interner Serverfehler ist aufgetreten. Bitte kontaktieren Sie uns direkt.',
      server_error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    };
    const errorText = errorMessages[reason || ''] || 'Ein unerwarteter Fehler ist aufgetreten.';

    return (
      <div className="min-h-[75vh] flex items-center justify-center px-margin-mobile md:px-gutter py-12">
        <div className="w-full max-w-md bg-pure-white border border-outline-variant/10 rounded-2xl p-8 text-center medical-glow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-500/50"></div>
          <AlertCircle className="w-12 h-12 text-red-500/80 mx-auto mb-6" />
          <h2 className="font-display text-xl font-bold text-primary mb-3">Hoppla!</h2>
          <p className="font-sans text-sm text-tertiary leading-relaxed mb-8">{errorText}</p>
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

  const alreadyProcessed = result === 'already_processed';
  const isConfirmed = status === 'confirmed';

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-margin-mobile md:px-gutter py-12 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-fixed-dim/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full max-w-lg bg-pure-white border border-outline-variant/10 rounded-2xl shadow-xl p-8 md:p-10 text-center medical-glow relative overflow-hidden">
        {/* Dynamic Indicator bar based on status */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isConfirmed ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500' : 'bg-gradient-to-r from-red-500 via-rose-400 to-red-500'}`}></div>
        
        {isConfirmed ? (
          <>
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            
            <h1 className="font-display text-2xl font-bold text-primary mb-2">
              {alreadyProcessed ? 'Termin bereits bestätigt!' : 'Verschiebung bestätigt!'}
            </h1>
            
            <p className="font-sans text-sm text-tertiary mb-8 leading-relaxed max-w-md mx-auto">
              {alreadyProcessed 
                ? 'Dieser Termin wurde bereits bestätigt. Wir freuen uns darauf, Sie in unserer Praxis begrüßen zu dürfen.'
                : `Hallo ${name || 'Kunde'}, vielen Dank für Ihre Bestätigung. Wir haben die Terminverschiebung vermerkt und freuen uns auf Sie!`}
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-50 border border-red-200/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="font-display text-2xl font-bold text-primary mb-2">
              {alreadyProcessed ? 'Termin bereits storniert!' : 'Verschiebung abgelehnt!'}
            </h1>
            
            <p className="font-sans text-sm text-tertiary mb-8 leading-relaxed max-w-md mx-auto">
              {alreadyProcessed
                ? 'Dieser Termin wurde bereits storniert. Sie können jederzeit einen neuen Termin vereinbaren.'
                : `Hallo ${name || 'Kunde'}, Sie haben die Verschiebung abgelehnt. Der Termin wurde storniert. Buchen Sie gerne einen neuen Termin zu einer Zeit, die Ihnen besser passt.`}
            </p>
          </>
        )}

        {/* Appointment Details Box */}
        {service && (
          <div className="bg-soft-shell/30 border border-outline-variant/5 rounded-2xl p-6 text-left mb-8 space-y-4">
            <div className="border-b border-outline-variant/10 pb-3">
              <span className="font-display text-[9px] font-bold text-slate-muted uppercase tracking-wider block mb-1">
                Behandlung
              </span>
              <span className="font-display text-sm font-bold text-onyx-text">
                {service}
              </span>
            </div>

            {date && time && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-primary/75 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-display text-[9px] font-bold text-slate-muted uppercase tracking-wider block">
                      Datum
                    </span>
                    <span className="font-sans text-xs font-semibold text-onyx-text">
                      {date}
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
                      {time}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
