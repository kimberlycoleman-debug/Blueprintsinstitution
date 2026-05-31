import { getResendClient, FROM_ADDRESS } from './client'
import {
  applicationReceivedHtml,
  enrollmentConfirmedHtml,
  commissioningGrantedHtml,
} from './templates'

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

export async function sendEnrollmentConfirmation(
  to: string,
  name: string,
  cohortName: string
): Promise<void> {
  const resend = getResendClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `You're enrolled in ${cohortName} — B.L.U.E.P.R.I.N.T.S. Institute`,
    html: enrollmentConfirmedHtml(name, cohortName),
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
