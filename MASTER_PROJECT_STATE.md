# 🔱 MASTER PROJECT STATE
## The B.L.U.E.P.R.I.N.T.S. Discipleship Institute

> **THIS IS THE SINGLE SOURCE OF TRUTH FOR THE ENTIRE PROJECT.**
>
> If context is ever lost — a new chat, a different AI tool, a compacted conversation, a new developer, a future version of Claude — **START HERE.** This document tells you everything: what exists, what's built, what's next, and where every piece lives.
>
> **Update this document at the end of every work session.** It is the project's memory. As long as this file survives, nothing is ever lost.
>
> **⚠️ UPDATED — May 31, 2026 (Session 8).** Phase 9 PWA / Mobile Readiness COMPLETE. See SESSION LOG.

---

## ⚡ QUICK ORIENTATION (read this first)

**What this is:** A 12-month discipleship formation institute. Free for every believer. Funded by grants + institutional partners. The first formation institute to *measure* spiritual transformation.

**Tech stack:** Next.js 14/15 (App Router) + TypeScript + Supabase (Postgres/Auth/Storage) + OpenAI + Tailwind CSS.

**The mission:** Matthew 28:19-20. Every believer carries a God-designed blueprint. This institute unlocks it.

**Where the project lives:**
- Working/build folder: `C:\Users\kim22\OneDrive\Desktop\BPINSTITUTION\blueprint-discipleship-institute`
- Supabase project ref: `yhpemsoojtgjvjmmzxut`
- This is a STANDALONE system — completely independent of any external platform.

**Who the founder is:** Kimberly Coleman — Founding Architect. Email: `kimberly@theblueprintsfoundation.org`.

---

## 📁 EVERY DOCUMENT IN THIS PROJECT (and what each is for)

### Strategic / Canonical Documents
| File | Purpose | Status |
|------|---------|--------|
| `MASTER_PROJECT_STATE.md` | **THIS FILE** — single source of truth, update every session | Living |
| `POSITIONING_DOCUMENT.md` | Brand canon — 4 locks, trademark, voice, audiences | Locked v1.0 |
| `LAUNCH_MARKETING_PLAN.md` | 6-month launch roadmap to Cohort 1 | Locked v1.0 |
| `NEED_RESEARCH_BRIEF.md` | The data proving the need — opens every grant proposal | Locked v1.0 |
| `ANALYTICS_ARCHITECTURE.md` | The measurement system — founding distinctive operationalized | Locked v1.0 |
| `BUILD_SEQUENCE.md` | The 10-phase build order, nothing skipped | Living |
| `LINKEDIN_PROFILE.md` | Founder LinkedIn profile copy — funder & pastor facing, locked to verified facts | Locked v1.0 |
| `README.md` | Project overview | Stable |
| `SETUP.md` | Deployment + setup instructions | Stable |

### The Demo
| File | Purpose |
|------|---------|
| `blueprint-discipleship-institute-demo.html` | Interactive 6-surface demo (public, student, lesson, reflection, facilitator, founder) — web + mobile |

---

## 🗄️ DATABASE — COMPLETE MIGRATION LIST

All migrations live in `supabase/migrations/`. All 20 applied to remote Supabase (`yhpemsoojtgjvjmmzxut`) via `supabase db push`.

### ✅ APPLIED — Schema (001–011)

| # | File | What it creates |
|---|------|-----------------|
| 001 | `001_foundation.sql` | Enums (`curriculum_track`, `discussion_group_type`, `workbook_element_type`), helper fns, three-tier schema (quarters → modules → lessons) |
| 002 | `002_users.sql` | Profiles tied to auth, role helpers (student/facilitator/admin) |
| 003 | `003_lesson_objectives_scriptures.sql` | `lesson_objectives`, `lesson_scriptures` |
| 004 | `004_teacher_scripts.sql` | `lesson_script_sections`, `lesson_script_moments` (SAY/ASK/PRAY) |
| 005 | `005_activation_discussion_workbook.sql` | `lesson_activations`, `activation_steps`, `lesson_discussions`, `lesson_workbook_elements` |
| 006 | `006_assessment_tips_resources.sql` | `lesson_assessment_indicators`, `lesson_facilitator_tips`, `lesson_resistance_handlers`, `lesson_resources`, `lesson_previews` |
| 007 | `007_cohorts_attendance_progress.sql` | `cohorts`, `cohort_students`, `cohort_facilitators`, `weekly_flow`, `attendance`, `progress` (dual scoring) |
| 008 | `008_applications_reflections_capstones.sql` | `applications`, `reflections`, `identity_blueprints`, `purpose_statements`, `ministry_plans`, `commissions` |
| 009 | `009_cohort_feed_ai_conversations.sql` | `cohort_posts`, `cohort_post_responses`, `ai_conversations`, `ai_messages` |
| 010 | `010_rls_policies.sql` | Full RLS for all tables, three-role access, force RLS |
| 011 | `011_seed_curriculum.sql` | Initial structural seed — superseded by migration 012 which sets the final 5 quarters / 13 modules |

### ✅ APPLIED — Curriculum Content (012–020)

| # | File | What it populates |
|---|------|-----------------|
| 012 | `012_curriculum_quarters_modules.sql` | 5 quarters (Q1–Q4 + Advanced), 13 modules |
| 013 | `013_curriculum_q1_q2_lessons.sql` | L001–L024 lesson rows |
| 014 | `014_curriculum_q3_q4_adv_lessons.sql` | L025–L052 lesson rows |
| 015 | `015_curriculum_objectives.sql` | 260 learning objectives (5 per lesson × 52) |
| 016 | `016_curriculum_scriptures_q1_q2.sql` | 72 scriptures for L001–L024 |
| 017 | `017_curriculum_scriptures_q3_q4_adv.sql` | 84 scriptures for L025–L052 |
| 018 | `018_curriculum_activations.sql` | 52 activations with 3–4 steps each |
| 019 | `019_curriculum_discussions_workbook.sql` | 3–4 discussion questions + 3 workbook elements per lesson |
| 020 | `020_rename_curriculum_track_enum.sql` | Renamed enum values: `solavian_core` → `blueprint_core`, `solavian_advanced` → `blueprint_advanced` |

### ✅ APPLIED — Founder Sovereign Tier + Analytics (021–023)

| # | File | What it creates |
|---|------|-----------------|
| 021 | `021_founder_sovereign_tier.sql` | `founder_registry` (seeded: Kimberly Coleman), `founder_vault` (10 categories), `founder_audit_log` (immutable), `founder_notes`, `is_founder()`, `log_founder_action()`, full RLS + force RLS |
| 022 | `022_analytics_foundation.sql` | `engagement_events` (17 types), `assessments` (5 dimensions × 6 checkpoints × self/facilitator), `reflection_analysis`, `transformation_index`, `compute_transformation_index()` function — **THE FOUNDING DISTINCTIVE IS NOW LIVE** |
| 023 | `023_analytics_rollups.sql` | `cohort_analytics`, `institutional_metrics`, `outcome_followups` (6/12/24mo), `funding_records`, `compute_cohort_analytics()`, `compute_institute_metrics()`, `detect_at_risk_students()` |



**Key database concepts:**
- **Three roles:** student, facilitator, admin (enum in `profiles`). Founder is SEPARATE — email-locked in `founder_registry` (migration 021, applied ✅).
- **Curriculum:** 52 lessons across 5 quarters (Q1 Alpha/Identity, Q2 Formation/Maturity, Q3 Maturity/Healing, Q4 Ministry/Activation, Advanced). Fully populated.
- **Dual scoring:** numeric (0-100) + qualitative (not_demonstrated/emerging/demonstrated/embodied) — maps to Depth Levels (Foundation→Discernment→Practice→Embodiment).
- **Transformation Index (LIVE ✅):** The flagship metric and founding distinctive. Triangulated from 3 sources: self-assessments, facilitator assessments, reflection_analysis (AI depth scoring). Four 25% sub-scores: identity, healing, calling, maturity. Six checkpoints. Computed by `compute_transformation_index()` in DB.
- **Force RLS** on all sensitive tables — even superuser obeys row-level security.

**Live table count (updated May 31, 2026, Session 2):** 41 tables in `public` schema (33 original + 8 from migrations 021–023).

---

## 💻 CODE — WHAT'S BUILT (verified May 31, 2026)

### Core infrastructure
| Path | Purpose |
|------|---------|
| `package.json` | Next.js 14, Supabase SSR, OpenAI, Tailwind |
| `tailwind.config.ts` | Blueprint brand tokens |
| `middleware.ts` | Route protection (auth-gated student/facilitator/admin routes) |
| `app/globals.css` | Full Blueprint brand CSS system |
| `app/layout.tsx` | Root layout |
| `app/page.tsx` | Public homepage |

### Supabase clients
| Path | Purpose |
|------|---------|
| `lib/supabase/browser.ts` | Client-side Supabase |
| `lib/supabase/server.ts` | Server-side Supabase + getCurrentUser/Profile |
| `lib/supabase/admin.ts` | Service-role admin client |

### AI
| Path | Purpose |
|------|---------|
| `lib/ai/client.ts` | OpenAI setup — `DEFAULT_MODEL` (gpt-4o-mini), `PREMIUM_MODEL` (gpt-4o) |
| `lib/ai/prompts.ts` | Formation-grade system prompts: `REFLECTION_COMPANION_PROMPT`, `IDENTITY_BLUEPRINT_PROMPT`, `PURPOSE_STATEMENT_PROMPT`, `MINISTRY_PLAN_PROMPT`, `REFLECTION_ANALYSIS_PROMPT`, `FACILITATOR_INSIGHTS_PROMPT`, `ADMIN_INTELLIGENCE_PROMPT` |

### Founder Sovereign Tier (Phase 6 — COMPLETE ✅)
| Path | Purpose |
|------|---------|
| `lib/founder/protection.ts` | `isFounder()`, `requireFounder()` guard, `logFounderAction()`, `getVaultItems()`, `createVaultItem()`, `getFounderProfile()` |
| `app/(founder)/layout.tsx` | Sovereign guard (`requireFounder()`) — email-locked, not role-based + FounderNav |
| `components/founder/FounderNav.tsx` | 5-link nav (Command Center, Vault, Analytics, Funding, Audit Log) — gold-on-dark, "Sovereign" badge |
| `app/(founder)/founder/page.tsx` | Command Center — institute vitals (8 metrics), Transformation Index panel, sovereign actions, recent audit feed |
| `app/(founder)/founder/vault/page.tsx` | Vault browser — 10 category tabs, split-pane list + detail, create/edit form with visibility, tags, content, external_url |
| `app/(founder)/founder/analytics/page.tsx` | Analytics — institute metrics (compute_institute_metrics()), active cohort health table, completed cohort outcome record |
| `app/(founder)/founder/audit/page.tsx` | Immutable audit log — paginated 50/page, action filter, expandable JSON detail panel |
| `app/(founder)/founder/funding/page.tsx` | Funding records — grants/donors/partners, amount tracking, free-seat counting, reporting deadline alerts |
| `app/api/founder/vault/route.ts` | GET (category filter); POST create; PATCH update; DELETE soft-archive (all behind `isFounder()`) |
| `app/api/founder/metrics/route.ts` | GET — triggers `compute_institute_metrics()` RPC, returns latest snapshot + all cohort analytics |
| `app/api/founder/audit/route.ts` | GET — paginated audit log, action filter, read-only |
| `app/api/founder/funding/route.ts` | GET (status/type filter); POST create; PATCH update funding records |

### Analytics + Tracking (Phase 2 — complete)
| Path | Purpose |
|------|---------|
| `lib/analytics/track.ts` | `track()` (client), `trackServer()` (server), `startTimer()` — 17 event types |
| `components/analytics/TrackPageView.tsx` | Drop-in page-view tracker with mount/unmount duration measurement |

### Auth flow (Phase 1 — complete)
| Path | Purpose |
|------|---------|
| `app/(auth)/login/page.tsx` | Login |
| `app/(auth)/signup/page.tsx` | Sign up |
| `app/(auth)/signup/confirm/page.tsx` | Email confirm |
| `app/(auth)/auth/forgot-password/page.tsx` | Forgot password |
| `app/(auth)/auth/reset-password/page.tsx` | Reset password |
| `app/(auth)/auth/callback/route.ts` | Auth callback |

### Application
| Path | Purpose |
|------|---------|
| `app/application/page.tsx` | Public application form |
| `app/api/application/route.ts` | Application submission API |

### Student Experience (Phase 2 — complete ✅ + Phase 3 — complete ✅)
| Path | Purpose |
|------|---------|
| `app/(student)/layout.tsx` | Auth guard + StudentNav wrapper |
| `app/(student)/dashboard/page.tsx` | Dashboard — progress bar, BLUEPRINTS tiles, capstone cards, cohort card, quarter overview |
| `app/(student)/lessons/page.tsx` | Lessons list |
| `app/(student)/lessons/[lesson_id]/page.tsx` | Full lesson viewer (all curriculum sections) + `TrackPageView` |
| `app/(student)/reflections/page.tsx` | Reflection journal — AI companion response displayed + `TrackPageView` |
| `app/(student)/cohort/page.tsx` | Cohort space — posts, prayer requests, celebrations + `TrackPageView` |
| `app/(student)/identity-blueprint/page.tsx` | **Q1 Capstone** — Identity Blueprint Statement™ builder (8 sections + lies/truths + AI companion on each section) |
| `app/(student)/purpose-statement/page.tsx` | **Q4 Capstone** — Purpose Statement™ builder (7 sections + AI companion, pulls Identity Blueprint as context) |
| `app/(student)/ministry-plan/page.tsx` | **Q4 Capstone** — Ministry Launch Plan™ builder (vision + goals lists + timeline + AI companion, pulls Purpose Statement as context) |
| `app/api/progress/route.ts` | Lesson progress API |
| `app/api/reflections/route.ts` | Reflections API — AI companion response + `after()` → `reflection_analysis` pipeline (non-blocking) |
| `app/api/cohort/posts/route.ts` | Cohort posts API |
| `app/api/capstone/identity-blueprint/route.ts` | Identity Blueprint GET + POST (upsert + AI draft) |
| `app/api/capstone/purpose-statement/route.ts` | Purpose Statement GET + POST (upsert + AI draft, identity context) |
| `app/api/capstone/ministry-plan/route.ts` | Ministry Plan GET + POST (upsert + AI draft, purpose context) |
| `components/student/LessonCompleteButton.tsx` | Mark-complete button |
| `components/student/StudentNav.tsx` | Student navigation |

### Facilitator Experience (Phase 4 — complete ✅)
| Path | Purpose |
|------|---------|
| `app/(facilitator)/layout.tsx` | Role guard (facilitator \| admin) + FacilitatorNav wrapper |
| `app/(facilitator)/facilitator/page.tsx` | Dashboard — assigned cohorts, enrollment counts, next session, quick links |
| `app/(facilitator)/facilitator/cohort/[cohort_id]/page.tsx` | Cohort health — at-risk tab (signal badges) + full roster tab (progress bars) |
| `app/(facilitator)/facilitator/student/[student_id]/page.tsx` | Student detail — per-checkpoint/per-dimension assessment entry |
| `app/(facilitator)/facilitator/attendance/page.tsx` | Attendance capture — session selector, bulk mark, all-present shortcut |
| `components/facilitator/FacilitatorNav.tsx` | Facilitator nav — 4 links, role badge, initials avatar, sign out |
| `app/api/facilitator/cohorts/route.ts` | GET all cohorts assigned to facilitator |
| `app/api/facilitator/cohort/[cohort_id]/students/route.ts` | GET roster with progress % + reflection count |
| `app/api/facilitator/cohort/[cohort_id]/sessions/route.ts` | GET weekly_flow sessions for attendance selector |
| `app/api/facilitator/cohort/[cohort_id]/at-risk/route.ts` | GET calls `detect_at_risk_students()` RPC |
| `app/api/facilitator/attendance/route.ts` | GET session attendance; POST bulk upsert |
| `app/api/facilitator/assessments/route.ts` | GET student assessments; POST upsert single score |

### Admin Experience (Phase 5 — complete ✅)
| Path | Purpose |
|------|---------|
| `app/(admin)/layout.tsx` | Role guard (admin only) + AdminNav wrapper |
| `app/(admin)/admin/page.tsx` | Dashboard — 4 live stats, pending applications preview, quick actions |
| `app/(admin)/admin/applications/page.tsx` | Application review — status filter tabs, split-pane detail + actions panel, inline notes + interview date + cohort assignment |
| `app/(admin)/admin/cohorts/page.tsx` | Cohort management — list with enrollment bars, create new cohort form with facilitator assignment, inline status edit |
| `app/(admin)/admin/users/page.tsx` | User management — searchable table, inline role change dropdown, active/inactive toggle |
| `components/admin/AdminNav.tsx` | Admin nav — 4 links, role badge, initials avatar, sign out |
| `app/api/admin/applications/route.ts` | GET paginated applications; PATCH status/notes/cohort/interview date |
| `app/api/admin/cohorts/route.ts` | GET all cohorts with enrollment; POST create; PATCH status/name |
| `app/api/admin/cohorts/enroll/route.ts` | POST enroll student (capacity check); GET facilitators list |
| `app/api/admin/users/route.ts` | GET users with search/filter; PATCH role/is_active |

### Commissioning + Certificates (Phase 7 — COMPLETE ✅)
| Path | Purpose |
|------|---------|
| `app/(student)/commissions/page.tsx` | Student commissioning page — eligibility checklist, commissioning date/declaration/blessing/prophetic words |
| `app/(student)/commissions/certificate/page.tsx` | Printable commissioning certificate — branded A4/Letter layout, `window.print()`, includes calling declaration + Ephesians 2:10 |
| `app/(admin)/admin/commissions/page.tsx` | Admin commissioning management — tabs (Commissioned / Not Yet Commissioned), commission creation form, eligibility summary, issue certificate button, prophetic words, covenant toggle |
| `app/api/commissions/route.ts` | GET — student's own commission record + live eligibility check (capstones, attendance, lesson count) + `studentName` |
| `app/api/admin/commissions/route.ts` | GET all commissions + uncommissioned students; POST create commission (auto-computes eligibility, generates cert number); PATCH update/issue |

### Analytics Dashboards (Phase 8 — COMPLETE ✅)
| Path | Purpose |
|------|---------|
| `app/(student)/analytics/page.tsx` | Student formation journey — TI over checkpoints, dimension scores, reflection depth trend, engagement activity |
| `app/(facilitator)/facilitator/analytics/page.tsx` | Facilitator cohort analytics — TI gain, engagement rates, student comparison table, at-risk students |
| `app/(admin)/admin/analytics/page.tsx` | Admin/funder accountability — institute vitals, formation outcomes, funding summary, cohort outcomes |
| `app/api/analytics/student/route.ts` | GET student's TI records, reflection analysis trend, engagement summary, capstone/progress status |
| `app/api/analytics/facilitator/route.ts` | GET cohort analytics snapshots, student TI table, at-risk students |
| `app/api/analytics/admin/route.ts` | GET institutional_metrics (triggers compute), funding records + summary, cohort outcomes |

### PWA / Mobile Readiness (Phase 9 — COMPLETE ✅)
| Path | Purpose |
|------|---------|
| `public/manifest.json` | Web app manifest — name, short_name, icons, display: standalone, shortcuts (Lessons, Reflect, Cohort), theme_color |
| `public/sw.js` | Service worker — cache-first for static assets, network-first for navigation, never caches API/auth routes, background sync stub |
| `app/offline/page.tsx` | Offline fallback page — branded, Ephesians 2:10 anchor, try-again button |
| `app/layout.tsx` | Updated — manifest link, apple-touch-icon, mobile-web-app-capable, SW registration script, `<InstallPrompt>` |
| `components/shared/InstallPrompt.tsx` | PWA install banner — listens for `beforeinstallprompt`, shows after 3s, dismisses to session storage, gold-on-dark design |

### Phase 10 — Launch Prep (COMPLETE ✅)
| Path | Purpose |
|------|------|
| `app/(student)/onboarding/page.tsx` | Student onboarding welcome flow — first-login orientation, cohort intro, quick-start checklist |
| `app/privacy/page.tsx` | Privacy Policy — branded, full legal terms, Ephesians anchor |
| `app/terms/page.tsx` | Terms of Service — branded, full legal terms |

### ⏳ NOT YET BUILT — Code
| What | Notes |
|------|------|
| Email API routes | `resend` package installed + `RESEND_API_KEY` in Vercel; no `/api/email` routes built yet. Needed: welcome email on signup, cohort assignment notice, commissioning congratulations |

---

## ✅ WHAT'S DONE vs ⏳ WHAT'S NEXT

### DONE ✅
- ✅ 23 migrations applied — schema (001–011) + curriculum (012–020) + founder+analytics (021–023)
- ✅ 41 tables live in Supabase
- ✅ Brand system (warm neutrals, Inter + Cormorant Garamond)
- ✅ Full AI prompt library (7 prompts including REFLECTION_ANALYSIS_PROMPT)
- ✅ Public homepage + auth flow (login, signup, forgot/reset password, callback)
- ✅ Phase 1: Application form + API
- ✅ Phase 2: Complete student experience — dashboard, lessons, reflections (with AI companion + reflection_analysis pipeline), cohort space, progress tracking
- ✅ Phase 2 analytics: engagement tracking, `TrackPageView` wired into lesson viewer + reflections + cohort pages
- ✅ Phase 3: All 3 capstone builders — Identity Blueprint Statement™ (Q1), Purpose Statement™ (Q4), Ministry Launch Plan™ (Q4)
- ✅ Founder Sovereign Tier DB: `founder_registry` seeded (Kimberly Coleman), vault, audit log (immutable), `is_founder()`, `log_founder_action()`
- ✅ `lib/founder/protection.ts` server utilities
- ✅ Transformation Index: `compute_transformation_index()` function live in DB
- ✅ `detect_at_risk_students()` function live in DB
- ✅ Five canonical strategy documents saved to project root
- ✅ `vercel.json` — framework: nextjs (fixes Vercel output directory error)
- ✅ Phase 4: Complete facilitator dashboard — layout, nav, dashboard page, cohort health page, student detail + assessment entry page, attendance capture page, 6 API routes
- ✅ Phase 5: Complete admin dashboard — layout, nav, dashboard, applications review, cohort management (create/assign/status), user management (role/active), 4 API routes
- ✅ Phase 6: Complete founder sovereign dashboard — Command Center, Vault browser, Analytics (compute_institute_metrics()), Audit Log, Funding Records, 4 API routes
- ✅ Phase 7: Commissioning + Certificates — student commissioning page (eligibility + declarations), printable certificate, admin commissioning management, 2 API routes
- ✅ Phase 8: Analytics Dashboards — student formation journey, facilitator cohort analytics, admin/funder accountability reporting, 3 API routes
- ✅ Phase 9: PWA / Mobile Readiness — manifest, service worker, offline page, install prompt, layout PWA meta

### NEXT (in build priority order)
- ✅ **Phase 4:** Facilitator dashboard — COMPLETE
- ✅ **Phase 5:** Admin dashboard — COMPLETE
- ✅ **Phase 6:** Founder Sovereign Dashboard — COMPLETE (Command Center, Vault, Analytics, Audit Log, Funding + 4 API routes)
- ✅ **Phase 7:** Commissioning + Certificates — COMPLETE (student page, printable cert, admin management, 2 API routes)
- ✅ **Phase 8:** Analytics Dashboards — COMPLETE (student formation journey, facilitator cohort analytics, admin/funder accountability, 3 API routes)
- ✅ **Phase 9:** PWA / Mobile Readiness — COMPLETE (manifest, service worker, offline page, install prompt)
- ✅ **Phase 10:** Launch prep — onboarding flow, legal/privacy pages (complete). Email API routes (Resend installed, routes pending)
- ✅ **Phase 11:** Full design system alignment — Cormorant Garamond + gold bp tokens across all 44 app screens; replaced all amber-* tokens; overline label classes; all 4 nav bars upgraded; landing page editorial redesign
- ⏳ **Phase 12 (NEXT):** Email API routes (welcome, cohort assignment, commissioning); Supabase Storage buckets (vault-documents, certificates, avatars); nightly analytics cron; Stripe for institutional seat enrollment; create first real cohort

---

## 🔐 LOCKED DECISIONS (do not revisit without founder approval)

1. **Trademark:** Always `The B.L.U.E.P.R.I.N.T.S. Foundation` and `The B.L.U.E.P.R.I.N.T.S. Discipleship Institute` — periods between every letter, every public usage.
2. **Audience:** Every believer — individuals AND institutions. No prerequisites beyond faith in Jesus.
3. **Economic model:** Free for individuals. Funded by grants + major donors + institutional partners. Institutions pay so individuals don't have to.
4. **Category:** Identity Blueprint Formation™ — the new category created.
5. **Founding distinctive:** First formation institute in the world to MEASURE spiritual transformation.
6. **Transformation Promise:** "You are becoming who you were always meant to be."
7. **Three roles + founder:** student, facilitator, admin (enum roles) + founder (email-locked sovereign tier).
8. **Hybrid delivery:** Some lessons live, some in-app.
9. **Standalone database:** Completely separate. Never connected to any external platform.
10. **Stack:** Next.js 15 web-first with AI, PWA for mobile (not native React Native for v1).
11. **Brand:** Warm neutrals (#FAFAF8, #F5F0E8, #8B7355, #7C9A7E), Inter + Cormorant Garamond, 16px rounded cards.
12. **Curriculum (verified, locked):** 52 lessons total = 48 core (4 quarters, Q1–Q4) + 4 advanced. 13 modules. 5 quarters including Advanced track. Public/invitational framing leads with “a 12-month formation pathway” (no lesson count). Structural/funder framing states “48 core lessons across 4 quarters, plus a 4-lesson advanced track — 52 total.” Verified against live DB via SQL. **Do not write ‘80 lessons,” ‘16 modules,” or ‘4 quarters’ as the complete structure anywhere.** Fully populated via migrations 013–019. No Notion import needed.
13. **Theology anchors:** Matthew 28:19-20 (mandate) + Ephesians 2:10 (blueprint theology).

---

## 🧭 HOW TO RESUME WORK (for any AI or developer)

1. **Read this file first.** It's the whole picture.
2. **Check `BUILD_SEQUENCE.md`** for the phase plan and what's next.
3. **For strategy work:** read `POSITIONING_DOCUMENT.md` + `NEED_RESEARCH_BRIEF.md` first — they anchor all voice and messaging.
4. **For analytics work:** read `ANALYTICS_ARCHITECTURE.md` — the measurement model.
5. **For database work:** migrations are in `supabase/migrations/`, numbered in order.
6. **For UI work:** brand system is in `app/globals.css` + `tailwind.config.ts`. Honor the locked brand.
7. **At the end of your session:** UPDATE THIS FILE with what you built and what's next.

---

## 📌 SESSION LOG

> Append a short entry after each work session. Never delete past entries.

**Session — Foundation + Strategy (prior sessions)**
- Built complete database (migrations 001-012)
- Built core Next.js scaffold, brand system, AI prompts, public homepage
- Built founder sovereign tier
- Phase 1 (application + auth) completed
- Created 6-surface demo
- Locked all 4 positioning locks
- Created Positioning Document, Launch Marketing Plan, Need Research Brief, Build Sequence

**Session — Trademark correction pass (current)**
- Verified trademark language across the ENTIRE project with grep sweeps
- Strategy docs (created post-lock) were already correct
- Fixed pre-lock files to the locked periods-form `The B.L.U.E.P.R.I.N.T.S. Discipleship Institute` / `The B.L.U.E.P.R.I.N.T.S. Foundation`:
  - `app/page.tsx` — hero eyebrow, footer copyright, trademark line
  - `app/layout.tsx` — all site metadata (title, template, applicationName, authors, openGraph)
  - `lib/ai/prompts.ts` — all 3 AI prompts (reflection companion, facilitator insights, admin intelligence)
  - `supabase/migrations/012` — founder bio seed text
  - `README.md` — header, body, footer; replaced stale foreign trademarks (Discipleship OS / RESTORE / KIND) with correct Blueprint trademarks
  - `SETUP.md` — header
- Final verification: 3 grep checks all clean (no no-periods forms, no foreign trademarks remain)
- Re-zipped. Project = 43 files.
- **NEXT:** Reflection journal + AI companion, then cohort space, then Phase 3 capstone builders

> Note for future sessions: the trademark is LOCKED as `The B.L.U.E.P.R.I.N.T.S. Foundation` and `The B.L.U.E.P.R.I.N.T.S. Discipleship Institute` — periods between every letter, every public usage. Other valid marks: Identity Blueprint Formation™, Identity Blueprint Statement™.

**Session — Master doc reconciliation (May 31, 2026)**
- Discovered stale MASTER_PROJECT_STATE.md had been copied from founder's zip (different build path)
- Ran live verification: `dir supabase\migrations` + `pg_tables` query against `yhpemsoojtgjvjmmzxut`
- Ground truth confirmed: 20 migrations applied (001–020), 33 tables live
- **Founder Sovereign Tier: NOT BUILT** — `founder_registry`, `founder_vault`, `founder_audit_log` do not exist yet
- **Analytics / Transformation Index: NOT BUILT** — `engagement_events`, `transformation_index`, `cohort_analytics` etc. do not exist yet
- `lib/founder/protection.ts`, `lib/analytics/track.ts`, `TrackPageView.tsx` do not exist yet
- Curriculum is 52 lessons (not 80) — fully populated via migrations 013–019, no Notion import needed
- Rewrote this master doc to reflect the actual live build
- **NEXT:** Build migrations 021 (Founder Sovereign Tier) + 022-023 (Analytics + Transformation Index)

**Session — Build Sprint (May 31, 2026 — Session 2)**
- Applied migrations 021 (Founder Sovereign Tier), 022 (Analytics Foundation), 023 (Analytics Rollups) — 3 migrations pushed via `supabase db push`, all confirmed ✅
- DB now has 41 tables. `compute_transformation_index()`, `detect_at_risk_students()`, `compute_cohort_analytics()`, `compute_institute_metrics()` all live.
- `founder_registry` seeded with Kimberly Coleman (email: `kimberly@theblueprintsfoundation.org`, title: "Founding Architect")
- Built `lib/founder/protection.ts` — `isFounder()`, `requireFounder()`, `logFounderAction()`, vault helpers
- Built `lib/analytics/track.ts` — `track()` (client), `trackServer()` (server), `startTimer()`
- Built `components/analytics/TrackPageView.tsx` — drop-in tracker with duration measurement
- Wired `TrackPageView` into lesson viewer (`lesson_view`), reflections page (`reflection_start`), cohort page (`resource_view`)
- Built `REFLECTION_ANALYSIS_PROMPT` in `lib/ai/prompts.ts` — structured JSON prompt for depth scoring, theme extraction, identity vs performance language analysis
- Wired reflection analysis pipeline into `app/api/reflections/route.ts` via Next.js `after()` — fires post-response, non-blocking, inserts into `reflection_analysis` using admin client
- Built all 3 capstone API routes: `/api/capstone/identity-blueprint`, `/api/capstone/purpose-statement`, `/api/capstone/ministry-plan` (each: GET load, POST upsert, POST ai_draft)
- Built all 3 capstone builder pages: `/identity-blueprint` (Q1 — 8 sections + lies/truths), `/purpose-statement` (Q4 — 7 sections, pulls identity context), `/ministry-plan` (Q4 — vision + goals + timeline, pulls purpose context)
- Fixed Vercel deployment: added `vercel.json` (`"framework": "nextjs"`) — resolves "missing public directory" build error
- Fixed Vercel runtime: identified `MIDDLEWARE_INVOCATION_FAILED` 500 as missing env vars in Vercel dashboard
- **NEXT:** Phase 4 — Facilitator dashboard (assessment entry, cohort health, at-risk UI)

**Session — Phase 4 Complete (Session 3)**
- Built complete Facilitator Dashboard (Phase 4) — all pages + all API routes
- `app/(facilitator)/layout.tsx` — role guard + FacilitatorNav (created end of Session 2)
- `components/facilitator/FacilitatorNav.tsx` — 4-link nav, role badge, mobile nav (created end of Session 2)
- `app/api/facilitator/cohorts/route.ts` — GET cohorts with nested students + sessions (created end of Session 2)
- `app/api/facilitator/cohort/[cohort_id]/students/route.ts` — GET roster with progress + reflection counts
- `app/api/facilitator/cohort/[cohort_id]/sessions/route.ts` — GET weekly_flow for attendance selector
- `app/api/facilitator/cohort/[cohort_id]/at-risk/route.ts` — GET via `detect_at_risk_students()` RPC
- `app/api/facilitator/attendance/route.ts` — GET + POST bulk upsert (present/absent/late/excused)
- `app/api/facilitator/assessments/route.ts` — GET + POST upsert facilitator assessment scores
- `app/(facilitator)/facilitator/page.tsx` — Dashboard with assigned cohorts, stats, quick links
- `app/(facilitator)/facilitator/cohort/[cohort_id]/page.tsx` — Cohort health with at-risk tab (signal badges, risk level colors) + full roster tab (progress bars)
- `app/(facilitator)/facilitator/student/[student_id]/page.tsx` — Student detail with checkpoint tabs × 5-dimension assessment entry (score_numeric, qualitative, narrative)
- `app/(facilitator)/facilitator/attendance/page.tsx` — Attendance capture with session selector, bulk status buttons, notes on absence/late/excused
- **NEXT:** Phase 5 — Admin dashboard (application review, cohort creation, user management)

**Session — Phase 5 Complete (May 31, 2026 — Session 4)**
- Built complete Admin Dashboard (Phase 5) — all pages + all API routes
- Fixed Vercel build error: split `trackServer` out of `track.ts` into `lib/analytics/track-server.ts` (next/headers was being bundled into client code via TrackPageView)
- `app/(admin)/layout.tsx` — admin-only role guard + AdminNav
- `components/admin/AdminNav.tsx` — 4-link nav, Admin badge, initials avatar
- `app/(admin)/admin/page.tsx` — dashboard with 4 live stats + pending applications preview + quick actions
- `app/(admin)/admin/applications/page.tsx` — full application review: status filter tabs, split-pane detail + action panel, inline notes/interview date/cohort assignment, status workflow transitions
- `app/(admin)/admin/cohorts/page.tsx` — cohort management: create cohort form (name/code/dates/capacity/facilitators), list with enrollment bars + capacity %, inline status edit
- `app/(admin)/admin/users/page.tsx` — user management: search + role filter, inline role dropdown, active/inactive toggle
- `app/api/admin/applications/route.ts` — GET paginated with status filter; PATCH status/reviewer_notes/interview_date/decision_notes/assigned_cohort_id
- `app/api/admin/cohorts/route.ts` — GET all; POST create + assign facilitators; PATCH status/name
- `app/api/admin/cohorts/enroll/route.ts` — POST enroll student with capacity check; GET facilitators list
- `app/api/admin/users/route.ts` — GET searchable with role filter; PATCH role/is_active (self-demotion blocked)
- **NEXT:** Phase 6 — Founder dashboard UI

**Session — Phase 6 Complete (May 31, 2026 — Session 5)**
- Built complete Founder Sovereign Dashboard (Phase 6) — all pages + all API routes
- `app/(founder)/layout.tsx` — email-locked sovereign guard (`requireFounder()`) + FounderNav wrapper
- `components/founder/FounderNav.tsx` — 5-link nav, gold-on-dark theme, "Sovereign" badge
- `app/(founder)/founder/page.tsx` — Command Center: 8 institute vitals (live via Supabase), Transformation Index panel (dark gold card), Sovereign Actions quick links, Recent Activity audit feed
- `app/(founder)/founder/vault/page.tsx` — Vault browser: 10 category tabs with live counts, split-pane list + detail, create/edit form (title, category, visibility, content, external_url, tags), soft-archive
- `app/(founder)/founder/analytics/page.tsx` — Institute analytics: triggers `compute_institute_metrics()` RPC, displays all-time vitals, capstone completions, active cohort health table (TI gain, at-risk count), completed cohort outcome record
- `app/(founder)/founder/audit/page.tsx` — Immutable audit log: paginated 50/page, 11-action type filter, expandable JSON detail, timestamps
- `app/(founder)/founder/funding/page.tsx` — Funding records: 6 funding types + 7 statuses, amount tracking (requested/awarded/deployed), free-seat counting, reporting deadline alerts, proposal/report URL links
- `app/api/founder/vault/route.ts` — GET (category/archived filter); POST create; PATCH update; DELETE soft-archive — all behind `isFounder()`, uses admin client for writes
- `app/api/founder/metrics/route.ts` — GET triggers `compute_institute_metrics()` RPC then returns latest snapshot + all cohort analytics with nested `cohort_analytics[]`
- `app/api/founder/audit/route.ts` — GET paginated (50/page), action filter, read-only
- `app/api/founder/funding/route.ts` — GET (status/type filter); POST create (logs `grant_report_generate`); PATCH update
- Every founder action is audit-logged via `logFounderAction()` — vault access, analytics views, dashboard views
- **NEXT:** Phase 7 — Commissioning ceremony + certificates

**Session — Phase 7 Complete (May 31, 2026 — Session 6)**
- Built complete Commissioning system (Phase 7) — student page + printable certificate + admin management + 2 API routes
- `app/(student)/commissions/page.tsx` — student commissioning page: live eligibility checklist (3 capstones + attendance ≥ 70% + covenant), commissioning date/location, calling declaration, final blessing, prophetic words
- `app/(student)/commissions/certificate/page.tsx` — printable A4/Letter certificate: student name, cohort, commissioning date, calling declaration, Ephesians 2:10 anchor, certificate number, Kimberly Coleman signature line, `window.print()` button
- `app/(admin)/admin/commissions/page.tsx` — admin commissioning hub: two-tab layout (Commissioned / Not Yet Commissioned), create commission form (calling declaration, date, location), eligibility summary badges, community covenant toggle, prophetic words list, issue certificate button (irreversible)
- `app/api/commissions/route.ts` — GET student's own commission + live eligibility computed from 5 tables (identity_blueprints, purpose_statements, ministry_plans, attendance, progress) + `studentName` for certificate
- `app/api/admin/commissions/route.ts` — GET all commissions + uncommissioned cohort students; POST create (auto-pulls eligibility, generates `BLUE-YYYY-NNNN` cert number); PATCH update/issue
- `components/admin/AdminNav.tsx` — added Commissioning link (5th nav item)
- `components/student/StudentNav.tsx` — added Commissioning link (5th nav item)
- `middleware.ts` — added `/commissions` and `/founder` to protected routes
- **NEXT:** Phase 8 — Analytics dashboards (student progress, facilitator view, funder reporting)

**Session — Phase 8 Complete (May 31, 2026 — Session 7)**
- Built complete Analytics Dashboards (Phase 8) — 3 pages + 3 API routes
- `app/(student)/analytics/page.tsx` — Student formation journey: Transformation Index across checkpoints (table + dimension bars), reflection depth timeline (bar chart with depth labels), engagement activity breakdown (streak, active days, event counts)
- `app/(facilitator)/facilitator/analytics/page.tsx` — Facilitator cohort analytics: cohort health cards (enrollment, attendance, lesson completion, TI gain panel, capstone progress), student TI comparison table (sortable, cohort filter), at-risk students view
- `app/(admin)/admin/analytics/page.tsx` — Admin funder accountability: institute vitals (graduates, free seats, TI avg), formation outcomes (capstone counts), engagement rates, funding records breakdown (type/status badges, deployed vs. awarded), cohort outcomes table
- `app/api/analytics/student/route.ts` — GET: TI records all checkpoints, reflection_analysis (depth + identity language), engagement_events summary (30-day, streak), progress/capstone status
- `app/api/analytics/facilitator/route.ts` — GET: cohort_analytics latest snapshots, student TI table (latest per student + gain from baseline), at-risk students (composite < 40)
- `app/api/analytics/admin/route.ts` — GET: triggers compute_institute_metrics() RPC, institutional_metrics, funding_records with summary (totalAwarded/Deployed/FreeSeats), upcoming reporting deadlines, cohort outcomes
- `components/student/StudentNav.tsx` — added My Formation link (6th nav item)
- `components/facilitator/FacilitatorNav.tsx` — added Analytics link (5th nav item)
- `components/admin/AdminNav.tsx` — added Analytics link (6th nav item)
- `middleware.ts` — added `/analytics` to protected routes
- **NEXT:** Phase 9 — PWA / mobile readiness (service worker, offline, home-screen install)

**Session — Phase 9 Complete (May 31, 2026 — Session 8)**
- Built complete PWA / Mobile Readiness (Phase 9) — 5 files
- `public/manifest.json` — Full Web App Manifest: name/short_name, icons (192+512), display: standalone, theme_color #5C4A2A, background_color #FAFAF8, 3 shortcuts (Lessons, Reflect, Cohort)
- `public/sw.js` — Service Worker: cache-first for `/_next/static/` + image assets; network-first with offline fallback for navigation; hard skip for `/api/` and Supabase (auth-sensitive); background sync stub for future offline reflection drafts
- `app/offline/page.tsx` — Branded offline page: WiFi icon, message, Ephesians 2:10 blockquote, try-again button
- `app/layout.tsx` — Updated: added `manifest` metadata, `appleWebApp` metadata, `apple-touch-icon` link, `maximumScale: 1`, dual `themeColor` (light/dark), SW registration `<Script strategy="afterInteractive">`, `<InstallPrompt>` component
- `components/shared/InstallPrompt.tsx` — PWA install banner: `beforeinstallprompt` event listener, 3s delay, session storage dismiss, dark gold / amber design, Install + Not now buttons. Auto-hidden if already standalone.
- **NEXT:** Phase 11 — Full design system alignment

**Session — Phase 10 Complete (May 31, 2026 — Session 9)**
- Built onboarding flow: `app/(student)/onboarding/page.tsx` — welcome screen, cohort intro, quick-start checklist
- Built legal pages: `app/privacy/page.tsx` (Privacy Policy), `app/terms/page.tsx` (Terms of Service) — both branded with Ephesians anchor
- `resend` package installed (`^4.8.0`) + `RESEND_API_KEY` added to Vercel + custom domain `theblueprintsfoundation.org` connected
- Email API routes NOT YET built — next session
- **NEXT:** Phase 11 — Design system alignment across all screens

**Session — Phase 11 Complete (May 31, 2026 — Session 10)**
- Full design system alignment across all 44 app tsx files
- Landing page (`app/page.tsx`) — full editorial redesign: animated hero, mandate section, 10-pillar grid, 4-quarter journey cards, 3-capstone section, dark CTA footer
- `app/globals.css` — new CSS design system: `--bp-gold`, `--bp-dark`, `--bp-gold-light`, `--gradient-gold`, `--gradient-dark`, all `.bp-card-*`, `.bp-btn-gold`, `.text-overline`, `.bp-dark-section`, `.bp-mandate`, `.bp-badge` classes
- `tailwind.config.ts` — bp token extensions: `bp.gold`, `bp.dark`, `bp.gold-light`, font-display variable, custom animations + shadows
- All 4 nav bars upgraded: brand name in `font-display font-light`, gold avatar, gold active underline
- Founder dashboard: `text-overline` labels, `bp-dark-section` Transformation Index, font-display numerics
- Global amber token replacement (Node.js script): replaced `amber-*` → `var(--bp-gold|--bp-brown|--bp-cream|...)` across all files
- Global overline label cleanup: verbose `text-xs tracking-widest uppercase font-semibold` patterns → `.text-overline` class in 23 files
- Hotfix: server component crash in `app/(founder)/founder/page.tsx` (event handlers → Tailwind hover classes)
- Commit `86bedfc` — all changes pushed to `main`
- **NEXT:** Phase 12 — Email API routes, Storage buckets, analytics cron, Stripe

---

**As long as this file lives, the work is never lost. Update it. Protect it. It is the project's memory.** 🔱
