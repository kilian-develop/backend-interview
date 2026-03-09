interface HighlightBoxProps {
  color: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export default function HighlightBox({ color, children, style }: HighlightBoxProps) {
  return (
    <div
      className="doc-highlight"
      style={{
        background: `${color}0F`,
        border: `1px solid ${color}33`,
        borderLeft: `3px solid ${color}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
