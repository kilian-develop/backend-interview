import { useState, useCallback } from 'react'

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
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  const isReviewed = useCallback((slug: string) => reviewed.has(slug), [reviewed])

  return { isReviewed, toggleReviewed, reviewedCount: reviewed.size }
}
