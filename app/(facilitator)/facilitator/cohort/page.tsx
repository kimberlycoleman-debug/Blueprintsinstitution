import { redirect } from 'next/navigation'

// /facilitator/cohort has no index — the dashboard shows all cohorts.
// Redirect to facilitator dashboard.
export default function FacilitatorCohortIndexPage() {
  redirect('/facilitator')
}
