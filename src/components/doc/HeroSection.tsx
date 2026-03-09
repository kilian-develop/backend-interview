interface HeroSectionProps {
  tag: string
  title: React.ReactNode
  description: React.ReactNode
}

export default function HeroSection({ tag, title, description }: HeroSectionProps) {
  return (
    <div className="doc-hero">
      <p className="doc-hero-tag">{tag}</p>
      <h1>{title}</h1>
      <p className="doc-hero-desc">{description}</p>
    </div>
  )
}
