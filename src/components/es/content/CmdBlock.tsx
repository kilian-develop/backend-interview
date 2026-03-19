import { useState, useCallback } from 'react'

/* ── 기존 사이트 CodeBlock과 동일한 디자인 토큰 ── */
const S = {
  wrap: { background: '#0a0d14', border: '1px solid #1a2234', borderRadius: '10px', margin: '16px 0', overflow: 'hidden' } as const,
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', height: '38px', background: '#0f1219', borderBottom: '1px solid #1a2234' } as const,
  label: { fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#5a6a85' } as const,
  copy: (copied: boolean) => ({
    fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'all .2s', border: 'none',
    background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
    color: copied ? '#22c55e' : '#5a6a85',
  }) as const,
  body: { padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: '13px', lineHeight: 1.8, color: '#94a3b8', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' } as const,
}

interface CmdBlockProps { label: string; copyText: string; children: React.ReactNode }

export default function CmdBlock({ label, copyText, children }: CmdBlockProps) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(copyText).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }, [copyText])

  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <span style={S.label}>{label}</span>
        <button onClick={handleCopy} style={S.copy(copied)}>{copied ? 'COPIED' : 'COPY'}</button>
      </div>
      <div style={S.body as React.CSSProperties}>{children}</div>
    </div>
  )
}

/* Syntax highlight helpers — ES 쿼리 색상 */
export function Kw({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#c084fc', fontWeight: 500 }}>{children}</span>
}
export function Url({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#67e8f9' }}>{children}</span>
}
export function JKey({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#60a5fa' }}>{children}</span>
}
export function JStr({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#4ade80' }}>{children}</span>
}
export function JVal({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#fb923c' }}>{children}</span>
}
export function Cm({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#475569', fontStyle: 'italic' }}>{children}</span>
}
