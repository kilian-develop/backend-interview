interface CalloutProps { title: string; children: React.ReactNode }

export function ExplainCallout({ title, children }: CalloutProps) {
  return (
    <div style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)', borderLeft: '3px solid #a855f7', borderRadius: '10px', padding: '16px 18px', margin: '20px 0' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 700, color: '#a855f7', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

export function WarnCallout({ title, children }: CalloutProps) {
  return (
    <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderLeft: '3px solid #f59e0b', borderRadius: '10px', padding: '16px 18px', margin: '20px 0' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 700, color: '#f59e0b', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
