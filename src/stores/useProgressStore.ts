import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { CATEGORIES, ALL_TABS } from '../data/categories'

/* ── 탭 키 생성 헬퍼 ── */
const tabKey = (slug: string, tabId: string) => `${slug}:${tabId}`

/* ── 카테고리(slug)에 속한 모든 탭 키 ── */
const allTabKeysFor = (slug: string): string[] =>
  ALL_TABS
    .filter((t) => t.topicSlug === slug)
    .map((t) => tabKey(slug, t.tabId))

interface ProgressState {
  reviewedTabs: string[]

  /* 탭 단위 */
  toggleTab: (slug: string, tabId: string) => void
  isTabReviewed: (slug: string, tabId: string) => boolean

  /* 카테고리 단위 */
  getCategoryProgress: (slug: string) => { done: number; total: number }
  isCategoryComplete: (slug: string) => boolean
  toggleCategory: (slug: string) => void

  /* 전체 통계 */
  totalReviewedTabs: () => number
  totalTabs: () => number
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      reviewedTabs: [],

      /* ── 탭 단위 토글 ── */
      toggleTab: (slug: string, tabId: string) => {
        const key = tabKey(slug, tabId)
        const { reviewedTabs } = get()
        const was = reviewedTabs.includes(key)
        const next = was
          ? reviewedTabs.filter((k) => k !== key)
          : [...reviewedTabs, key]
        set({ reviewedTabs: next })

        const tab = ALL_TABS.find((t) => t.topicSlug === slug && t.tabId === tabId)
        const label = tab?.label ?? tabId
        if (was) {
          toast(`${label} 학습 취소`, { icon: '↩' })
        } else {
          toast.success(`${label} 학습 완료!`, { icon: '✓' })
        }
      },

      isTabReviewed: (slug: string, tabId: string) =>
        get().reviewedTabs.includes(tabKey(slug, tabId)),

      /* ── 카테고리 단위 ── */
      getCategoryProgress: (slug: string) => {
        const keys = allTabKeysFor(slug)
        const { reviewedTabs } = get()
        return {
          done: keys.filter((k) => reviewedTabs.includes(k)).length,
          total: keys.length,
        }
      },

      isCategoryComplete: (slug: string) => {
        const keys = allTabKeysFor(slug)
        const { reviewedTabs } = get()
        return keys.length > 0 && keys.every((k) => reviewedTabs.includes(k))
      },

      toggleCategory: (slug: string) => {
        const keys = allTabKeysFor(slug)
        const { reviewedTabs } = get()
        const allDone = keys.every((k) => reviewedTabs.includes(k))

        const cat = CATEGORIES.find((c) => c.id === slug)
        const title = cat?.title ?? slug

        if (allDone) {
          // 전체 해제
          set({ reviewedTabs: reviewedTabs.filter((k) => !keys.includes(k)) })
          toast(`${title} 전체 학습 취소`, { icon: '↩' })
        } else {
          // 전체 완료
          const merged = new Set([...reviewedTabs, ...keys])
          set({ reviewedTabs: [...merged] })
          toast.success(`${title} 전체 학습 완료!`, { icon: '✓' })
        }
      },

      /* ── 전체 통계 ── */
      totalReviewedTabs: () => get().reviewedTabs.length,
      totalTabs: () => ALL_TABS.length,
    }),
    {
      name: 'interview-prep-progress',
      version: 2,
      migrate: (persisted: unknown, version: number) => {
        if (version <= 1 && persisted) {
          // v1: reviewed (slug 배열) → v2: reviewedTabs (탭 키 배열)
          // 완료된 카테고리의 모든 탭을 완료로 마이그레이션
          const old = persisted as { reviewed?: string[] }
          if (old.reviewed && Array.isArray(old.reviewed)) {
            const tabs = old.reviewed.flatMap((slug) => allTabKeysFor(slug))
            return { reviewedTabs: tabs } as unknown as ProgressState
          }
        }
        return persisted as ProgressState
      },
    },
  ),
)
