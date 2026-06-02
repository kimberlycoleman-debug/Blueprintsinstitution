// ============================================================
// Blueprint Discipleship Institute — Core Types
// ============================================================

export type UserRole = 'student' | 'facilitator' | 'admin' | 'founder'
export type ApplicationStatus = 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'waitlisted'
export type CohortStatus = 'forming' | 'active' | 'completed' | 'archived'
export type LessonStatus = 'not_started' | 'in_progress' | 'completed'
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4'

// ---- Profile ------------------------------------------------
export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  avatar_url: string | null
  phone: string | null
  bio: string | null
  city: string | null
  state: string | null
  church: string | null
  cohort_id: string | null
  created_at: string
  updated_at: string
}

// ---- Application -------------------------------------------
export interface Application {
  id: string
  application_number: string
  full_name: string
  email: string
  phone: string | null
  city: string | null
  state: string | null
  age_range: string | null
  gender: string | null
  salvation_year: string | null
  spiritual_gifts: string | null
  current_church: string | null
  prior_discipleship_experience: string | null
  testimony: string
  why_now: string
  expectations: string | null
  current_role_title: string | null
  hours_committed_weekly: number | null
  status: ApplicationStatus
  reviewer_notes: string | null
  reviewed_by: string | null
  interview_date: string | null
  decision_date: string | null
  decision_notes: string | null
  assigned_cohort_id: string | null
  submitted_at: string
  updated_at: string
}

// ---- Curriculum ---------------------------------------------
export interface Quarter_ {
  id: string
  number: number
  title: string
  theme: string
  description: string | null
  order_index: number
}

export interface Module {
  id: string
  quarter_id: string
  number: number
  title: string
  description: string | null
  order_index: number
  quarter?: Quarter_
}

export interface Lesson {
  id: string
  module_id: string
  number: number
  title: string
  subtitle: string | null
  scripture_focus: string | null
  big_idea: string | null
  order_index: number
  module?: Module
}

// ---- Cohort -------------------------------------------------
export interface Cohort {
  id: string
  name: string
  description: string | null
  facilitator_id: string | null
  status: CohortStatus
  start_date: string | null
  end_date: string | null
  max_students: number
  created_at: string
  facilitator?: Profile
}

// ---- Progress -----------------------------------------------
export interface StudentProgress {
  id: string
  student_id: string
  lesson_id: string
  cohort_id: string | null
  status: LessonStatus
  completed_at: string | null
  lesson?: Lesson
}

// ---- Reflection ---------------------------------------------
export interface Reflection {
  id: string
  student_id: string
  lesson_id: string
  cohort_id: string | null
  content: string
  ai_response: string | null
  is_private: boolean
  facilitator_note: string | null
  created_at: string
  updated_at: string
  lesson?: Lesson
}

// ---- Capstone -----------------------------------------------
export interface IdentityBlueprint {
  id: string
  student_id: string
  draft_content: string | null
  ai_generated_statement: string | null
  final_statement: string | null
  is_complete: boolean
  created_at: string
  updated_at: string
}

export interface PurposeStatement {
  id: string
  student_id: string
  draft_content: string | null
  ai_generated_statement: string | null
  final_statement: string | null
  is_complete: boolean
  created_at: string
  updated_at: string
}

export interface MinistryPlan {
  id: string
  student_id: string
  draft_content: string | null
  ai_generated_plan: string | null
  final_plan: string | null
  is_complete: boolean
  created_at: string
  updated_at: string
}

// ---- Feed ---------------------------------------------------
export interface FeedPost {
  id: string
  cohort_id: string
  author_id: string
  content: string
  is_pinned: boolean
  created_at: string
  author?: Profile
}

// ---- AI Conversation ----------------------------------------
export interface AiMessage {
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

export interface AiConversation {
  id: string
  student_id: string
  conversation_type: string
  messages: AiMessage[]
  created_at: string
  updated_at: string
}

// ---- API Response -------------------------------------------
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}
