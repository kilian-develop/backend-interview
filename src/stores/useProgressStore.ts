import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { ALL_TOPICS } from '../data/categories'

interface ProgressState {
  reviewed: string[]
  toggleReviewed: (slug: string) => void
  isReviewed: (slug: string) => boolean
  reviewedCount: () => number
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      reviewed: [],

      toggleReviewed: (slug: string) => {
        const { reviewed } = get()
        const wasReviewed = reviewed.includes(slug)
        const next = wasReviewed
          ? reviewed.filter((s) => s !== slug)
          : [...reviewed, slug]

        set({ reviewed: next })

        const topic = ALL_TOPICS.find((t) => t.slug === slug)
        const title = topic?.title ?? slug
        if (wasReviewed) {
          toast(`${title} 학습 완료 취소`, { icon: '↩' })
        } else {
          toast.success(`${title} 학습 완료!`, { icon: '✓' })
        }
      },

      isReviewed: (slug: string) => get().reviewed.includes(slug),

      reviewedCount: () => get().reviewed.length,
    }),
    {
      name: 'interview-prep-progress',
      version: 1,
      migrate: (persisted: unknown, version: number) => {
        if (version === 0 || !persisted) {
          // 기존 useProgress 훅이 저장한 ["slug1","slug2"] 배열 마이그레이션
          try {
            const raw = localStorage.getItem('interview-prep-progress')
            if (raw) {
              const parsed = JSON.parse(raw)
              if (Array.isArray(parsed)) {
                return { reviewed: parsed } as ProgressState
              }
            }
          } catch { /* ignore */ }
        }
        return persisted as ProgressState
      },
    },
  ),
)
