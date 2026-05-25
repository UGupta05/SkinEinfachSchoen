import { Link } from 'react-router-dom';

interface SectionContent {
  subtitle?: string;
  text: string;
}

interface Section {
  id: number;
  title: string;
  content: SectionContent[];
}

const sections: Section[] = [
  {
    id: 1,
    title: "Datenschutz auf einen Blick",
    content: [
      {
        subtitle: "Allgemeine Hinweise",
        text: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.",
      },
      {
        subtitle: "Datenerfassung auf dieser Website",
        text: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.\n\nIhre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.\n\nAndere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.",
      },
      {
        subtitle: "Wofür nutzen wir Ihre Daten?",
        text: "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.",
      },
      {
        subtitle: "Welche Rechte haben Sie bezüglich Ihrer Daten?",
        text: "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.\n\nHierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.",
      },
    ],
  },
  {
    id: 2,
    title: "Hosting",
    content: [
      {
        subtitle: "Vercel (Externes Hosting)",
        text: "Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA gehostet. Vercel ist ein Infrastrukturdienstleister, auf dessen Servern die Website betrieben wird. Die personenbezogenen Daten, die auf dieser Website erfasst werden (z. B. IP-Adressen bei Seitenaufrufen), werden auf den Servern von Vercel verarbeitet.\n\nDer Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).\n\nVercel verarbeitet Ihre Daten nur insoweit, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel: https://vercel.com/legal/privacy-policy",
      },
    ],
  },
  {
    id: 3,
    title: "Allgemeine Hinweise und Pflichtinformationen",
    content: [
      {
        subtitle: "Datenschutz",
        text: "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.\n\nWenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.\n\nWir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
      },
      {
        subtitle: "Hinweis zur verantwortlichen Stelle",
        text: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:\n\nSofia Natawan\nLotter Straße 33\n49078 Osnabrück\n\nTelefon: 0541-47054971\nE-Mail: info@skin-einfachschoen.de\n\nVerantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.",
      },
    ],
  },
  {
    id: 4,
    title: "Neue Transparenzpflichten – KI und automatisierte Datenverarbeitung",
    content: [
      {
        text: "Sofern auf dieser Website KI-basierte Systeme oder automatisierte Entscheidungsverfahren eingesetzt werden, informieren wir darüber, dass personenbezogene Daten zum Zweck der Verbesserung unserer Dienstleistungen verarbeitet werden können.\n\nBetroffene erhalten auf Wunsch Auskunft zur Funktionsweise, den zugrunde liegenden Algorithmen und etwaigen Risiken für die Rechte und Freiheiten natürlicher Personen. Es bestehen Widerspruchsrechte gemäß Art. 22 DSGVO und EU AI Act.",
      },
    ],
  },
  {
    id: 5,
    title: "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)",
    content: [
      {
        text: "WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).\n\nWERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).",
      },
    ],
  },
  {
    id: 6,
    title: "Beschwerderecht bei der zuständigen Aufsichtsbehörde",
    content: [
      {
        text: "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Das Beschwerderecht besteht unabhängig von anderen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfen.",
      },
    ],
  },
  {
    id: 7,
    title: "Recht auf Datenübertragbarkeit",
    content: [
      {
        text: "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format auszuhändigen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.",
      },
    ],
  },
  {
    id: 8,
    title: "SSL- bzw. TLS-Verschlüsselung",
    content: [
      {
        text: "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://\" auf „https://\" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.\n\nWenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.",
      },
    ],
  },
  {
    id: 9,
    title: "Auskunft, Löschung und Berichtigung",
    content: [
      {
        text: "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Dazu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.",
      },
    ],
  },
  {
    id: 10,
    title: "Recht auf Einschränkung der Verarbeitung",
    content: [
      {
        text: "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:\n\n• Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir Zeit, um dies zu überprüfen.\n• Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig erfolgt ist und Sie statt der Löschung die Einschränkung der Verarbeitung verlangen.\n• Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie aber zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen.\n• Wenn Sie Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben und noch nicht feststeht, ob unsere berechtigten Gründe gegenüber Ihren Gründen überwiegen.",
      },
    ],
  },
  {
    id: 11,
    title: "Datenerfassung auf dieser Website – Cookies",
    content: [
      {
        subtitle: "Keine Verwendung von Cookies",
        text: "Diese Website verwendet keine Cookies und speichert keine Informationen im lokalen Speicher (localStorage/sessionStorage) Ihres Browsers. Es werden weder eigene Cookies noch Tracking-Cookies von Drittanbietern gesetzt.\n\nAnalysedaten werden über cookielose Verfahren erhoben (siehe Abschnitt \"Vercel Analytics\"). Eine Einwilligung zur Cookie-Nutzung ist daher nicht erforderlich.",
      },
    ],
  },
  {
    id: 12,
    title: "Anfrage per E-Mail, Telefon oder Kontaktformular",
    content: [
      {
        text: "Wenn Sie uns per E-Mail, Telefon oder über das Kontaktformular auf dieser Website kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.\n\nDie Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.\n\nDie von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens).",
      },
    ],
  },
  {
    id: 13,
    title: "Soziale Medien",
    content: [
      {
        subtitle: "Verlinkung zu sozialen Netzwerken",
        text: "Auf dieser Website befinden sich Links zu den Profilen von SKIN einfach schön auf Instagram, Facebook und YouTube. Dabei handelt es sich ausschließlich um einfache Links (keine eingebetteten Plugins oder Share-Buttons). Beim Anklicken dieser Links verlassen Sie unsere Website. Die Datenschutzbestimmungen der jeweiligen Plattformen gelten ab dem Aufruf der entsprechenden Seiten:\n\n• Instagram: Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland\n• Facebook: Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland\n• YouTube: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland",
      },
    ],
  },
  {
    id: 14,
    title: "Terminbuchung",
    content: [
      {
        subtitle: "Supabase (Terminverwaltung)",
        text: "Für die Online-Terminbuchung nutzen wir den Dienst Supabase (Supabase Inc., 970 Toa Payoh North, #07-04, Singapore 318992). Beim Buchen eines Termins werden Ihre eingegebenen Daten (Name, E-Mail-Adresse, gewählte Behandlung, Wunschdatum) auf den Servern von Supabase gespeichert und an uns übermittelt.\n\nDie Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Terminverwaltung). Supabase verarbeitet Daten gemäß seiner Datenschutzrichtlinie: https://supabase.com/privacy",
      },
    ],
  },
  {
    id: 15,
    title: "Plugins und Tools",
    content: [
      {
        subtitle: "Vercel Analytics & Speed Insights",
        text: "Diese Website nutzt Vercel Analytics und Vercel Speed Insights (Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA) zur datenschutzfreundlichen Analyse des Nutzerverhaltens.\n\nVercel Analytics ist cookielos und erstellt keine individuellen Nutzerprofile. Es werden aggregierte, anonymisierte Daten über Seitenaufrufe und Nutzerherkunft erhoben. Dabei wird die IP-Adresse nicht im Klartext gespeichert, sondern gehasht und nach kurzer Zeit verworfen. Eine Wiedererkennung einzelner Nutzer ist nicht möglich.\n\nDie Nutzung erfolgt auf Grundlage unseres berechtigten Interesses an der statistischen Analyse des Nutzerverhaltens zur Optimierung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Da keine Cookies gesetzt werden und keine personenbezogenen Daten dauerhaft gespeichert werden, ist eine Einwilligung nach § 25 TTDSG nicht erforderlich.\n\nWeitere Informationen: https://vercel.com/docs/analytics/privacy-policy",
      },
      {
        subtitle: "Google Maps",
        text: "Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google\"), Gordon House, Barrow Street, Dublin 4, Irland.\n\nZur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.",
      },
      {
        subtitle: "Google Web Fonts",
        text: "Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Die Google Fonts werden beim Aufruf unserer Website von Google-Servern geladen. Hierbei wird Ihre IP-Adresse an Google übermittelt. Die Einbindung dieser Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Website.\n\nAnbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Weitere Informationen zu Google Web Fonts finden Sie unter https://developers.google.com/fonts/faq und in der Datenschutzerklärung von Google: https://policies.google.com/privacy",
      },
    ],
  },
  {
    id: 16,
    title: "Internationale Datenübermittlung und EU-Vorgaben",
    content: [
      {
        text: "Soweit personenbezogene Daten an Dritte im Ausland, insbesondere außerhalb der Europäischen Union/EWR, übertragen werden (z. B. an Vercel Inc. oder Supabase Inc. in den USA), geschieht dies auf Grundlage eines Angemessenheitsbeschlusses der EU-Kommission (EU-US Data Privacy Framework) oder auf Basis geeigneter Garantien, wie insbesondere EU-Standardvertragsklauseln. Bei Fragen hierzu wenden Sie sich bitte an die im Impressum angegebene verantwortliche Stelle.",
      },
    ],
  },
  {
    id: 17,
    title: "Änderungen dieser Datenschutzerklärung",
    content: [
      {
        text: "Diese Datenschutzerklärung wird regelmäßig den aktuellen gesetzlichen Vorgaben angepasst. Wir empfehlen Ihnen, diese Datenschutzerklärung regelmäßig zu lesen, um über den Schutz der von uns erfassten persönlichen Informationen auf dem Laufenden zu bleiben. Der Stand ist Mai 2025.",
      },
    ],
  },
];

export function Datenschutz() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <p className="font-display text-2xs text-sky-accent uppercase tracking-[0.2em] mb-3">Rechtliches</p>
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-pure-white font-bold">
            Datenschutzerklärung
          </h1>
          <p className="font-sans text-body-md text-sky-accent/80 mt-4 max-w-xl">
            Informationen gemäß DSGVO zum Umgang mit Ihren personenbezogenen Daten auf dieser Website.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-soft-shell border-b border-outline-variant/20 py-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <p className="font-display text-xs text-primary uppercase tracking-widest font-bold mb-4">Inhaltsverzeichnis</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#section-${s.id}`}
                className="font-sans text-sm text-tertiary hover:text-primary transition-colors flex items-start gap-2"
              >
                <span className="text-sky-accent font-bold shrink-0">{s.id}.</span>
                <span>{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="max-w-3xl space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="bg-pure-white rounded-2xl p-8 medical-glow scroll-mt-28"
              >
                <h2 className="font-display text-headline-sm text-primary mb-6 flex items-start gap-3">
                  <span className="text-sky-accent text-sm font-bold shrink-0 mt-1">{section.id}.</span>
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.content.map((block, i) => (
                    <div key={i}>
                      {block.subtitle && (
                        <p className="font-sans font-semibold text-on-surface mb-2">{block.subtitle}</p>
                      )}
                      {block.text.split('\n\n').map((para, j) => (
                        <p key={j} className="font-sans text-body-md text-tertiary mb-3 last:mb-0 whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Back to top */}
            <div className="text-center pt-8">
              <Link
                to="/impressum"
                className="font-sans text-sm text-tertiary hover:text-primary transition-colors underline underline-offset-4"
              >
                Zum Impressum →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
