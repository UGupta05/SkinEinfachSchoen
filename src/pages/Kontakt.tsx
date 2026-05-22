import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, Check, Loader2 } from 'lucide-react';

export const Kontakt: React.FC = () => {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    betreff: 'Beratungstermin',
    nachricht: '',
    privacy: false
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) return;

    setStatus('loading');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          vorname: '',
          nachname: '',
          email: '',
          telefon: '',
          betreff: 'Beratungstermin',
          nachricht: '',
          privacy: false
        });
      }, 3000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 z-10">
            <span className="font-display text-xs font-bold text-slate-muted mb-4 block uppercase tracking-widest">
              Wir freuen uns auf Sie
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-primary">
              Kontaktieren Sie uns
            </h1>
            <p className="font-sans text-lg text-tertiary max-w-2xl leading-relaxed">
              Haben Sie Fragen zu unseren Behandlungen oder möchten Sie eine individuelle Beratung? Unser Expertenteam in Osnabrück steht Ihnen gerne zur Verfügung.
            </p>
          </div>
          <div className="md:col-span-5 relative h-[300px] md:h-[400px]">
            <img
              alt="SKIN Osnabrück Entrance"
              className="w-full h-full object-cover rounded-lg medical-glow border border-outline-variant/15"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMH6AR13kfrENhhFp59Z-dtACG3dEe9bTx9cxMDYq5-kEsYh2JUiIB0-myNbyBQwJ9xkSd88CoOqbJT-U-SWUj-HHr0j3_hvJd56X9E44fOaAGPIDhaQUqSMOKvDiOs7pL2SuwTkm8jDb2wZ6hADs6xPuyVuf1YgLxe0VGeMgED6xaVe4aiKppazSNMUtWC4Xo0qIiSnxSroTAq6olY7wtGxxZB0AErAsE3kPXtvO8rh_s37HkJ8guL9oa_i5aCCciNPSR7_BdmXM"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-fixed-dim/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Contact Grid (Bento Style) */}
      <section className="py-12 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Card 1: Address */}
          <div className="bg-pure-white p-10 medical-glow border border-outline-variant/10 group hover:border-primary/20 transition-all rounded-lg flex flex-col justify-between">
            <div>
              <MapPin className="text-primary w-10 h-10 mb-6" />
              <h3 className="font-display text-xl font-bold mb-4 text-primary">Anschrift</h3>
              <address className="not-italic text-tertiary font-sans text-base leading-relaxed">
                Lotter Straße 33<br />
                49078 Osnabrück<br />
                Deutschland
              </address>
            </div>
            <a
              className="inline-block mt-8 font-display text-xs font-bold text-primary border-b border-primary hover:text-secondary hover:border-secondary transition-colors uppercase tracking-wider self-start"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Route planen
            </a>
          </div>

          {/* Info Card 2: Contact */}
          <div className="bg-pure-white p-10 medical-glow border border-outline-variant/10 group hover:border-primary/20 transition-all rounded-lg">
            <Phone className="text-primary w-10 h-10 mb-6" />
            <h3 className="font-display text-xl font-bold mb-4 text-primary">Direktkontakt</h3>
            <div className="space-y-4">
              <div>
                <p className="font-display text-[10px] font-bold text-slate-muted uppercase tracking-widest mb-1">Telefon</p>
                <a className="text-tertiary font-sans text-base hover:text-primary transition-colors block" href="tel:+495411234567">
                  +49 (0) 541 123 45 67
                </a>
              </div>
              <div>
                <p className="font-display text-[10px] font-bold text-slate-muted uppercase tracking-widest mb-1">E-Mail</p>
                <a className="text-tertiary font-sans text-base hover:text-primary transition-colors block" href="mailto:hallo@skin-os.de">
                  hallo@skin-os.de
                </a>
              </div>
            </div>
          </div>

          {/* Info Card 3: Hours */}
          <div className="bg-pure-white p-10 medical-glow border border-outline-variant/10 group hover:border-primary/20 transition-all rounded-lg">
            <Clock className="text-primary w-10 h-10 mb-6" />
            <h3 className="font-display text-xl font-bold mb-4 text-primary">Öffnungszeiten</h3>
            <ul className="space-y-3 text-tertiary font-sans text-sm">
              <li className="flex justify-between">
                <span>Mo – Do:</span>
                <span className="font-semibold text-primary">09:00 – 18:30</span>
              </li>
              <li className="flex justify-between">
                <span>Freitag:</span>
                <span className="font-semibold text-primary">09:00 – 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Samstag:</span>
                <span className="font-semibold text-primary">Nach Vereinbarung</span>
              </li>
              <li className="pt-4 text-xs italic text-slate-muted">Flexible Termine für Berufstätige möglich.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-24 bg-soft-shell/50 border-t border-outline-variant/10">
        <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form Canvas */}
            <div className="bg-pure-white p-8 md:p-12 medical-glow rounded-lg border border-outline-variant/10">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-primary">
                Senden Sie uns eine Nachricht
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="font-display text-2xs font-bold text-slate-muted block mb-2 uppercase tracking-widest">
                      Vorname
                    </label>
                    <input
                      name="vorname"
                      value={formData.vorname}
                      onChange={handleInputChange}
                      className="w-full bg-soft-shell border-b border-outline-variant/30 focus:border-primary py-3 px-4 focus:ring-0 focus:outline-none transition-all text-sm rounded-t"
                      required
                      type="text"
                    />
                  </div>
                  <div className="relative">
                    <label className="font-display text-2xs font-bold text-slate-muted block mb-2 uppercase tracking-widest">
                      Nachname
                    </label>
                    <input
                      name="nachname"
                      value={formData.nachname}
                      onChange={handleInputChange}
                      className="w-full bg-soft-shell border-b border-outline-variant/30 focus:border-primary py-3 px-4 focus:ring-0 focus:outline-none transition-all text-sm rounded-t"
                      required
                      type="text"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="font-display text-2xs font-bold text-slate-muted block mb-2 uppercase tracking-widest">
                      E-Mail Adresse
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-soft-shell border-b border-outline-variant/30 focus:border-primary py-3 px-4 focus:ring-0 focus:outline-none transition-all text-sm rounded-t"
                      required
                      type="email"
                    />
                  </div>
                  <div className="relative">
                    <label className="font-display text-2xs font-bold text-slate-muted block mb-2 uppercase tracking-widest">
                      Telefonnummer
                    </label>
                    <input
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleInputChange}
                      className="w-full bg-soft-shell border-b border-outline-variant/30 focus:border-primary py-3 px-4 focus:ring-0 focus:outline-none transition-all text-sm rounded-t"
                      type="tel"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="font-display text-2xs font-bold text-slate-muted block mb-2 uppercase tracking-widest">
                    Wie können wir helfen?
                  </label>
                  <select
                    name="betreff"
                    value={formData.betreff}
                    onChange={handleInputChange}
                    className="w-full bg-soft-shell border-b border-outline-variant/30 focus:border-primary py-3 px-4 focus:ring-0 focus:outline-none transition-all text-sm rounded-t appearance-none"
                  >
                    <option value="Beratungstermin">Beratungstermin</option>
                    <option value="Frage zu Leistungen">Frage zu Leistungen</option>
                    <option value="Produktanfrage">Produktanfrage</option>
                    <option value="Sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="font-display text-2xs font-bold text-slate-muted block mb-2 uppercase tracking-widest">
                    Ihre Nachricht
                  </label>
                  <textarea
                    name="nachricht"
                    value={formData.nachricht}
                    onChange={handleInputChange}
                    className="w-full bg-soft-shell border-b border-outline-variant/30 focus:border-primary py-3 px-4 focus:ring-0 focus:outline-none transition-all text-sm rounded-t resize-none"
                    required
                    rows={5}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-outline-variant/50 rounded mt-1 cursor-pointer"
                    required
                    type="checkbox"
                  />
                  <label className="text-xs text-tertiary leading-relaxed cursor-pointer" htmlFor="privacy">
                    Ich akzeptiere die{' '}
                    <a className="underline hover:text-primary transition-colors" href="/datenschutz">
                      Datenschutzerklärung
                    </a>
                    .
                  </label>
                </div>

                <button
                  disabled={status !== 'idle'}
                  className={`w-full text-pure-white font-display text-xs font-bold py-5 uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 rounded ${
                    status === 'success'
                      ? 'bg-secondary'
                      : 'bg-primary hover:opacity-95 active:scale-95 duration-150'
                  }`}
                  type="submit"
                >
                  {status === 'idle' && (
                    <>
                      <span>Nachricht absenden</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                  {status === 'loading' && (
                    <>
                      <span>Wird gesendet...</span>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <span>Gesendet!</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map Canvas */}
            <div className="space-y-12">
              <div className="h-[500px] w-full bg-surface-container overflow-hidden rounded-lg border border-outline-variant/10 medical-glow relative group">
                <div className="w-full h-full bg-slate-100 flex items-center justify-center relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img
                    alt="Map view"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5PoNVosWxr1vdOGQJShUUJS0NvtbN49u1rS1iPlzPsqdo8OMe8DuaoEp5yHoDmLQmfFummmtj4dj7IgEdfHuJTwjBkksWYnirtH-gx4y9NFv3G29TMDnng4PVymvQG6vORzs1hP3N2CrHdlKUKjBbj4pzpLwpdm8sF614OWz4oZRs7OaQRFRSPwVa4b34M7xJChWm69jTVwXf4U-xDmDvKm5DvHIhaGelINdZXywBPeRlSsbriLwDccS0CSV_1BWLquZdqpDe_FE"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary text-pure-white p-4 rounded-full medical-glow animate-bounce shadow-lg">
                      <MapPin className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-pure-white/95 backdrop-blur-md p-6 border border-outline-variant/20 rounded shadow-md">
                    <p className="font-display text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">
                      UNSER STANDORT
                    </p>
                    <p className="font-sans text-xs text-on-surface leading-relaxed">
                      Eingang Lotter Straße, Parkplätze direkt im Hof vorhanden.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 p-8 border-l-4 border-primary rounded-r">
                <h4 className="font-display text-lg font-bold text-primary mb-4">Anfahrt &amp; Parken</h4>
                <p className="text-tertiary font-sans text-sm leading-relaxed">
                  Sie finden uns in der Nähe des Westerberg-Viertels. Kostenfreie Parkmöglichkeiten stehen unseren Patienten während der Behandlung direkt auf dem Hof zur Verfügung. Die Bushaltestelle &quot;Lotter Straße&quot; befindet sich nur 50 Meter entfernt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
