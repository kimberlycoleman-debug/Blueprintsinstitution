'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrackPageView } from '@/components/analytics/TrackPageView'

type PostType = 'reflection_share' | 'prayer_request' | 'celebration' | 'question' | 'announcement' | 'resource_share'

interface Post {
  id: string
  post_type: PostType
  title: string | null
  content: string
  is_pinned: boolean
  created_at: string
  author_id: string
  cohort_id: string
  profiles: { full_name: string | null; email: string } | null
  cohort_post_responses: { id: string }[]
}

const POST_TYPE_LABELS: Record<PostType, { label: string; emoji: string; color: string }> = {
  reflection_share: { label: 'Reflection', emoji: '📖', color: 'bg-[var(--bp-cream)] text-[var(--bp-brown-deep)]' },
  prayer_request: { label: 'Prayer Request', emoji: '🙏', color: 'bg-blue-50 text-blue-800' },
  celebration: { label: 'Celebration', emoji: '🎉', color: 'bg-green-50 text-green-800' },
  question: { label: 'Question', emoji: '❓', color: 'bg-purple-50 text-purple-800' },
  announcement: { label: 'Announcement', emoji: '📣', color: 'bg-orange-50 text-orange-800' },
  resource_share: { label: 'Resource', emoji: '🔗', color: 'bg-gray-50 text-gray-700' },
}

export default function CohortPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [cohortName, setCohortName] = useState<string | null>(null)
  const [noCohort, setNoCohort] = useState(false)

  // New post form
  const [showForm, setShowForm] = useState(false)
  const [postType, setPostType] = useState<PostType>('reflection_share')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState('')

  useEffect(() => {
    fetch('/api/cohort/posts')
      .then((r) => r.json())
      .then(({ data, cohort_name, no_cohort }) => {
        if (no_cohort) {
          setNoCohort(true)
        } else {
          setPosts(data ?? [])
          setCohortName(cohort_name ?? null)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handlePost(e: React.FormEvent) {
    e.preventDefault()
    setPostError('')
    setPosting(true)

    const res = await fetch('/api/cohort/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post_type: postType, title: title || null, content }),
    })
    const json = await res.json()
    setPosting(false)

    if (!res.ok) {
      setPostError(json.error ?? 'Something went wrong.')
    } else {
      setShowForm(false)
      setContent('')
      setTitle('')
      setPosts((prev) => [json.data, ...prev])
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-[var(--bp-muted)] text-sm">Loading your cohort…</div>
      </div>
    )
  }

  if (noCohort) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-2xl font-semibold mb-3">Cohort Assignment Pending</h1>
          <p className="text-[var(--bp-muted)] mb-6">
            You haven&apos;t been assigned to a cohort yet. Our team will notify you when your cohort is ready.
          </p>
          <Link href="/dashboard" className="bp-btn bp-btn-secondary">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const pinned = posts.filter((p) => p.is_pinned)
  const regular = posts.filter((p) => !p.is_pinned)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <TrackPageView eventType="resource_view" resourceType="cohort" metadata={{ page: 'cohort' }} />
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-overline mb-1">
            Cohort Space
          </div>
          <h1 className="text-3xl font-semibold">{cohortName ?? 'My Cohort'}</h1>
          <p className="text-[var(--bp-muted)] mt-1">
            Your formation community — pray, share, celebrate together.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bp-btn bp-btn-primary text-sm px-5 py-2.5 flex-shrink-0"
        >
          {showForm ? 'Cancel' : '+ Post'}
        </button>
      </div>

      {/* Post Form */}
      {showForm && (
        <div className="bp-card p-6">
          <h2 className="font-semibold mb-4">Share with your cohort</h2>
          <form onSubmit={handlePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Type of post</label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(POST_TYPE_LABELS) as PostType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPostType(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      postType === type
                        ? 'bg-[var(--bp-brown-deep)] text-white'
                        : 'bg-[var(--bp-warm)] text-[var(--bp-muted)] hover:bg-[var(--bp-sand)]'
                    }`}
                  >
                    {POST_TYPE_LABELS[type].emoji} {POST_TYPE_LABELS[type].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Title (optional)</label>
              <input
                type="text"
                className="bp-input"
                placeholder="Give your post a title…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Your message *</label>
              <textarea
                rows={4}
                required
                className="bp-textarea"
                placeholder="Share what's on your heart…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            {postError && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{postError}</p>
            )}
            <button
              type="submit"
              disabled={posting || !content.trim()}
              className="bp-btn bp-btn-primary disabled:opacity-40"
            >
              {posting ? 'Posting…' : 'Share with Cohort'}
            </button>
          </form>
        </div>
      )}

      {/* Pinned Posts */}
      {pinned.length > 0 && (
        <div className="space-y-3">
          <p className="text-overline">Pinned</p>
          {pinned.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}

      {/* Feed */}
      {regular.length === 0 && pinned.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--bp-muted)] mb-2">No posts yet.</p>
          <p className="text-sm text-[var(--bp-muted)]">Be the first to share something with your cohort.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {regular.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  const type = POST_TYPE_LABELS[post.post_type] ?? POST_TYPE_LABELS.reflection_share
  const authorName = post.profiles?.full_name ?? post.profiles?.email ?? 'Cohort Member'
  const initials = authorName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  const responseCount = post.cohort_post_responses?.length ?? 0

  return (
    <div className="bp-card p-5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[var(--bp-warm)] flex items-center justify-center text-xs font-semibold text-[var(--bp-brown-deep)] flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-medium">{authorName}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${type.color}`}>
              {type.emoji} {type.label}
            </span>
            <span className="text-xs text-[var(--bp-muted)] ml-auto">
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          {post.title && <p className="font-medium mb-1">{post.title}</p>}
          <p className="text-sm text-[var(--bp-text)] leading-relaxed whitespace-pre-wrap">{post.content}</p>
          {responseCount > 0 && (
            <p className="text-xs text-[var(--bp-muted)] mt-3">
              {responseCount} {responseCount === 1 ? 'response' : 'responses'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
