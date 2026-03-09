interface QA {
  q: string
  a: string
}

interface InterviewQuestionsProps {
  color: string
  items: QA[]
}

export default function InterviewQuestions({ color, items }: InterviewQuestionsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item) => (
        <div key={item.q} className="doc-qa-item">
          <div className="doc-qa-question" style={{ color }}>Q. {item.q}</div>
          <div className="doc-qa-answer">{item.a}</div>
        </div>
      ))}
    </div>
  )
}
