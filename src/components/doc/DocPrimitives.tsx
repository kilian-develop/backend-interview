import type { ReactNode, CSSProperties } from 'react'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.dp-grid { display:grid; gap:16px; }
.dp-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.dp-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.dp-card-title { font-size:15px; font-weight:800; margin-bottom:6px; }
.dp-card-body { font-size:12px; color:#94a3b8; line-height:1.8; }
.dp-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.dp-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.dp-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.dp-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.dp-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.dp-table { width:100%; border-collapse:collapse; font-size:12px; }
.dp-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.dp-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.dp-table tr:last-child td { border-bottom:none; }
`

function useDocCSS() {
  useInjectCSS('style-shared-doc-primitives', CSS)
}

/* ─── Grid ─── */

export function DocGrid({ children, minWidth = 260, gap = 16, style }: {
  children: ReactNode; minWidth?: number; gap?: number; style?: CSSProperties
}) {
  useDocCSS()
  return (
    <div className="dp-grid" style={{ gridTemplateColumns: `repeat(auto-fit,minmax(${minWidth}px,1fr))`, gap, ...style }}>
      {children}
    </div>
  )
}

/* ─── Card ─── */

export function DocCard({ title, titleColor, children, style }: {
  title?: string; titleColor?: string; children: ReactNode; style?: CSSProperties
}) {
  useDocCSS()
  return (
    <div className="dp-card" style={style}>
      {title && <div className="dp-card-title" style={{ color: titleColor }}>{title}</div>}
      <div className="dp-card-body">{children}</div>
    </div>
  )
}

/* ─── Section Box ─── */

export function SectionBox({ subtitle, subtitleColor, children, style }: {
  subtitle?: string; subtitleColor?: string; children: ReactNode; style?: CSSProperties
}) {
  useDocCSS()
  return (
    <div className="dp-section-box" style={style}>
      {subtitle && (
        <div className="dp-section-subtitle">
          <span style={{ color: subtitleColor }}>{subtitle}</span>
        </div>
      )}
      {children}
    </div>
  )
}

/* ─── Feature Row ─── */

export function FeatureRow({ icon, children }: { icon: string; children: ReactNode }) {
  useDocCSS()
  return (
    <div className="dp-feature-row">
      <span className="dp-feature-icon">{icon}</span>
      <span>{children}</span>
    </div>
  )
}

/* ─── Table ─── */

export function DocTable({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  useDocCSS()
  return (
    <div className="dp-table-wrap" style={style}>
      <table className="dp-table">
        {children}
      </table>
    </div>
  )
}
