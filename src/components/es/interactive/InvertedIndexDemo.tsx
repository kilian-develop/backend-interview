import { useState } from 'react'

type Tab = 'forward' | 'inverted'

export default function InvertedIndexDemo() {
  const [activeTab, setActiveTab] = useState<Tab>('forward')
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null)

  const entries = [
    { term: '삼성', docs: ['문서 1', '문서 4'] },
    { term: '노트북', docs: ['문서 1', '문서 2', '문서 3'], defaultHighlight: true },
    { term: '프로', docs: ['문서 1', '문서 2', '문서 4'] },
    { term: '맥북', docs: ['문서 2'] },
    { term: '그램', docs: ['문서 3'] },
    { term: '버즈', docs: ['문서 4'] },
    { term: '헤드폰', docs: ['문서 5'] },
  ]

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
    borderRadius: '10px 10px 0 0', border: `1px solid ${active ? '#f0c040' : '#1a2234'}`, borderBottom: 'none',
    background: active ? '#0e1118' : 'transparent', color: active ? '#f0c040' : '#5a6a85',
  })

  return (
    <div style={{ margin: '28px 0' }}>
      <div style={{ display: 'flex', gap: 0 }}>
        <button style={tabStyle(activeTab === 'forward')} onClick={() => setActiveTab('forward')}>일반 DB (정방향)</button>
        <button style={tabStyle(activeTab === 'inverted')} onClick={() => setActiveTab('inverted')}>역색인 (Inverted)</button>
      </div>

      <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '0 10px 10px 10px', padding: '24px' }}>
        {activeTab === 'forward' ? (
          <>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
              문서 → 내용 방향으로 저장합니다. 검색하려면 <strong style={{ color: 'var(--text)' }}>모든 문서를 하나씩</strong> 확인해야 합니다.
            </p>
            {[
              { id: '문서 1', content: <>삼성 갤럭시 <Mark>노트북</Mark> 프로</> },
              { id: '문서 2', content: <>애플 맥북 프로 <Mark>노트북</Mark></> },
              { id: '문서 3', content: <>LG 그램 <Mark>노트북</Mark></> },
              { id: '문서 4', content: <>삼성 갤럭시 <strong style={{ color: 'var(--text)' }}>버즈</strong> 프로</> },
              { id: '문서 5', content: <>소니 <strong style={{ color: 'var(--text)' }}>헤드폰</strong> WH-1000XM5</> },
            ].map((row, i, arr) => (
              <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px dashed #1a2234' : 'none' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', padding: '3px 10px', borderRadius: '6px', minWidth: '52px', textAlign: 'center' }}>{row.id}</span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{row.content}</span>
              </div>
            ))}
            <p style={{ fontSize: '13px', color: '#ef4444', marginTop: '16px' }}>
              &ldquo;노트북&rdquo; 검색 → 문서 1부터 5까지 <strong style={{ color: 'var(--text)' }}>전부 확인</strong>해야 합니다
            </p>
          </>
        ) : (
          <>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
              단어 → 문서 방향으로 <strong style={{ color: 'var(--text)' }}>뒤집어</strong> 저장합니다. 단어만 찾으면 <strong style={{ color: 'var(--text)' }}>즉시</strong> 해당 문서를 알 수 있습니다.
            </p>
            <div style={{ display: 'grid', gap: '8px' }}>
              {entries.map((entry, i) => {
                const hl = highlightedIdx === i || (highlightedIdx === null && entry.defaultHighlight)
                return (
                  <div key={entry.term} onMouseEnter={() => setHighlightedIdx(i)} onMouseLeave={() => setHighlightedIdx(null)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'background .2s', background: hl ? 'rgba(240,192,64,0.08)' : 'transparent' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '3px 12px', borderRadius: '6px', minWidth: '64px', textAlign: 'center', fontWeight: 600 }}>{entry.term}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '16px', color: '#5a6a85' }}>→</span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {entry.docs.map((doc) => (
                        <span key={doc} style={{ fontFamily: 'var(--mono)', fontSize: '11px', padding: '3px 10px', borderRadius: '6px', transition: 'all .2s', border: `1px solid ${hl ? '#f0c040' : 'rgba(59,130,246,0.2)'}`, background: hl ? 'rgba(240,192,64,0.1)' : 'rgba(59,130,246,0.06)', color: hl ? '#f0c040' : '#3b82f6' }}>{doc}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{ fontSize: '13px', color: '#22c55e', marginTop: '16px' }}>
              &ldquo;노트북&rdquo; 검색 → 역색인에서 바로 <strong style={{ color: 'var(--text)' }}>[문서 1, 2, 3]</strong> 발견!
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function Mark({ children }: { children: React.ReactNode }) {
  return <span style={{ background: 'rgba(240,192,64,0.15)', color: '#f0c040', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }}>{children}</span>
}
