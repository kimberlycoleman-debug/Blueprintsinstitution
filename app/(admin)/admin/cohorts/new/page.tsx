import { redirect } from 'next/navigation'

// /admin/cohorts/new — cohort creation is done inline on the cohorts page.
export default function NewCohortRedirectPage() {
  redirect('/admin/cohorts')
}
