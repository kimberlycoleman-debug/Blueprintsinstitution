import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/supabase/server'
import FacilitatorNav from '@/components/facilitator/FacilitatorNav'

export default async function FacilitatorLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile()

  if (!profile) redirect('/login')
  if (profile.role !== 'facilitator' && profile.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[var(--bp-white)]">
      <FacilitatorNav profile={profile} />
      <main className="bp-container py-8">
        {children}
      </main>
    </div>
  )
}
