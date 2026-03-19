/* ── 기존 doc-shared.css의 doc-wrap / doc-section 패턴과 동일 ── */

export function SectionLabel({ children, lab }: { children: React.ReactNode; lab?: boolean }) {
  return (
    <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', color: lab ? '#22c55e' : '#f0c040' }}>
      {children}
    </div>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ position: 'relative', fontSize: '17px', fontWeight: 700, color: '#cbd5e1', marginBottom: '24px', paddingLeft: '14px', lineHeight: 1.5 }}>
      <span style={{ position: 'absolute', left: 0, top: '2px', width: '4px', height: '18px', borderRadius: '2px', background: 'linear-gradient(to bottom, #f0c040, #f59e0b)' }} />
      {children}
    </h2>
  )
}

export function Section({ children }: { children: React.ReactNode }) {
  return <section className="es-content" style={{ maxWidth: '1080px', margin: '0 auto', padding: '48px 22px' }}>{children}</section>
}

export function LabSection({ children }: { children: React.ReactNode }) {
  return <section className="es-content" style={{ maxWidth: '1080px', margin: '0 auto', padding: '32px 22px 48px' }}>{children}</section>
}

export function SectionDivider() {
  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 22px' }}>
      <hr style={{ border: 'none', height: '1px', background: 'linear-gradient(to right, transparent, #1a2234, transparent)' }} />
    </div>
  )
}
