import { useState, useEffect } from 'react'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.scroll-top-btn {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: rgba(10,14,26,0.92);
  backdrop-filter: blur(12px);
  color: var(--dim);
  cursor: pointer;
  z-index: 41;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;
  transition: opacity .25s, transform .25s, border-color .2s, color .2s;
}
.scroll-top-btn.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.scroll-top-btn:hover {
  border-color: var(--dim);
  color: var(--text);
}
@media (max-width: 480px) {
  .scroll-top-btn { right: 16px; bottom: 16px; width: 44px; height: 44px; }
}
`

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useInjectCSS('style-scroll-top', CSS)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`scroll-top-btn${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="최상단으로 이동"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
