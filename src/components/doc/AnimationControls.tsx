interface AnimationControlsProps {
  color: string
  status: { msg: string; color: string }
  onPlay: () => void
  onReset: () => void
}

export default function AnimationControls({ color, status, onPlay, onReset }: AnimationControlsProps) {
  return (
    <>
      <div className="doc-status-bar" style={{ color: status.color }}>{status.msg}</div>
      <div className="doc-btn-row">
        <button
          className="doc-btn"
          style={{ borderColor: color, color }}
          onClick={onPlay}
          onMouseOver={(e) => { e.currentTarget.style.background = `${color}1F` }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          ▶ 재생
        </button>
        <button
          className="doc-btn"
          style={{ borderColor: '#5a6a85', color: '#5a6a85' }}
          onClick={onReset}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          ↺ 초기화
        </button>
      </div>
    </>
  )
}
