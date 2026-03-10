import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { ALL_TOPICS } from '../data/categories'

const STORAGE_KEY = 'interview-prep-progress'

export function useProgress() {
  const [reviewed, setReviewed] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? new Set(JSON.parse(stored) as string[]) : new Set()
    } catch {
      return new Set()
    }
  })

  const toggleReviewed = useCallback((slug: string) => {
    setReviewed((prev) => {
      const next = new Set(prev)
      const wasReviewed = next.has(slug)
      if (wasReviewed) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))

      const topic = ALL_TOPICS.find((t) => t.slug === slug)
      const title = topic?.title ?? slug
      if (wasReviewed) {
        toast(`${title} 학습 완료 취소`, { icon: '↩' })
      } else {
        toast.success(`${title} 학습 완료!`, { icon: '✓' })
      }

      return next
    })
  }, [])

  const isReviewed = useCallback((slug: string) => reviewed.has(slug), [reviewed])

  return { isReviewed, toggleReviewed, reviewedCount: reviewed.size }
}
