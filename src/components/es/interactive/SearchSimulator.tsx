import { useState, useRef, useCallback, useEffect } from 'react'

const invertedIndex: Record<string, number[]> = {
  '삼성': [1, 4], '갤럭시': [1, 4], '노트북': [1, 2, 3], '프로': [1, 2, 4],
  '애플': [2], '맥북': [2], 'LG': [3], '그램': [3], '버즈': [4], '소니': [5], '헤드폰': [5],
}
const documents: Record<number, { name: string; desc: string }> = {
  1: { name: '삼성 갤럭시 노트북 프로', desc: '가볍고 강력한 성능의 업무용 노트북' },
  2: { name: '애플 맥북 프로 노트북', desc: '크리에이터를 위한 프리미엄 노트북' },
  3: { name: 'LG 그램 노트북', desc: '초경량 노트북의 대명사' },
  4: { name: '삼성 갤럭시 버즈 프로', desc: '노이즈 캔슬링 무선 이어폰' },
  5: { name: '소니 헤드폰 WH-1000XM5', desc: '최고의 노이즈 캔슬링 헤드폰' },
}

export default function SearchSimulator() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ id: number; name: string; desc: string }[]>([])
  const [steps, setSteps] = useState<string[]>([])
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [visibleResults, setVisibleResults] = useState<number[]>([])
  const [showEmpty, setShowEmpty] = useState(true)
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimeouts = useCallback(() => { timeoutRefs.current.forEach(clearTimeout); timeoutRefs.current = [] }, [])

  const doSearch = useCallback((q: string) => {
    clearTimeouts(); setVisibleSteps([]); setVisibleResults([])
    if (!q) { setResults([]); setSteps([]); setShowEmpty(true); return }
    setShowEmpty(false)
    const matchedTerms = Object.keys(invertedIndex).filter((t) => t.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(t.toLowerCase()))
    const docIds = new Set<number>()
    matchedTerms.forEach((t) => invertedIndex[t].forEach((id) => docIds.add(id)))
    const ns: string[] = []
    if (matchedTerms.length > 0) {
      ns.push(`역색인에서 "${q}"와 매칭되는 토큰 검색`)
      ns.push(`매칭된 토큰: ${matchedTerms.join(', ')}`)
      ns.push(`해당 문서 ID 목록: [${[...docIds].sort().map((id) => '문서 ' + id).join(', ')}]`)
      ns.push(`결과: ${docIds.size}건 찾음 — 전체 ${Object.keys(documents).length}건 중 ${docIds.size}건만 조회`)
    } else { ns.push(`역색인에서 "${q}"와 매칭되는 토큰 없음`); ns.push('결과: 0건') }
    setSteps(ns)
    ns.forEach((_, i) => { timeoutRefs.current.push(setTimeout(() => setVisibleSteps((p) => [...p, i]), i * 150)) })
    const sorted = [...docIds].sort()
    setResults(sorted.map((id) => ({ id, ...documents[id] })))
    sorted.forEach((_, i) => { timeoutRefs.current.push(setTimeout(() => setVisibleResults((p) => [...p, i]), i * 100 + 300)) })
  }, [clearTimeouts])

  const handleInput = useCallback((v: string) => {
    setQuery(v)
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => doSearch(v.trim()), 200)
  }, [doSearch])

  useEffect(() => () => { clearTimeouts(); if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current) }, [clearTimeouts])

  function hl(text: string, q: string): React.ReactNode {
    const terms = Object.keys(invertedIndex).filter((t) => t.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(t.toLowerCase()))
    if (!terms.length) return text
    const regex = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    return text.split(regex).map((p, i) => regex.test(p) ? <span key={i} style={{ background: 'rgba(240,192,64,0.2)', color: '#f0c040', padding: '0 2px', borderRadius: '2px' }}>{p}</span> : <span key={i}>{p}</span>)
  }

  return (
    <div style={{ margin: '28px 0', background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', overflow: 'hidden' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid #1a2234' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#5a6a85' }}>&#x1F50D;</span>
          <input type="text" value={query} onChange={(e) => handleInput(e.target.value)} placeholder="검색어를 입력하세요 (예: 노트북, 삼성, 프로)"
            style={{ width: '100%', background: '#0a0d14', border: '1px solid #1a2234', borderRadius: '10px', padding: '12px 14px 12px 36px', color: 'var(--text)', fontSize: '14px', fontFamily: 'var(--sans)', outline: 'none' }} />
        </div>
      </div>
      <div style={{ padding: '22px', minHeight: '180px' }}>
        {showEmpty && <div style={{ textAlign: 'center', padding: '32px 0', color: '#5a6a85', fontSize: '13px' }}>위 검색창에 단어를 입력해보세요</div>}
        {!showEmpty && (
          <>
            {results.length === 0 && steps.length > 0 && <div style={{ textAlign: 'center', padding: '16px', color: '#5a6a85' }}>매칭되는 문서가 없습니다</div>}
            {results.map((r, i) => (
              <div key={r.id} style={{ padding: '14px', borderRadius: '10px', marginBottom: '8px', background: '#0a0d14', border: `1px solid ${visibleResults.includes(i) ? 'rgba(34,197,94,0.25)' : 'transparent'}`, transition: 'all .3s', opacity: visibleResults.includes(i) ? 1 : 0, transform: visibleResults.includes(i) ? 'translateY(0)' : 'translateY(8px)' }}>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{hl(r.name, query)}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{hl(r.desc, query)}</div>
              </div>
            ))}
            {steps.length > 0 && (
              <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(59,130,246,0.04)', borderRadius: '10px', border: '1px dashed rgba(59,130,246,0.2)' }}>
                {steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '6px 0', fontSize: '13px', color: '#94a3b8', transition: 'all .3s', opacity: visibleSteps.includes(i) ? 1 : 0, transform: visibleSteps.includes(i) ? 'translateX(0)' : 'translateX(-8px)' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.12)', color: '#3b82f6', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
