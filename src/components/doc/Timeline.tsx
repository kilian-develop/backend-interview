import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.tl-flow { border:1px solid #1a2234; border-radius:14px; overflow:hidden; margin-bottom:20px; }
.tl-flow-title { padding:12px 16px; background:#0a0e17; font-size:13px; font-weight:800; display:flex; align-items:center; gap:8px; border-bottom:1px solid #1a2234; }
.tl-flow-header { display:grid; grid-template-columns:44px 1fr 1fr; background:#0a0e17; border-bottom:1px solid #1a2234; }
.tl-flow-header span { padding:8px 12px; font-size:10px; font-weight:700; text-align:center; letter-spacing:0.5px; text-transform:uppercase; }
.tl-flow-row { display:grid; grid-template-columns:44px 1fr 1fr; border-bottom:1px solid rgba(26,34,52,0.3); position:relative; }
.tl-flow-row:last-child { border-bottom:none; }
.tl-flow-time { padding:8px 6px; font-size:10px; color:#5a6a85; text-align:center; font-family:'JetBrains Mono',monospace; font-weight:700; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.01); border-right:1px solid rgba(26,34,52,0.3); }
.tl-flow-cell { padding:8px 12px; font-size:11px; color:#94a3b8; font-family:'JetBrains Mono',monospace; line-height:1.6; display:flex; align-items:center; min-height:36px; }
.tl-flow-cell:first-of-type { border-right:1px solid rgba(26,34,52,0.15); }
.tl-flow-cell.danger { background:rgba(239,68,68,0.06); }
.tl-flow-cell.warn { background:rgba(245,158,11,0.06); }
.tl-flow-cell.ok { background:rgba(34,197,94,0.06); }
.tl-flow-result { display:flex; align-items:center; gap:8px; padding:10px 16px; font-size:11px; font-weight:700; border-top:1px solid #1a2234; line-height:1.7; }
@keyframes tl-row-in { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
@keyframes tl-db-pop { 0% { transform:scale(1); } 40% { transform:scale(1.25); } 100% { transform:scale(1); } }
@keyframes tl-danger-pulse { 0%,100% { box-shadow:inset 0 0 0 rgba(239,68,68,0); } 50% { box-shadow:inset 0 0 24px rgba(239,68,68,0.08); } }
@keyframes tl-result-in { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
@keyframes tl-wait-blink { 0%,100% { opacity:1; } 50% { opacity:.5; } }
.tl-ctrl { display:flex; align-items:center; gap:8px; padding:8px 16px; border-bottom:1px solid #1a2234; background:rgba(10,14,23,0.6); flex-wrap:wrap; }
.tl-btn { padding:5px 14px; border-radius:8px; font-size:11px; font-weight:700; border:none; cursor:pointer; font-family:'JetBrains Mono',monospace; transition:all .15s; }
.tl-btn:hover { filter:brightness(1.2); transform:translateY(-1px); }
.tl-btn:active { transform:translateY(0); }
.tl-db { margin-left:auto; display:flex; align-items:center; gap:8px; font-size:11px; font-family:'JetBrains Mono',monospace; }
.tl-db-val { padding:3px 10px; border-radius:6px; font-weight:800; display:inline-block; }
.tl-db-pop { animation:tl-db-pop .4s ease; }
.tl-dots { display:flex; gap:4px; align-items:center; }
.tl-dot { width:6px; height:6px; border-radius:50%; transition:all .3s; }
.tl-enter { animation:tl-row-in .35s ease-out; }
.tl-danger-pulse { animation:tl-danger-pulse 1s ease infinite; }
.tl-result-enter { animation:tl-result-in .4s ease-out; }
.tl-indicator { position:absolute; left:0; top:0; bottom:0; width:2.5px; border-radius:0 2px 2px 0; z-index:1; }
.tl-placeholder { display:flex; align-items:center; justify-content:center; padding:32px; color:#334155; font-size:12px; font-family:'JetBrains Mono',monospace; gap:8px; user-select:none; }
.tl-wait { animation:tl-wait-blink 1.5s ease infinite; }
`

export interface TimelineStep {
  time: string
  tx1?: ReactNode
  tx2?: ReactNode
  tx1Type?: 'danger' | 'warn' | 'ok'
  tx2Type?: 'danger' | 'warn' | 'ok'
  dbValue?: string
}

export default function Timeline({ icon, title, color, subtitle, tx1Label, tx2Label, steps, result, resultColor, dbLabel, dbInitial }: {
  icon: string; title: string; color: string; subtitle: string
  tx1Label: string; tx2Label: string; steps: TimelineStep[]
  result: ReactNode; resultColor: string; dbLabel: string; dbInitial: string
}) {
  useInjectCSS('style-shared-timeline', CSS)

  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [dbVal, setDbVal] = useState(dbInitial)
  const [dbPop, setDbPop] = useState(false)
  const done = step >= steps.length - 1

  useEffect(() => {
    if (!playing || done) { if (done) setPlaying(false); return }
    const t = setTimeout(() => setStep(s => s + 1), 1200)
    return () => clearTimeout(t)
  }, [playing, step, done, steps.length])

  useEffect(() => {
    if (step >= 0 && step < steps.length && steps[step].dbValue) {
      setDbVal(steps[step].dbValue!)
      setDbPop(true)
      const t = setTimeout(() => setDbPop(false), 400)
      return () => clearTimeout(t)
    }
  }, [step, steps])

  const play = useCallback(() => {
    setDbVal(dbInitial); setDbPop(false); setStep(0); setPlaying(true)
  }, [dbInitial])

  const reset = useCallback(() => {
    setStep(-1); setPlaying(false); setDbVal(dbInitial)
  }, [dbInitial])

  const advance = useCallback(() => { if (!done) setStep(s => s + 1) }, [done])

  const cellCls = (t?: string) => `tl-flow-cell${t === 'danger' ? ' danger' : t === 'warn' ? ' warn' : t === 'ok' ? ' ok' : ''}`
  const hasDanger = (s: TimelineStep) => s.tx1Type === 'danger' || s.tx2Type === 'danger'

  return (
    <div className="tl-flow">
      <div className="tl-flow-title">
        <span style={{ color }}>{icon}</span>
        <span style={{ color }}>{title}</span>
        <span style={{ fontSize: '10px', color: '#5a6a85', marginLeft: 'auto' }}>{subtitle}</span>
      </div>

      <div className="tl-ctrl">
        {!playing && !done && (
          <button className="tl-btn" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }} onClick={play}>▶ 재생</button>
        )}
        {playing && (
          <button className="tl-btn" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }} onClick={() => setPlaying(false)}>⏸ 일시정지</button>
        )}
        {!playing && step >= 0 && !done && (
          <button className="tl-btn" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }} onClick={advance}>다음 →</button>
        )}
        {done && (
          <button className="tl-btn" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }} onClick={play}>↺ 다시 재생</button>
        )}
        {step >= 0 && (
          <button className="tl-btn" style={{ background: 'rgba(100,116,139,0.08)', color: '#64748b' }} onClick={reset}>초기화</button>
        )}

        <div className="tl-dots">
          {steps.map((_, i) => (
            <div key={i} className="tl-dot" style={{
              background: i < step ? '#3b82f6' : i === step ? '#06b6d4' : '#1a2234',
              boxShadow: i === step ? '0 0 6px rgba(6,182,212,0.6)' : 'none',
            }} />
          ))}
        </div>

        <div className="tl-db">
          <span style={{ color: '#5a6a85' }}>{dbLabel}:</span>
          <span className={`tl-db-val${dbPop ? ' tl-db-pop' : ''}`} style={{ background: `${color}18`, color }}>{dbVal}</span>
        </div>
      </div>

      <div className="tl-flow-header">
        <span style={{ color: '#5a6a85' }}>시간</span>
        <span style={{ color: '#3b82f6' }}>{tx1Label}</span>
        <span style={{ color: '#a855f7' }}>{tx2Label}</span>
      </div>

      {step === -1 && (
        <div className="tl-placeholder">▶ 재생을 눌러 흐름을 확인하세요</div>
      )}

      {steps.slice(0, step + 1).map((s, i) => {
        const active = i === step
        return (
          <div key={i} className={`tl-flow-row${active ? ' tl-enter' : ''}${active && hasDanger(s) ? ' tl-danger-pulse' : ''}`}>
            {active && <div className="tl-indicator" style={{ background: hasDanger(s) ? '#ef4444' : color }} />}
            <div className="tl-flow-time">{s.time}</div>
            <div className={cellCls(s.tx1Type)}>{s.tx1}</div>
            <div className={cellCls(s.tx2Type)}>{s.tx2}</div>
          </div>
        )
      })}

      {done && (
        <div className="tl-flow-result tl-result-enter" style={{ background: `${resultColor}0a`, color: resultColor }}>
          {result}
        </div>
      )}
    </div>
  )
}

export function TimelineWait({ children }: { children: ReactNode }) {
  return <span className="tl-wait">{children}</span>
}
