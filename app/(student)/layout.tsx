import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/supabase/server'
import StudentNav from '@/components/student/StudentNav'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, var(--bp-cream) 0%, var(--bp-white) 220px, var(--bp-white) 100%)' }}>
      <StudentNav profile={profile} />
      <main className="bp-container py-8">
        {children}
      </main>
    </div>
  )
}
