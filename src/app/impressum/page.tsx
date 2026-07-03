import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | SKIN einfach schön Kosmetikstudio Osnabrück',
  description: 'Rechtliche Angaben und Kontaktinformationen für die SKIN einfach schön GmbH in Osnabrück.',
  robots: 'noindex, follow',
};

export default function ImpressumPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <p className="font-display text-2xs text-sky-accent uppercase tracking-[0.2em] mb-3">Rechtliches</p>
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-pure-white font-bold">
            Impressum
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="max-w-3xl space-y-12">

            {/* Angaben gemäß § 5 TMG */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">Angaben gemäß § 5 TMG</h2>
              <div className="font-sans text-body-md text-tertiary space-y-1">
                <p className="font-semibold text-on-surface">Skin einfach schoen GmbH</p>
                <p>Lotter Straße 33</p>
                <p>49078 Osnabrück</p>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/30 font-sans text-body-md text-tertiary space-y-1">
                <p><span className="font-semibold text-on-surface">Handelsregister:</span> HRB 214650</p>
                <p><span className="font-semibold text-on-surface">Registergericht:</span> Amtsgericht Osnabrück</p>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/30 font-sans text-body-md text-tertiary">
                <p className="font-semibold text-on-surface mb-1">Vertreten durch:</p>
                <p>Sofia Natawan</p>
              </div>
            </div>

            {/* Kontakt */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">Kontakt</h2>
              <div className="font-sans text-body-md text-tertiary space-y-2">
                <p>
                  <span className="font-semibold text-on-surface">Telefon:</span>{' '}
                  <a href="tel:+4954147054971" className="text-primary hover:underline">0541-47054971</a>
                </p>
                <p>
                  <span className="font-semibold text-on-surface">E-Mail:</span>{' '}
                  <a href="mailto:info@skin-einfachschoen.de" className="text-primary hover:underline">info@skin-einfachschoen.de</a>
                </p>
              </div>
            </div>

            {/* Umsatzsteuer-ID */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">Umsatzsteuer-ID</h2>
              <p className="font-sans text-body-md text-tertiary">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              </p>
              <p className="font-sans text-body-md text-on-surface font-semibold mt-2">DE329107346</p>
            </div>

            {/* Berufsbezeichnung */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <div className="font-sans text-body-md text-tertiary space-y-2">
                <p><span className="font-semibold text-on-surface">Berufsbezeichnung:</span> Kosmetik und Fußpflege Studio</p>
                <p><span className="font-semibold text-on-surface">Zuständige Kammer:</span> Handwerkskammer Osnabrück</p>
                <p><span className="font-semibold text-on-surface">Verliehen durch:</span> Deutschland</p>
                <p><span className="font-semibold text-on-surface">Berufsrechtliche Regelungen:</span> Handwerksordnung</p>
                <p className="mt-2">
                  Regelungen einsehbar unter:{' '}
                  <a
                    href="http://www.gesetze-im-internet.de/hwo/BJNR014110953.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 decoration-sky-accent hover:text-secondary transition-colors break-all"
                  >
                    www.gesetze-im-internet.de/hwo
                  </a>
                </p>
              </div>
            </div>

            {/* Berufshaftpflichtversicherung */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">Angaben zur Berufshaftpflichtversicherung</h2>
              <div className="font-sans text-body-md text-tertiary space-y-4">
                <div>
                  <p className="font-semibold text-on-surface mb-1">Name und Sitz des Versicherers:</p>
                  <p>Nürnberger Versicherung</p>
                  <p>Ostendstraße 100</p>
                  <p>90334 Nürnberg</p>
                </div>
                <div>
                  <p className="font-semibold text-on-surface mb-1">Geltungsraum der Versicherung:</p>
                  <p>Deutschland und gesamte EU</p>
                </div>
              </div>
            </div>

            {/* EU-Streitschlichtung */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">EU-Streitschlichtung</h2>
              <p className="font-sans text-body-md text-tertiary mb-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 decoration-sky-accent hover:text-secondary transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="font-sans text-body-md text-tertiary">
                Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            {/* Haftung für Inhalte */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">Haftung für Inhalte</h2>
              <p className="font-sans text-body-md text-tertiary mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="font-sans text-body-md text-tertiary">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            {/* Haftung für Links */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">Haftung für Links</h2>
              <p className="font-sans text-body-md text-tertiary mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
              <p className="font-sans text-body-md text-tertiary">
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>

            {/* Urheberrecht */}
            <div className="bg-pure-white rounded-2xl p-8 medical-glow">
              <h2 className="font-display text-headline-sm text-primary mb-6">Urheberrecht</h2>
              <p className="font-sans text-body-md text-tertiary mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
              <p className="font-sans text-body-md text-tertiary">
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
