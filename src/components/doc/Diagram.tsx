import { useInjectCSS } from '../../hooks/useInjectCSS'
import type { CSSProperties, ReactNode } from 'react'

const DIAGRAM_CSS = `
.dg-container { background:#080b11; border:1px solid #1a2234; border-radius:12px; padding:24px 20px; overflow-x:auto; }
.dg-title { font-size:11px; font-weight:700; color:#5a6a85; font-family:var(--mono); margin-bottom:16px; text-transform:uppercase; letter-spacing:0.5px; }

/* Flow */
.dg-flow { display:flex; align-items:center; gap:2px; flex-wrap:nowrap; justify-content:center; }
.dg-flow.vertical { flex-direction:column; }
.dg-flow.wrap { flex-wrap:wrap; gap:8px; }

/* Node */
.dg-node { display:flex; flex-direction:column; align-items:center; gap:4px; padding:12px 16px; border-radius:10px; border:1.5px solid #334155; background:#0f172a; min-width:80px; text-align:center; transition:all .3s; animation:dg-fadeIn .5s ease both; }
.dg-node:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,0.3); }
.dg-node-icon { font-size:20px; line-height:1; }
.dg-node-label { font-size:11px; font-weight:700; color:#e2e8f0; font-family:var(--mono); line-height:1.4; }
.dg-node-sub { font-size:9px; color:#64748b; font-family:var(--mono); line-height:1.3; }

/* Arrow — horizontal: column (label top, line bottom) / vertical: row (line left, label right) */
.dg-arrow { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; padding:0 4px; flex-shrink:0; animation:dg-fadeIn .5s ease both; }
.dg-arrow-line { height:2px; min-width:28px; position:relative; overflow:visible; align-self:stretch; }
.dg-arrow-line::after { content:''; position:absolute; right:-1px; top:50%; transform:translateY(-50%); width:0; height:0; border-left:6px solid currentColor; border-top:4px solid transparent; border-bottom:4px solid transparent; }
.dg-arrow.animated .dg-arrow-line::before { content:''; position:absolute; top:-1px; left:0; width:8px; height:4px; border-radius:2px; background:currentColor; opacity:0.8; animation:dg-arrowPulse 1.5s ease-in-out infinite; }
.dg-arrow-label { font-size:9px; color:#94a3b8; font-family:var(--mono); white-space:nowrap; line-height:1; }
.dg-arrow.vertical { flex-direction:row; padding:4px 0; gap:6px; align-items:center; }
.dg-arrow.vertical .dg-arrow-line { width:2px; height:28px; min-width:unset; align-self:auto; order:-1; }
.dg-arrow.vertical .dg-arrow-line::after { right:unset; bottom:-1px; top:unset; left:50%; transform:translateX(-50%); border-left:4px solid transparent; border-right:4px solid transparent; border-top:6px solid currentColor; border-bottom:none; }
.dg-arrow.vertical.animated .dg-arrow-line::before { top:unset; left:-1px; width:4px; height:8px; animation:dg-arrowPulseV 1.5s ease-in-out infinite; }
.dg-arrow.dashed .dg-arrow-line { border-top:2px dashed currentColor; height:0; background:none; }
.dg-arrow.dashed.vertical .dg-arrow-line { border-top:none; border-left:2px dashed currentColor; width:0; height:28px; }

/* Group */
.dg-group { border:1.5px solid #334155; border-radius:12px; padding:16px 14px 12px; position:relative; background:rgba(15,23,42,0.5); }
.dg-group-label { position:absolute; top:-9px; left:14px; padding:0 8px; font-size:10px; font-weight:700; font-family:var(--mono); letter-spacing:0.3px; background:#080b11; }

/* Sequence */
.dg-seq { display:flex; flex-direction:column; gap:0; position:relative; }
.dg-seq-participants { display:flex; justify-content:space-around; gap:16px; margin-bottom:8px; }
.dg-seq-actor { display:flex; flex-direction:column; align-items:center; gap:4px; min-width:80px; z-index:2; }
.dg-seq-actor-box { padding:8px 14px; border-radius:8px; border:1.5px solid #334155; background:#0f172a; font-size:11px; font-weight:700; color:#e2e8f0; font-family:var(--mono); text-align:center; }
.dg-seq-actor-line { width:2px; background:#1e293b; position:absolute; top:40px; bottom:0; z-index:0; }
.dg-seq-messages { display:flex; flex-direction:column; gap:6px; padding:8px 0; position:relative; z-index:1; }
.dg-seq-msg { display:flex; align-items:center; gap:0; padding:4px 0; animation:dg-slideIn .4s ease both; }
.dg-seq-msg-line { flex:1; height:2px; position:relative; }
.dg-seq-msg-line.dashed { border-top:2px dashed; height:0; background:none; }
.dg-seq-msg-label { font-size:10px; font-family:var(--mono); color:#94a3b8; white-space:nowrap; padding:2px 8px; background:#080b11; border-radius:4px; position:absolute; top:-12px; left:50%; transform:translateX(-50%); }
.dg-seq-msg-arrow { width:0; height:0; border-top:5px solid transparent; border-bottom:5px solid transparent; flex-shrink:0; }
.dg-seq-note { padding:8px 12px; border-radius:6px; border:1px solid #334155; background:#0f172a; font-size:10px; color:#94a3b8; font-family:var(--mono); text-align:center; margin:4px auto; max-width:80%; line-height:1.4; }
.dg-seq-rect { border:1px solid rgba(100,100,100,0.2); border-radius:8px; padding:8px 4px; margin:4px 0; }

/* Grid layout for side-by-side */
.dg-grid { display:grid; gap:16px; }
.dg-grid-2 { grid-template-columns:1fr 1fr; }
.dg-grid-3 { grid-template-columns:1fr 1fr 1fr; }
@media (max-width:640px) { .dg-grid-2, .dg-grid-3 { grid-template-columns:1fr; } }

/* Badge */
.dg-badge { display:inline-block; padding:2px 8px; border-radius:4px; font-size:9px; font-weight:700; font-family:var(--mono); }

/* Animations */
@keyframes dg-fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
@keyframes dg-slideIn { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
@keyframes dg-arrowPulse { 0%,100% { left:0; opacity:0; } 50% { left:calc(100% - 8px); opacity:0.8; } }
@keyframes dg-arrowPulseV { 0%,100% { top:0; opacity:0; } 50% { top:calc(100% - 8px); opacity:0.8; } }
@keyframes dg-pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }

@media (max-width:768px) {
  .dg-node { padding:10px 12px; min-width:70px; }
  .dg-node-icon { font-size:16px; }
  .dg-arrow-line { min-width:22px; }
  .dg-group { padding:12px 10px 10px; }
  .dg-group-label { font-size:9px; }
}
@media (max-width:480px) {
  .dg-container { padding:14px 10px; }
  .dg-node { padding:8px 8px; min-width:56px; }
  .dg-node-label { font-size:9px; }
  .dg-node-sub { font-size:8px; }
  .dg-node-icon { font-size:14px; }
  .dg-arrow-line { min-width:14px; }
  .dg-arrow-label { font-size:8px; }
  .dg-group { padding:10px 8px 8px; }
  .dg-group-label { font-size:8px; top:-7px; }
  .dg-seq-actor-box { padding:6px 10px; font-size:10px; }
  .dg-flow { gap:1px; }
}
`

/* ─── Building Blocks ─── */

export function DiagramContainer({ title, children, style }: { title?: string; children: ReactNode; style?: CSSProperties }) {
  useInjectCSS('style-diagram-shared', DIAGRAM_CSS)
  return (
    <div className="dg-container" style={style}>
      {title && <div className="dg-title">{title}</div>}
      {children}
    </div>
  )
}

export function DiagramNode({ icon, label, sub, color = '#334155', style, children }: {
  icon?: string; label: string; sub?: string; color?: string; style?: CSSProperties; children?: ReactNode
}) {
  return (
    <div className="dg-node" style={{ borderColor: color, ...style }}>
      {icon && <span className="dg-node-icon">{icon}</span>}
      <span className="dg-node-label">{label}</span>
      {sub && <span className="dg-node-sub">{sub}</span>}
      {children}
    </div>
  )
}

export function DiagramArrow({ label, color = '#475569', vertical, dashed, animated = true, length, style }: {
  label?: string; color?: string; vertical?: boolean; dashed?: boolean; animated?: boolean; length?: number; style?: CSSProperties
}) {
  const cls = `dg-arrow${vertical ? ' vertical' : ''}${dashed ? ' dashed' : ''}${animated ? ' animated' : ''}`
  const lineStyle: CSSProperties = { background: dashed ? 'none' : color, color, ...(length ? (vertical ? { height: length } : { minWidth: length }) : {}) }
  return (
    <div className={cls} style={{ color, ...style }}>
      {label && <span className="dg-arrow-label">{label}</span>}
      <div className="dg-arrow-line" style={lineStyle} />
    </div>
  )
}

export function DiagramGroup({ label, color = '#334155', children, style }: {
  label?: string; color?: string; children: ReactNode; style?: CSSProperties
}) {
  return (
    <div className="dg-group" style={{ borderColor: color, ...style }}>
      {label && <span className="dg-group-label" style={{ color }}>{label}</span>}
      {children}
    </div>
  )
}

export function DiagramFlow({ vertical, wrap, children, style }: {
  vertical?: boolean; wrap?: boolean; children: ReactNode; style?: CSSProperties
}) {
  return (
    <div className={`dg-flow${vertical ? ' vertical' : ''}${wrap ? ' wrap' : ''}`} style={style}>
      {children}
    </div>
  )
}

export function DiagramGrid({ cols = 2, children, style }: {
  cols?: 2 | 3; children: ReactNode; style?: CSSProperties
}) {
  return <div className={`dg-grid dg-grid-${cols}`} style={style}>{children}</div>
}

export function DiagramBadge({ color, children }: { color: string; children: ReactNode }) {
  return <span className="dg-badge" style={{ background: `${color}22`, color }}>{children}</span>
}
