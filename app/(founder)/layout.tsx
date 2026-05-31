import { requireFounder } from '@/lib/founder/protection'
import FounderNav from '@/components/founder/FounderNav'

export default async function FounderLayout({ children }: { children: React.ReactNode }) {
  await requireFounder()

  return (
    <div className="min-h-screen bg-[var(--bp-white)]">
      <FounderNav />
      <main className="bp-container py-8">
        {children}
      </main>
    </div>
  )
}
