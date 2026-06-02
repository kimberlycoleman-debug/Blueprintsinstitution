import { getResendClient, FROM_ADDRESS } from './client'
import {
  applicationReceivedHtml,
  enrollmentConfirmedHtml,
  commissioningGrantedHtml,
} from './templates'

const FOUNDER_NOTIFY_EMAIL = 'kimberly@theblueprintsfoundation.org'

export async function sendApplicationConfirmation(
  to: string,
  name: string
): Promise<void> {
  const resend = getResendClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Your application has been received — B.L.U.E.P.R.I.N.T.S. Institute',
    html: applicationReceivedHtml(name),
  })
}

export async function sendNewApplicationAlert(
  applicantName: string,
  applicantEmail: string,
  applicationNumber: string
): Promise<void> {
  const resend = getResendClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: FOUNDER_NOTIFY_EMAIL,
    subject: `New application received — ${applicantName} (${applicationNumber})`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px;background:#F5F0E8;border-radius:12px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8B7355;font-family:sans-serif;margin:0 0 16px;">B.L.U.E.P.R.I.N.T.S. Institute — New Application</p>
        <h2 style="font-size:24px;font-weight:400;color:#1A120B;margin:0 0 8px;">${applicantName} has applied.</h2>
        <p style="color:#5C4A2A;margin:0 0 24px;">${applicantEmail} &middot; ${applicationNumber}</p>
        <a href="https://blueprintsinstitution.vercel.app/admin/applications"
           style="display:inline-block;background:#5C4A2A;color:#FAFAF8;padding:12px 28px;border-radius:999px;font-family:sans-serif;font-size:14px;font-weight:600;text-decoration:none;">
          Review Application →
        </a>
      </div>
    `,
  })
}

export async function sendEnrollmentConfirmation(
  to: string,
  name: string,
  cohortName: string,
  inviteLink?: string | null
): Promise<void> {
  const resend = getResendClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `You're enrolled in ${cohortName} — B.L.U.E.P.R.I.N.T.S. Institute`,
    html: enrollmentConfirmedHtml(name, cohortName, inviteLink),
  })
}

export async function sendCommissioningCertificate(
  to: string,
  name: string,
  certNumber: string,
  date: string
): Promise<void> {
  const resend = getResendClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `You have been commissioned — ${certNumber}`,
    html: commissioningGrantedHtml(name, certNumber, date),
  })
}
