import type { ReactNode } from 'react'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.sbs-container { display:flex; flex-direction:column; gap:0; margin:12px 0 20px; border:1px solid #1a2234; border-radius:12px; overflow:hidden; background:#0a0e17; }
.sbs-head { display:flex; align-items:center; gap:8px; padding:10px 16px; border-bottom:1px solid #1a2234; font-size:11px; font-weight:700; color:#5a6a85; }
.sbs-step { display:flex; gap:12px; padding:12px 16px; border-bottom:1px solid rgba(26,34,52,0.3); align-items:flex-start; }
.sbs-step:last-child { border-bottom:none; }
.sbs-num { flex-shrink:0; width:22px; height:22px; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-top:2px; }
.sbs-body { font-size:12px; color:#94a3b8; line-height:1.8; }
.sbs-key { font-size:11px; font-weight:700; display:inline; }
`

export interface StepItem {
  color: string
  content: ReactNode
}

export function StepKey({ color, children }: { color: string; children: ReactNode }) {
  return <span className="sbs-key" style={{ color }}>{children}</span>
}

export default function StepByStep({ title, steps }: { title: string; steps: StepItem[] }) {
  useInjectCSS('style-shared-step-by-step', CSS)

  return (
    <div className="sbs-container">
      <div className="sbs-head">{title}</div>
      {steps.map((s, i) => (
        <div key={i} className="sbs-step">
          <div className="sbs-num" style={{ background: `${s.color}26`, color: s.color }}>{i + 1}</div>
          <div className="sbs-body">{s.content}</div>
        </div>
      ))}
    </div>
  )
}
