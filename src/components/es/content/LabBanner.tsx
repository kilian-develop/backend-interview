interface LabBannerProps { icon: string; title: string; children: React.ReactNode }

export default function LabBanner({ icon, title, children }: LabBannerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#0e1118', border: '1px solid #1a2234', borderTop: '3px solid #22c55e', borderRadius: '14px', padding: '22px 24px', marginBottom: '32px' }}>
      <span style={{ fontSize: '36px', flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#22c55e', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7 }}>{children}</div>
      </div>
    </div>
  )
}
