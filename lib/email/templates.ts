// =====================================================
// BLUEPRINT DISCIPLESHIP INSTITUTE
// Email HTML Templates
// Branded with BP Foundation colours: amber/brown palette
// =====================================================

const BASE = `
  font-family: Georgia, 'Times New Roman', serif;
  max-width: 600px;
  margin: 0 auto;
  background: #FDFAF5;
  color: #1A1208;
`

const HEADER = `
  background: #5C4A2A;
  padding: 32px 40px;
  text-align: center;
`

const BODY = `
  padding: 40px;
`

const FOOTER_STYLE = `
  background: #F5EDD8;
  padding: 24px 40px;
  text-align: center;
  font-size: 12px;
  color: #7A6245;
  font-family: system-ui, sans-serif;
`

function wrap(inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0E8D8;">
  <table style="${BASE}" cellpadding="0" cellspacing="0" width="100%">
    <tr><td style="${HEADER}">
      <div style="font-size:11px;letter-spacing:4px;color:#D4A953;text-transform:uppercase;margin-bottom:8px;">The Blueprint Foundation</div>
      <div style="font-size:22px;color:#FDFAF5;font-weight:600;">B.L.U.E.P.R.I.N.T.S. Discipleship Institute</div>
    </td></tr>
    <tr><td style="${BODY}">${inner}</td></tr>
    <tr><td style="${FOOTER_STYLE}">
      © ${new Date().getFullYear()} The Blueprint Foundation · theblueprintsfoundation.org<br>
      <span style="font-size:10px;">Discipleship OS™ and B.L.U.E.P.R.I.N.T.S.™ are trademarks of The Blueprint Foundation.</span>
    </td></tr>
  </table>
</body>
</html>`
}

// ─── Template 1: Application Received ────────────────────────────────────────

export function applicationReceivedHtml(name: string): string {
  return wrap(`
    <h2 style="color:#5C4A2A;margin-top:0;">Your application has been received, ${name}.</h2>
    <p style="line-height:1.7;color:#3D2E1A;">
      Thank you for taking this step. We have received your application to the
      B.L.U.E.P.R.I.N.T.S. Discipleship Institute and it is currently under review.
    </p>
    <blockquote style="border-left:3px solid #D4A953;margin:24px 0;padding:12px 20px;background:#FFF8EE;color:#5C4A2A;font-style:italic;">
      "For we are God's handiwork, created in Christ Jesus to do good works,
      which God prepared in advance for us to do." — Ephesians 2:10
    </blockquote>
    <p style="line-height:1.7;color:#3D2E1A;">
      Our admissions team will review your application and reach out within 5–7 business days.
      In the meantime, continue to pray and prepare — your transformation journey begins here.
    </p>
    <p style="line-height:1.7;color:#3D2E1A;">In His service,<br><strong>The Blueprint Foundation Admissions Team</strong></p>
  `)
}

// ─── Template 2: Enrollment Confirmed ────────────────────────────────────────

export function enrollmentConfirmedHtml(name: string, cohortName: string): string {
  return wrap(`
    <h2 style="color:#5C4A2A;margin-top:0;">You have been enrolled, ${name}.</h2>
    <p style="line-height:1.7;color:#3D2E1A;">
      Congratulations! Your application has been approved and you have been officially enrolled in:
    </p>
    <div style="background:#5C4A2A;color:#FDFAF5;padding:20px 28px;border-radius:6px;margin:24px 0;text-align:center;">
      <div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#D4A953;margin-bottom:4px;">Your Cohort</div>
      <div style="font-size:22px;font-weight:600;">${cohortName}</div>
    </div>
    <p style="line-height:1.7;color:#3D2E1A;">
      Your account has been activated. Log in to begin your 12-month formation journey —
      discover identity, develop maturity, experience healing, and activate your calling.
    </p>
    <div style="text-align:center;margin:32px 0;">
      <a href="https://theblueprintsfoundation.org/login"
         style="background:#5C4A2A;color:#FDFAF5;padding:14px 36px;text-decoration:none;border-radius:4px;font-weight:600;display:inline-block;">
        Access Your Dashboard
      </a>
    </div>
    <p style="line-height:1.7;color:#3D2E1A;">Welcome to the family,<br><strong>The Blueprint Foundation</strong></p>
  `)
}

// ─── Template 3: Commissioning Granted ───────────────────────────────────────

export function commissioningGrantedHtml(
  name: string,
  certNumber: string,
  date: string
): string {
  return wrap(`
    <h2 style="color:#5C4A2A;margin-top:0;">You have been commissioned, ${name}.</h2>
    <p style="line-height:1.7;color:#3D2E1A;">
      After 12 months of formation, sacrifice, and surrender, you have completed the
      B.L.U.E.P.R.I.N.T.S. Discipleship Institute. It is now our great honour to commission you.
    </p>
    <div style="border:2px solid #D4A953;padding:28px;margin:28px 0;text-align:center;background:#FDFAF5;">
      <div style="font-size:11px;letter-spacing:4px;color:#D4A953;text-transform:uppercase;margin-bottom:4px;">Certificate of Commissioning</div>
      <div style="font-size:24px;font-weight:600;color:#5C4A2A;margin:8px 0;">${name}</div>
      <div style="font-size:13px;color:#7A6245;">Certificate No. ${certNumber} · ${date}</div>
    </div>
    <blockquote style="border-left:3px solid #D4A953;margin:24px 0;padding:12px 20px;background:#FFF8EE;color:#5C4A2A;font-style:italic;">
      "Therefore go and make disciples of all nations." — Matthew 28:19
    </blockquote>
    <p style="line-height:1.7;color:#3D2E1A;">
      Log in to view and print your official commissioning certificate.
    </p>
    <div style="text-align:center;margin:32px 0;">
      <a href="https://theblueprintsfoundation.org/commissions/certificate"
         style="background:#5C4A2A;color:#FDFAF5;padding:14px 36px;text-decoration:none;border-radius:4px;font-weight:600;display:inline-block;">
        View Your Certificate
      </a>
    </div>
    <p style="line-height:1.7;color:#3D2E1A;">Go and make disciples,<br><strong>The Blueprint Foundation</strong></p>
  `)
}
