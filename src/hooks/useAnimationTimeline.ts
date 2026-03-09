import { useState, useRef, useCallback, useEffect } from 'react'

export function useAnimationTimeline() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  const reset = useCallback(() => {
    clearAll()
    setStep(0)
    setIsPlaying(false)
  }, [clearAll])

  const schedule = useCallback((fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay)
    timeoutsRef.current.push(t)
  }, [])

  useEffect(() => clearAll, [clearAll])

  return { step, setStep, isPlaying, setIsPlaying, reset, schedule }
}
