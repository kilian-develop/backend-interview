interface CheckpointProps { children: React.ReactNode; icon?: string; title?: string }

export default function Checkpoint({ children, icon = '\u2705', title = '체크포인트' }: CheckpointProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderLeft: '3px solid #22c55e', borderRadius: '10px', padding: '16px 18px', margin: '20px 0' }}>
      <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '2px' }}>{icon}</span>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>{children}</div>
      </div>
    </div>
  )
}
