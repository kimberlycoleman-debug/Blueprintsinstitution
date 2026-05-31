import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — The B.L.U.E.P.R.I.N.T.S. Foundation',
}

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `When you apply to or participate in the B.L.U.E.P.R.I.N.T.S. Discipleship Institute, we collect information you voluntarily provide, including:

• Personal identifiers: full name, email address, phone number, city, and state.
• Spiritual and personal background: church affiliation, discipleship history, spiritual gifts, and application responses.
• Formation data: lesson progress, reflection submissions, attendance records, capstone documents (Identity Blueprint, Purpose Statement, Ministry Plan), and assessment results.
• AI Companion interactions: conversation content submitted to our AI reflection companion.
• Account information: authentication credentials managed securely through Supabase Auth.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Process and evaluate your application for the Institute.
• Enroll you in a cohort and deliver the discipleship curriculum.
• Track your formation progress and provide facilitator support.
• Generate your Transformation Index and commissioning certificate.
• Send transactional emails (application confirmation, enrollment, commissioning).
• Improve the platform, curriculum, and student experience.
• Comply with applicable laws and protect the safety of our community.

We do not sell, rent, or trade your personal information to third parties.`,
  },
  {
    title: '3. AI Companion Data',
    content: `Our AI Reflection Companion is powered by OpenAI. When you submit reflections or interact with the AI companion, your text is transmitted to OpenAI's API for processing. OpenAI's use of this data is governed by their privacy policy at openai.com/privacy. We do not use your reflection data to train AI models. Reflection content is stored in your student record and accessible only to you, your cohort facilitator, and authorized administrators.`,
  },
  {
    title: '4. Data Sharing',
    content: `We share your information only in the following circumstances:

• Service providers: We use Supabase (database and authentication), OpenAI (AI companion), Vercel (hosting), and Resend (transactional email). Each provider processes data under their respective data processing agreements.
• Cohort facilitators: Your facilitator has access to your progress, attendance, and capstone submissions to support your formation journey.
• Administrators: Institute administrators access aggregate and individual data for program oversight and grant reporting.
• Legal requirements: We may disclose information when required by law or to protect the rights, property, or safety of our organization, students, or the public.`,
  },
  {
    title: '5. Data Retention',
    content: `We retain your data for as long as your account is active and for a reasonable period thereafter for record-keeping and alumni support. Commissioning records and certificates are retained permanently as part of the Institute's historical record. You may request deletion of your personal data at any time by contacting us (see Section 8). Certain information may be retained to comply with legal obligations or for legitimate business purposes.`,
  },
  {
    title: '6. Security',
    content: `We implement industry-standard security measures including encrypted connections (TLS), row-level security on all database tables, and role-based access controls. Authentication is managed by Supabase Auth with secure session handling. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '7. Your Rights',
    content: `You have the right to:

• Access the personal information we hold about you.
• Correct inaccurate or incomplete information.
• Request deletion of your personal data.
• Object to or restrict certain processing of your data.
• Receive a copy of your data in a portable format.

To exercise these rights, contact us using the information in Section 8.`,
  },
  {
    title: '8. Contact Us',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:

The B.L.U.E.P.R.I.N.T.S. Foundation
Email: privacy@theblueprintsfoundation.org
Website: theblueprintsfoundation.org`,
  },
  {
    title: '9. Updates to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify active users of material changes via email. The date of the most recent revision appears below. Continued use of the Institute platform after changes constitutes acceptance of the updated policy.`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAF5EF]">
      <header className="bg-[#5C4A2A] py-10 px-6 text-center">
        <div className="text-xs tracking-widest text-amber-300 uppercase font-semibold mb-2">
          The B.L.U.E.P.R.I.N.T.S. Foundation
        </div>
        <h1 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Georgia, serif' }}>
          Privacy Policy
        </h1>
        <p className="text-amber-200 text-sm mt-2">Last updated: May 2026</p>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-[#4A3820] leading-relaxed mb-8">
          The B.L.U.E.P.R.I.N.T.S. Foundation (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting
          your privacy. This Privacy Policy explains how we collect, use, and safeguard your
          information when you use the B.L.U.E.P.R.I.N.T.S. Discipleship Institute platform.
        </p>

        <div className="space-y-8">
          {SECTIONS.map(section => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-[#5C4A2A] mb-3">
                {section.title}
              </h2>
              <div className="text-[#4A3820] leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-amber-200 text-center text-sm text-[#7A6245]">
          <div className="mb-4">© {new Date().getFullYear()} The B.L.U.E.P.R.I.N.T.S. Foundation</div>
          <div className="flex gap-4 justify-center">
            <Link href="/terms" className="text-[#5C4A2A] hover:underline">Terms of Service</Link>
            <Link href="/" className="text-[#5C4A2A] hover:underline">Home</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
