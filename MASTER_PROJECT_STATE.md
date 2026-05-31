# 🔱 MASTER PROJECT STATE
## The B.L.U.E.P.R.I.N.T.S. Discipleship Institute

> **THIS IS THE SINGLE SOURCE OF TRUTH FOR THE ENTIRE PROJECT.**
>
> If context is ever lost — a new chat, a different AI tool, a compacted conversation, a new developer, a future version of Claude — **START HERE.** This document tells you everything: what exists, what's built, what's next, and where every piece lives.
>
> **Update this document at the end of every work session.** It is the project's memory. As long as this file survives, nothing is ever lost.
>
> **⚠️ UPDATED — June 2026 (Session 3).** Phase 4 Facilitator Dashboard COMPLETE. All API routes + all pages built. See SESSION LOG for full details.

---

## ⚡ QUICK ORIENTATION (read this first)

**What this is:** A 12-month discipleship formation institute. Free for every believer. Funded by grants + institutional partners. The first formation institute to *measure* spiritual transformation.

**Tech stack:** Next.js 14/15 (App Router) + TypeScript + Supabase (Postgres/Auth/Storage) + OpenAI + Tailwind CSS.

**The mission:** Matthew 28:19-20. Every believer carries a God-designed blueprint. This institute unlocks it.

**Where the project lives:**
- Working/build folder: `C:\Users\kim22\OneDrive\Desktop\BPINSTITUTION\blueprint-discipleship-institute`
- Supabase project ref: `yhpemsoojtgjvjmmzxut`
- This is a STANDALONE system — completely independent from Solavian OS.

**Who the founder is:** Kimberly Coleman — Founding Architect. Email: `kimberly@theblueprintsfoundation.org`.

> **Note:** The Founder Sovereign Tier (founder_registry, vault, audit log) is **NOT YET BUILT** in the live database. It is next in the build queue.

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
| 011 | `011_seed_curriculum.sql` | Seeds structure: 4 quarters + 16 modules (lesson rows populated by 013–014) |

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

### ❌ NOT YET BUILT — Next migrations (021+)

| # | Planned file | What it will create |
|---|------|-----------------|
| 021 | `021_founder_sovereign_tier.sql` | `founder_registry` (seeded: Kimberly Coleman), `founder_vault` (10 categories), `founder_audit_log` (immutable), `founder_notes`, `is_founder()`, `log_founder_action()`, full RLS + force RLS |
| 022 | `022_analytics_foundation.sql` | `engagement_events` (17 types), `assessments` (5 dimensions × 6 checkpoints × self/facilitator), `reflection_analysis`, `transformation_index`, `compute_transformation_index()` function — **THE FOUNDING DISTINCTIVE IS NOW LIVE** |
| 023 | `023_analytics_rollups.sql` | `cohort_analytics`, `institutional_metrics`, `outcome_followups` (6/12/24mo), `funding_records`, `compute_cohort_analytics()`, `compute_institute_metrics()`, `detect_at_risk_students()` |

**⚠️ These were planned — they are now ALL built. See the Code section below.**

**Key database concepts:**
- **Three roles:** student, facilitator, admin (enum in `profiles`). Founder is SEPARATE — will be email-locked in `founder_registry` (migration 021).
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

### Founder Sovereign Tier (Phase 6 — DB complete, UI pending)
| Path | Purpose |
|------|---------|
| `lib/founder/protection.ts` | `isFounder()`, `requireFounder()` guard, `logFounderAction()`, `getVaultItems()`, `createVaultItem()`, `getFounderProfile()` |

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

### ⏳ NOT YET BUILT — Code
| Path | What it will do |
|------|---------|
| Admin dashboard | Application review, cohort creation, user management |
| Founder dashboard UI | Vault browser, audit log, compute_institute_metrics(), cross-cohort analytics |
| Analytics dashboards | Student progress, facilitator view, founder intelligence, funder reporting |

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

### NEXT (in build priority order)
- ✅ **Phase 4:** Facilitator dashboard — COMPLETE (layout, nav, dashboard, cohort health, student detail + assessment entry, attendance capture, 6 API routes)
- ⏳ **Phase 5 (NEXT):** Admin dashboard — application review, cohort creation, user management
- ⏳ **Phase 6:** Founder dashboard UI — vault browser, audit log viewer, `compute_institute_metrics()` caller, cross-cohort analytics (DB is 100% complete, only UI needed)
- ⏳ **Analytics dashboards:** Student progress view, facilitator view, founder cross-cohort intelligence, funder/partner reporting
- ⏳ **Phase 7:** Commissioning ceremony + certificates
- ⏳ **Phase 8:** PWA / mobile readiness
- ⏳ **Phase 9:** Launch prep (email, onboarding, legal)

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
9. **Separate database:** Standalone from Solavian OS. Never connected.
10. **Stack:** Next.js 15 web-first with AI, PWA for mobile (not native React Native for v1).
11. **Brand:** Warm neutrals (#FAFAF8, #F5F0E8, #8B7355, #7C9A7E), Inter + Cormorant Garamond, 16px rounded cards.
12. **Curriculum:** 4 active quarters (Alpha/Identity, Formation/Maturity, Maturity/Healing, Ministry/Activation) + Advanced track. 16 modules. **52 lessons fully populated** in the live database (migrations 013–019). No Notion import needed — curriculum is already loaded.
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

---

**As long as this file lives, the work is never lost. Update it. Protect it. It is the project's memory.** 🔱
