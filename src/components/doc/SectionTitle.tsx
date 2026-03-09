interface SectionTitleProps {
  children: React.ReactNode
  gradient?: [string, string]
}

export default function SectionTitle({ children, gradient }: SectionTitleProps) {
  const style = gradient
    ? { '--sec-gradient': `linear-gradient(to bottom, ${gradient[0]}, ${gradient[1]})` } as React.CSSProperties
    : undefined

  return (
    <div className="doc-sec-title" style={style}>
      {children}
    </div>
  )
}
