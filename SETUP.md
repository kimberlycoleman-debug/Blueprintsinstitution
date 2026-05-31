# Setup — The Blueprint Discipleship Institute

This document walks you through standing up the complete production foundation.

---

## Prerequisites

- Node.js 20 or higher
- A Supabase account (free tier works to start)
- An OpenAI account with API access
- A GitHub account
- A Vercel account (for deployment)

---

## Step 1 — Install Dependencies

```bash
cd blueprint-discipleship-institute
npm install
```

---

## Step 2 — Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Choose a strong database password (save it somewhere secure)
3. Wait for the project to provision (about 2 minutes)
4. Once ready, go to **Settings → API** and grab:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → this is your `SUPABASE_SERVICE_ROLE_KEY` (keep secret)

---

## Step 3 — Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` (from https://platform.openai.com/api-keys)

---

## Step 4 — Run Database Migrations

You have two options:

### Option A: Supabase Dashboard (Simpler)

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Run each migration file IN ORDER:
   - `supabase/migrations/001_foundation.sql`
   - `supabase/migrations/002_users.sql`
   - `supabase/migrations/003_lesson_objectives_scriptures.sql`
   - `supabase/migrations/004_teacher_scripts.sql`
   - `supabase/migrations/005_activation_discussion_workbook.sql`
   - `supabase/migrations/006_assessment_tips_resources.sql`
   - `supabase/migrations/007_cohorts_attendance_progress.sql`
   - `supabase/migrations/008_applications_reflections_capstones.sql`
   - `supabase/migrations/009_cohort_feed_ai_conversations.sql`
   - `supabase/migrations/010_rls_policies.sql`
   - `supabase/migrations/011_seed_curriculum.sql`

### Option B: Supabase CLI (Production-grade)

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

---

## Step 5 — Configure Supabase Auth

1. In Supabase dashboard, go to **Authentication → URL Configuration**
2. Set **Site URL**: `http://localhost:3000` (for local dev)
3. Add to **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - Your production URL when you deploy

---

## Step 6 — Create Your First Admin User

After running the migrations:

1. Sign up for an account through the app (when you get it running)
2. In Supabase dashboard, go to **Authentication → Users**
3. Find your user, then go to **SQL Editor**
4. Run:

```sql
update profiles
set role = 'admin'
where email = 'your-email@example.com';
```

You are now the founder admin.

---

## Step 7 — Run the App Locally

```bash
npm run dev
```

Open http://localhost:3000

---

## Step 8 — Import Your Notion Curriculum

Your 80 lessons live in Notion right now. Here are your options:

### Option A: Manual entry through admin UI
(Admin lesson editor — to be built in next phase)

### Option B: Notion export + script
1. Export your Notion curriculum database as Markdown + CSV
2. Build a one-time import script that maps your Notion fields to the database schema
3. Run the script with admin Supabase credentials

### Option C: Notion API integration
Build a sync system that pulls from Notion via API on demand

We recommend Option B for production — one-time, owned forever.

---

## Step 9 — Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and import the GitHub repo
3. Add environment variables in Vercel:
   - All `NEXT_PUBLIC_*` variables (Production)
   - `SUPABASE_SERVICE_ROLE_KEY` (Production, server-side only)
   - `OPENAI_API_KEY` (Production, server-side only)
4. Deploy

Update Supabase Auth Site URL and Redirect URLs to your production URL.

---

## Step 10 — Connect Your Domain

1. In Vercel, go to **Settings → Domains**
2. Add `theblueprintsfoundation.org`
3. Follow Vercel's DNS instructions

---

## What's Built Today vs. What's Next

### Built (this foundation):
- Complete production database schema (12 migrations)
- Three-tier curriculum architecture (Quarters → Modules → Lessons)
- Eight lesson content tables (preserves every section of your Notion lessons)
- Six operational tables (cohorts, students, facilitators, weekly flow, attendance, progress)
- Application/admission flow tables
- All three capstone deliverables (Identity Blueprint, Purpose, Ministry Plan)
- AI conversation persistence
- Cohort feed (prayer, celebration, reflection sharing)
- Commissioning and certificates
- Full Row Level Security for three roles (student, facilitator, admin)
- Brand-locked design system (Blueprints warm neutrals)
- Supabase auth integration
- OpenAI client + formation-grade system prompts
- Public homepage
- Setup foundation for all pages

### Next phases to build:
- Application/enrollment form (UI)
- Auth flow (login, signup, password reset)
- Student dashboard (12-month journey view)
- Lesson viewer (with hybrid live/in-app delivery)
- Reflection journal with AI companion
- Cohort space (feed, posts, responses)
- Identity Blueprint Statement builder (AI-assisted)
- Purpose Statement builder (AI-assisted)
- Ministry Launch Plan builder (AI-assisted)
- Facilitator dashboard
- Facilitator session tools (attendance, reflection review)
- Admin dashboard (multi-cohort oversight)
- Curriculum admin (lesson editor)
- Commissioning certificate generator
- Notion import script

---

## Architecture Notes

**Why a separate database from Solavian OS?**
Clean isolation. Blueprints is the Foundation arm. Solavian OS is the institutional engine. They share architecture and DNA but maintain independent data sovereignty. Future cross-system integration happens via authenticated API, not shared tables.

**Why fully relational lesson content?**
So AI can query across sections. Show me every activation exercise that involves writing. Find every facilitator tip about handling resistance. Summarize every reflection prompt in Q3. JSON locks queries away — relational opens them up.

**Why dual assessment (numeric + qualitative)?**
Identity formation isn't a test. It's a depth journey. The qualitative scale (Not Demonstrated → Emerging → Demonstrated → Embodied) maps to your Depth Levels and honors how transformation actually works. The numeric score is for facilitator quick-rating when needed.

**Why RLS forced?**
Even superuser must obey row-level security for institutional data. This is enterprise-grade data protection — institutions cannot accidentally see other institutions' data, and students cannot accidentally see other students' reflections.

---

## Support

For questions on this foundation:
- Review each migration file's comments for schema details
- Review `lib/ai/prompts.ts` for AI companion behavior tuning
- Review `middleware.ts` for route protection patterns

This foundation is production-grade. Build on top of it with confidence.

🔱 **You are building something the world has never seen.**
