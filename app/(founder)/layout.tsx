import { requireFounder } from '@/lib/founder/protection'
import FounderNav from '@/components/founder/FounderNav'

export default async function FounderLayout({ children }: { children: React.ReactNode }) {
  await requireFounder()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, var(--bp-cream) 0%, var(--bp-white) 220px, var(--bp-white) 100%)' }}>
      <FounderNav />
      <main className="bp-container py-8">
        {children}
      </main>
    </div>
  )
}
