import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile()

  if (!profile) redirect('/login')
  if (profile.role !== 'admin') redirect('/dashboard')

  return (
    <div className="min-h-screen bg-[var(--bp-white)]">
      <AdminNav profile={profile} />
      <main className="bp-container py-8">
        {children}
      </main>
    </div>
  )
}
