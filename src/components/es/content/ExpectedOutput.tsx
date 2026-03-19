interface ExpectedOutputProps { label?: string; children: React.ReactNode }

export default function ExpectedOutput({ label = 'EXPECTED OUTPUT', children }: ExpectedOutputProps) {
  return (
    <div style={{ background: '#0a0d14', border: '1px dashed rgba(59,130,246,0.25)', borderRadius: '10px', margin: '16px 0', overflow: 'hidden' }}>
      <div style={{ padding: '0 14px', height: '32px', display: 'flex', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#3b82f6', borderBottom: '1px dashed rgba(59,130,246,0.15)' }}>
        {label}
      </div>
      <div style={{ padding: '14px 18px', fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.8, color: '#64748b', overflowX: 'auto', whiteSpace: 'pre' }}>
        {children}
      </div>
    </div>
  )
}

export function Hl({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#f0c040', fontWeight: 600 }}>{children}</span>
}
