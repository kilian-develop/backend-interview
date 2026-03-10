import { useState, useEffect, useCallback, useRef } from 'react'
import { useInjectCSS } from '../../hooks/useInjectCSS'

interface TocItem {
  id: string
  text: string
}

interface Props {
  accentColor: string
  activeTab: string
}

const CSS = `
/* ── Desktop sidebar ── */
.toc-nav {
  position: fixed;
  right: 20px;
  top: 72px;
  width: 180px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  background: rgba(10,14,26,0.88);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
  z-index: 40;
  scrollbar-width: none;
}
.toc-nav::-webkit-scrollbar { display: none; }

/* ── Toggle button ── */
.toc-toggle {
  position: fixed;
  right: 24px;
  bottom: 76px;
  width: 42px;
  height: 42px;
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
  transition: border-color .2s, color .2s;
}
.toc-toggle:hover {
  border-color: var(--toc-ac);
  color: var(--toc-ac);
}

/* ── Mobile panel ── */
.toc-panel {
  position: fixed;
  right: 24px;
  bottom: 128px;
  width: 220px;
  max-height: 50vh;
  overflow-y: auto;
  background: rgba(10,14,26,0.95);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
  z-index: 42;
  opacity: 0;
  transform: translateY(8px) scale(0.96);
  pointer-events: none;
  transition: opacity .2s, transform .2s;
  scrollbar-width: none;
}
.toc-panel::-webkit-scrollbar { display: none; }
.toc-panel.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* ── Shared ── */
.toc-label {
  font-size: 10px;
  font-family: var(--mono);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 10px;
}
.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.toc-link {
  font-size: 11px;
  color: var(--muted);
  cursor: pointer;
  padding: 5px 10px;
  border-left: 2px solid transparent;
  border-radius: 0 6px 6px 0;
  transition: all .2s;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.toc-link:hover {
  color: var(--dim);
  background: rgba(255,255,255,0.03);
}
.toc-link.active {
  border-left-color: var(--toc-ac);
  color: var(--toc-ac);
  background: rgba(255,255,255,0.04);
}

/* ── Responsive ── */
@media (min-width: 1500px) {
  .toc-nav { display: block; }
  .toc-toggle, .toc-panel { display: none !important; }
}
@media (max-width: 1499px) {
  .toc-nav { display: none; }
}
@media (max-width: 480px) {
  .toc-toggle { right: 16px; bottom: 68px; width: 38px; height: 38px; }
  .toc-panel { right: 16px; bottom: 116px; width: calc(100vw - 32px); max-height: 45vh; }
}
`

export default function TableOfContents({ accentColor, activeTab }: Props) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLElement>(null)

  useInjectCSS('style-toc', CSS)

  // Re-scan sections when tab changes, using MutationObserver for reliability
  useEffect(() => {
    setIsOpen(false)
    setItems([])
    setActiveId('')

    const scan = () => {
      const els = document.querySelectorAll('.doc-sec-title[id]')
      const next: TocItem[] = []
      els.forEach((el) => {
        if (el.id) next.push({ id: el.id, text: el.textContent?.trim() || '' })
      })
      if (next.length > 0) setItems(next)
      return next.length > 0
    }

    // 이미 렌더링된 경우 즉시 반영
    if (scan()) return

    // lazy 로딩 대기: DOM 변경 감지
    const observer = new MutationObserver(() => {
      if (scan()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // 안전장치: 10초 후 옵저버 정리
    const timeout = setTimeout(() => observer.disconnect(), 10_000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [activeTab])

  // Scroll spy
  useEffect(() => {
    if (items.length === 0) return

    const onScroll = () => {
      // 페이지 하단 도달 시 마지막 항목 활성화
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 60
      if (atBottom) {
        setActiveId(items[items.length - 1].id)
        return
      }
      let current = items[0]?.id || ''
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= 100) current = item.id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  // Close panel on outside click
  useEffect(() => {
    if (!isOpen) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (panelRef.current && !panelRef.current.contains(target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [isOpen])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
  }, [])

  if (items.length === 0) return null

  const list = (
    <>
      <div className="toc-label">목차</div>
      <ul className="toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`toc-link${activeId === item.id ? ' active' : ''}`}
            onClick={() => scrollTo(item.id)}
            title={item.text}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div style={{ '--toc-ac': accentColor } as React.CSSProperties}>
      {/* Desktop sidebar */}
      <nav className="toc-nav">{list}</nav>

      {/* Mobile toggle */}
      <button
        className="toc-toggle"
        onClick={(e) => { e.stopPropagation(); setIsOpen((v) => !v) }}
        aria-label="목차"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile panel */}
      <nav ref={panelRef} className={`toc-panel${isOpen ? ' open' : ''}`}>
        {list}
      </nav>
    </div>
  )
}
