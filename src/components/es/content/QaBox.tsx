import { useState, useRef, useCallback } from 'react'

interface QaBoxProps { question: string; children: React.ReactNode }

export default function QaBox({ question, children }: QaBoxProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => {
    if (!wrapperRef.current) return
    wrapperRef.current.style.maxHeight = open ? '0px' : `${wrapperRef.current.scrollHeight}px`
    setOpen((v) => !v)
  }, [open])

  return (
    <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', margin: '20px 0', overflow: 'hidden' }}>
      <button
        onClick={toggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'rgba(6,182,212,0.04)', border: 'none', borderBottom: '1px solid #1a2234', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,182,212,0.12)', color: '#06b6d4', fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>Q</span>
        <span style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: '#06b6d4' }}>{question}</span>
        <span style={{ fontSize: '14px', color: '#5a6a85', transition: 'transform .3s', transform: open ? 'rotate(180deg)' : 'none' }}>&#x25BC;</span>
      </button>
      <div ref={wrapperRef} style={{ overflow: 'hidden', transition: 'max-height .35s ease', maxHeight: '0px' }}>
        <div style={{ padding: '18px 20px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>{children}</div>
      </div>
    </div>
  )
}
