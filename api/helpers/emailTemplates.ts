const getEmailWrapper = (title: string, contentHtml: string): string => {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f9f9f9;
      color: #232324;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .wrapper {
      background-color: #f9f9f9;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e8e8e8;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(116, 150, 168, 0.05);
    }
    .header {
      background-color: #416373;
      padding: 40px 30px;
      text-align: center;
    }
    .header-logo {
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #ffffff;
      margin: 0;
      text-transform: uppercase;
    }
    .header-subtitle {
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.2em;
      color: #ffffff;
      opacity: 0.8;
      margin: 8px 0 0 0;
      text-transform: uppercase;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
      font-size: 15px;
    }
    .greeting {
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #416373;
      margin-top: 0;
      margin-bottom: 20px;
    }
    .details-table {
      width: 100%;
      background-color: #F9F9F9;
      border-left: 4px solid #416373;
      border-radius: 0 8px 8px 0;
      margin: 30px 0;
      padding: 20px;
      border-spacing: 0;
    }
    .details-label {
      padding: 6px 0;
      font-weight: bold;
      color: #7496A8;
      font-size: 12px;
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: 120px;
      vertical-align: top;
      text-align: left;
    }
    .details-value {
      padding: 6px 0;
      color: #232324;
      font-size: 14px;
      text-align: left;
    }
    .footer {
      background-color: #F9F9F9;
      padding: 40px 30px;
      text-align: center;
      font-size: 12px;
      color: #7496A8;
      border-top: 1px solid #e8e8e8;
    }
    .footer-title {
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      font-weight: 700;
      color: #416373;
      margin-bottom: 10px;
      font-size: 13px;
      letter-spacing: 0.05em;
    }
    .footer p {
      margin: 4px 0;
      line-height: 1.5;
    }
    .footer-divider {
      height: 1px;
      background-color: #e8e8e8;
      margin: 20px 0;
    }
    .button-container {
      margin-top: 30px;
      text-align: center;
    }
    .button {
      display: inline-block;
      background-color: #416373;
      color: #ffffff !important;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 8px;
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      box-shadow: 0 4px 10px rgba(65, 99, 115, 0.2);
    }
    .text-muted {
      color: #7496A8;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="header-logo">Skin Einfach Schön</div>
        <div class="header-subtitle">Kosmetik & Hautpflege</div>
      </div>
      <div class="content">
        ${contentHtml}
      </div>
      <div class="footer">
        <div class="footer-title">Skin Einfach Schön</div>
        <p>Inhaberin: Sofia Khaliq-Natawan & Team</p>
        <p>Lotter Straße 33 &bull; 49078 Osnabrück</p>
        <p>Telefon: +49 (0) 541 123 45 67 &bull; E-Mail: hallo@skin-os.de</p>
        <div class="footer-divider"></div>
        <p>&copy; ${currentYear} Skin Einfach Schön. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
};

export const getBookingPendingTemplate = (
  customerName: string,
  serviceName: string,
  date: string,
  time: string,
  price: string,
  duration: string
): string => {
  const content = `
    <h2 class="greeting">Hallo ${customerName},</h2>
    <p>vielen Dank für Ihre Online-Terminbuchung bei <strong>Skin Einfach Schön</strong>. Wir haben Ihre Buchungsanfrage erhalten und prüfen diese derzeit.</p>
    <p>Wir melden uns in Kürze mit einer Bestätigung bei Ihnen. Hier sind die Details Ihrer Anfrage im Überblick:</p>
    
    <table class="details-table" role="presentation">
      <tr>
        <td class="details-label">Behandlung:</td>
        <td class="details-value"><strong>${serviceName}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Datum:</td>
        <td class="details-value">${date}</td>
      </tr>
      <tr>
        <td class="details-label">Uhrzeit:</td>
        <td class="details-value">${time}</td>
      </tr>
      <tr>
        <td class="details-label">Preis:</td>
        <td class="details-value">${price}</td>
      </tr>
      <tr>
        <td class="details-label">Dauer:</td>
        <td class="details-value">${duration}</td>
      </tr>
    </table>
    
    <p class="text-muted">Bitte beachten Sie: Dies ist noch keine verbindliche Terminbestätigung. Sobald wir den Termin freigegeben haben, erhalten Sie eine separate Bestätigungs-E-Mail.</p>
    <p>Falls Sie Fragen haben oder den Termin ändern möchten, können Sie uns gerne telefonisch unter +49 (0) 541 123 45 67 kontaktieren.</p>
    <p>Herzliche Grüße,<br>Ihr Team von Skin Einfach Schön</p>
  `;
  return getEmailWrapper('Ihre Terminbuchungsanfrage - Skin Einfach Schön', content);
};

export const getBookingConfirmedTemplate = (
  customerName: string,
  serviceName: string,
  date: string,
  time: string,
  price: string,
  duration: string,
  reason?: string
): string => {
  const content = `
    <h2 class="greeting">Hallo ${customerName},</h2>
    <p>gute Nachrichten! Ihr gewünschter Termin bei <strong>Skin Einfach Schön</strong> wurde erfolgreich von uns <strong>bestätigt</strong>.</p>
    <p>Wir haben die Zeit exklusiv für Sie reserviert und freuen uns darauf, Sie bei uns in der Praxis begrüßen zu dürfen. Hier sind Ihre Termindetails:</p>
    
    ${reason ? `
    <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 8px; padding: 16px; margin: 20px 0; color: #166534; font-size: 14px; font-family: sans-serif; text-align: left;">
      <strong style="color: #14532d; font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Nachricht von uns:</strong>
      ${reason}
    </div>
    ` : ''}

    <table class="details-table" role="presentation">
      <tr>
        <td class="details-label">Behandlung:</td>
        <td class="details-value"><strong>${serviceName}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Datum:</td>
        <td class="details-value"><strong>${date}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Uhrzeit:</td>
        <td class="details-value"><strong>${time}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Preis:</td>
        <td class="details-value">${price}</td>
      </tr>
      <tr>
        <td class="details-label">Dauer:</td>
        <td class="details-value">${duration}</td>
      </tr>
    </table>
    
    <p><strong>Wichtiger Hinweis:</strong> Sollten Sie Ihren Termin nicht wahrnehmen können, sagen Sie diesen bitte mindestens <strong>24 Stunden vorher</strong> absagen, da wir die Behandlung sonst in Rechnung stellen müssen.</p>
    
    <div class="button-container">
      <a href="https://maps.google.com/?q=Lotter+Strasse+33,+49078+Osnabrueck" target="_blank" class="button">Anfahrt auf Google Maps</a>
    </div>
    
    <p style="margin-top: 30px;">Kostenfreie Parkmöglichkeiten stehen Ihnen während der Behandlung direkt auf dem Hof zur Verfügung.</p>
    <p>Herzliche Grüße,<br>Ihr Team von Skin Einfach Schön</p>
  `;
  return getEmailWrapper('Termin bestätigt - Skin Einfach Schön', content);
};

export const getBookingCancelledTemplate = (
  customerName: string,
  serviceName: string,
  date: string,
  time: string,
  reason?: string
): string => {
  const content = `
    <h2 class="greeting">Hallo ${customerName},</h2>
    <p>Ihr Termin für die Behandlung <strong>${serviceName}</strong> am <strong>${date}</strong> um <strong>${time}</strong> wurde <strong>storniert</strong>.</p>
    
    ${reason ? `
    <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 8px; padding: 16px; margin: 20px 0; color: #991b1b; font-size: 14px; font-family: sans-serif; text-align: left;">
      <strong style="color: #7f1d1d; font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Grund für die Stornierung:</strong>
      ${reason}
    </div>
    ` : ''}

    <p>Falls dies ein Versehen war, oder Sie einen neuen Termin vereinbaren möchten, können Sie dies gerne jederzeit online tun.</p>
    
    <div class="button-container">
      <a href="https://skineinfachschoen.de/terminbuchung" class="button">Neuen Termin buchen</a>
    </div>
    
    <p style="margin-top: 30px;">Wir hoffen, Sie bald wieder bei uns begrüßen zu dürfen!</p>
    <p>Herzliche Grüße,<br>Ihr Team von Skin Einfach Schön</p>
  `;
  return getEmailWrapper('Termin storniert - Skin Einfach Schön', content);
};

export const getBookingUpdatedTemplate = (
  customerName: string,
  serviceName: string,
  date: string,
  time: string,
  price: string,
  duration: string,
  oldDate?: string,
  oldTime?: string,
  oldService?: string,
  reason?: string,
  id?: string,
  baseUrl?: string
): string => {
  const changeDetails = (oldDate && oldDate !== date) || (oldTime && oldTime !== time) || (oldService && oldService !== serviceName)
    ? `<p style="font-size: 13px; color: #7496A8; margin-bottom: 20px;"><em>Bisheriger Termin: ${oldService || serviceName} am ${oldDate || date} um ${oldTime || time}</em></p>`
    : '';

  const content = `
    <h2 class="greeting">Hallo ${customerName},</h2>
    <p>Ihr Termin bei <strong>Skin Einfach Schön</strong> wurde erfolgreich <strong>geändert</strong>.</p>
    
    ${reason ? `
    <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 8px; padding: 16px; margin: 20px 0; color: #075985; font-size: 14px; font-family: sans-serif; text-align: left;">
      <strong style="color: #0c4a6e; font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Nachricht von uns:</strong>
      ${reason}
    </div>
    ` : ''}

    <p>Hier sind die neuen Details zu Ihrem Termin:</p>
    
    ${changeDetails}

    <table class="details-table" role="presentation">
      <tr>
        <td class="details-label">Behandlung:</td>
        <td class="details-value"><strong>${serviceName}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Datum:</td>
        <td class="details-value"><strong>${date}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Uhrzeit:</td>
        <td class="details-value"><strong>${time}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Preis:</td>
        <td class="details-value">${price}</td>
      </tr>
      <tr>
        <td class="details-label">Dauer:</td>
        <td class="details-value">${duration}</td>
      </tr>
    </table>
    
    ${id && baseUrl ? `
    <div style="margin: 30px 0; padding: 24px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center; font-family: sans-serif;">
      <h3 style="margin-top: 0; color: #1e293b; font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Bitte bestätigen Sie diesen Ausweichtermin</h3>
      <p style="font-size: 13px; color: #64748b; margin-bottom: 20px; line-height: 1.5; font-family: sans-serif;">Passt Ihnen dieser neue Termin? Bitte teilen Sie uns Ihre Entscheidung per Klick mit:</p>
      
      <div style="margin: 10px 0;">
        <a href="${baseUrl}/termin-antwort?id=${id}&action=accept" style="display: inline-block; background-color: #0284c7; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 13px; font-weight: bold; border-radius: 8px; font-family: 'Montserrat', Helvetica, Arial, sans-serif; margin: 4px; border: 1px solid #0284c7; text-align: center;">Ja, Verschiebung akzeptieren</a>
        <a href="${baseUrl}/termin-antwort?id=${id}&action=decline" style="display: inline-block; background-color: #ffffff; color: #ef4444; padding: 12px 24px; text-decoration: none; font-size: 13px; font-weight: bold; border-radius: 8px; font-family: 'Montserrat', Helvetica, Arial, sans-serif; margin: 4px; border: 1px solid #fecaca; text-align: center;">Nein, ablehnen & neu buchen</a>
      </div>
    </div>
    ` : ''}

    <p><strong>Hinweis:</strong> Auch für den geänderten Termin gilt unsere 24-Stunden-Stornierungsfrist.</p>
    <p>Wir freuen uns auf Sie!</p>
    <p>Herzliche Grüße,<br>Ihr Team von Skin Einfach Schön</p>
  `;
  return getEmailWrapper('Terminänderung - Skin Einfach Schön', content);
};

export const getBookingReminderTemplate = (
  customerName: string,
  serviceName: string,
  date: string,
  time: string
): string => {
  const content = `
    <h2 class="greeting">Hallo ${customerName},</h2>
    <p>dies ist eine freundliche Erinnerung an Ihren bevorstehenden Termin bei <strong>Skin Einfach Schön</strong> morgen.</p>
    <p>Wir haben alles für Sie vorbereitet und freuen uns darauf, Sie zu verwöhnen. Hier noch einmal die Details:</p>
    
    <table class="details-table" role="presentation">
      <tr>
        <td class="details-label">Behandlung:</td>
        <td class="details-value"><strong>${serviceName}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Datum:</td>
        <td class="details-value"><strong>${date}</strong></td>
      </tr>
      <tr>
        <td class="details-label">Uhrzeit:</td>
        <td class="details-value"><strong>${time}</strong></td>
      </tr>
    </table>
    
    <p>Sollten Sie verhindert sein, bitten wir Sie, uns so schnell wie möglich zu informieren.</p>
    
    <div class="button-container">
      <a href="https://maps.google.com/?q=Lotter+Strasse+33,+49078+Osnabrueck" target="_blank" class="button">Anfahrt auf Google Maps</a>
    </div>
    
    <p style="margin-top: 30px;">Kostenfreie Parkmöglichkeiten finden Sie direkt bei uns auf dem Hof.</p>
    <p>Bis morgen!<br>Herzliche Grüße,<br>Ihr Team von Skin Einfach Schön</p>
  `;
  return getEmailWrapper('Terminerinnerung - Skin Einfach Schön', content);
};
