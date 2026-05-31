import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — The Blueprint Foundation',
}

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the B.L.U.E.P.R.I.N.T.S. Discipleship Institute platform ("the Platform") operated by The Blueprint Foundation ("we," "our," "us"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.`,
  },
  {
    title: '2. Eligibility and Enrollment',
    content: `Access to the Institute is by invitation only following an application and review process. Enrollment grants you a non-transferable, limited license to access the Platform and curriculum for personal, non-commercial discipleship purposes. You must be at least 18 years of age to enroll. By submitting an application, you represent that the information you provide is truthful and accurate.`,
  },
  {
    title: '3. Code of Conduct',
    content: `As a student of the B.L.U.E.P.R.I.N.T.S. Institute, you agree to:

• Engage with honesty, humility, and respect for all community members.
• Keep cohort discussions and peer reflections confidential.
• Not share your account credentials with any other person.
• Not use the Platform to harass, harm, or defraud others.
• Not attempt to reverse-engineer, scrape, or otherwise misuse the Platform.

Violations of the Code of Conduct may result in suspension or permanent removal from the Institute without refund.`,
  },
  {
    title: '4. Curriculum and Intellectual Property',
    content: `All curriculum content, lesson materials, AI prompts, and Platform design are the intellectual property of The Blueprint Foundation. "Discipleship OS™," "B.L.U.E.P.R.I.N.T.S.™," "R.E.S.T.O.R.E.™," and "K.I.N.D.™" are trademarks of The Blueprint Foundation. You may not reproduce, distribute, or create derivative works from any Platform content without express written permission.

Your personal submissions — Identity Blueprints, Purpose Statements, Ministry Plans, and reflections — remain your intellectual property. By submitting them to the Platform, you grant The Blueprint Foundation a limited license to display them to your facilitator and administrators for program support.`,
  },
  {
    title: '5. AI Companion',
    content: `The Platform includes an AI Reflection Companion powered by OpenAI. This tool is provided as a spiritual formation aid and does not constitute professional counseling, therapy, or spiritual direction. The AI companion may occasionally produce inaccurate or incomplete responses. Always apply discernment and consult qualified human mentors for significant life decisions.`,
  },
  {
    title: '6. Commissioning and Certificates',
    content: `Commissioning is granted at the discretion of the Institute administration upon satisfactory completion of all program requirements, including attendance, capstone submissions, and facilitator evaluation. A commissioning certificate carries no academic credit, professional licensure, or ordination unless separately established by a partnering institution.`,
  },
  {
    title: '7. Fees and Payments',
    content: `Program fees, if applicable, are disclosed at the time of enrollment confirmation. Scholarship and grant-funded seats are subject to the terms communicated at enrollment. Refund policies are disclosed separately at enrollment. The Blueprint Foundation reserves the right to adjust fees for future cohorts.`,
  },
  {
    title: '8. Disclaimers',
    content: `The Platform is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the Platform will be uninterrupted, error-free, or free from harmful components. To the fullest extent permitted by law, The Blueprint Foundation disclaims all warranties related to the Platform and its content.`,
  },
  {
    title: '9. Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, The Blueprint Foundation shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform, even if advised of the possibility of such damages. Our total liability to you for any claim arising from these Terms shall not exceed the total fees you have paid to us in the twelve months preceding the claim.`,
  },
  {
    title: '10. Governing Law',
    content: `These Terms are governed by the laws of the United States without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive relief in a court of competent jurisdiction.`,
  },
  {
    title: '11. Changes to Terms',
    content: `We may update these Terms from time to time. We will notify enrolled students of material changes via email. Your continued use of the Platform after changes become effective constitutes your acceptance of the revised Terms.`,
  },
  {
    title: '12. Contact',
    content: `Questions about these Terms may be directed to:

The Blueprint Foundation
Email: legal@theblueprintsfoundation.org
Website: theblueprintsfoundation.org`,
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF5EF]">
      <header className="bg-[#5C4A2A] py-10 px-6 text-center">
        <div className="text-xs tracking-widest text-amber-300 uppercase font-semibold mb-2">
          The Blueprint Foundation
        </div>
        <h1 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Georgia, serif' }}>
          Terms of Service
        </h1>
        <p className="text-amber-200 text-sm mt-2">Last updated: May 2026</p>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-[#4A3820] leading-relaxed mb-8">
          Please read these Terms of Service carefully before using the
          B.L.U.E.P.R.I.N.T.S. Discipleship Institute platform. These terms
          constitute a binding agreement between you and The Blueprint Foundation.
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
          <div className="mb-4">© {new Date().getFullYear()} The Blueprint Foundation</div>
          <div className="flex gap-4 justify-center">
            <Link href="/privacy" className="text-[#5C4A2A] hover:underline">Privacy Policy</Link>
            <Link href="/" className="text-[#5C4A2A] hover:underline">Home</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
