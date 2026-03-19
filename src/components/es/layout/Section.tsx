/* ── 기존 doc-shared.css의 doc-wrap / doc-section 패턴과 동일 ── */

export function SectionLabel({ children, lab }: { children: React.ReactNode; lab?: boolean }) {
  return (
    <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', color: lab ? '#22c55e' : '#f0c040' }}>
      {children}
    </div>
  )
}

/* children에서 텍스트만 추출 (br 등 JSX 무시) */
function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as React.ReactElement).props.children)
  }
  return ''
}

let sectionCounter = 0

export function SectionTitle({ children }: { children: React.ReactNode }) {
  const text = extractText(children).trim()
  const id = text
    ? text.replace(/[^a-zA-Z0-9가-힣\s]/g, '').replace(/\s+/g, '-').toLowerCase()
    : `es-sec-${++sectionCounter}`

  return (
    <h2
      id={id}
      className="doc-sec-title"
      style={{ '--sec-gradient': 'linear-gradient(to bottom, #f0c040, #f59e0b)' } as React.CSSProperties}
    >
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
