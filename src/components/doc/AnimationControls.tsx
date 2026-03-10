import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.ac-play { border-color:var(--ac-color); color:var(--ac-color); }
.ac-play:hover { background:color-mix(in srgb, var(--ac-color) 12%, transparent); }
.ac-reset { border-color:#5a6a85; color:#5a6a85; }
.ac-reset:hover { background:rgba(255,255,255,0.04); }
`

interface AnimationControlsProps {
  color: string
  status: { msg: string; color: string }
  onPlay: () => void
  onReset: () => void
}

export default function AnimationControls({ color, status, onPlay, onReset }: AnimationControlsProps) {
  useInjectCSS('style-animation-controls', CSS)

  return (
    <>
      <div className="doc-status-bar" style={{ color: status.color }}>{status.msg}</div>
      <div className="doc-btn-row" style={{ '--ac-color': color } as React.CSSProperties}>
        <button className="doc-btn ac-play" onClick={onPlay}>▶ 재생</button>
        <button className="doc-btn ac-reset" onClick={onReset}>↺ 초기화</button>
      </div>
    </>
  )
}
