type TagType = 'terminal' | 'kibana' | 'browser' | 'java' | 'gradle' | 'spring' | 'yaml' | 'docker'

const TAG_COLORS: Record<TagType, string> = {
  terminal: '#3b82f6', kibana: '#f59e0b', browser: '#a855f7',
  java: '#ef4444', gradle: '#22c55e', spring: '#22c55e',
  yaml: '#06b6d4', docker: '#3b82f6',
}
const TAG_LABELS: Record<TagType, string> = {
  terminal: 'Terminal', kibana: 'Kibana', browser: 'Browser',
  java: 'Java', gradle: 'Gradle', spring: 'Spring',
  yaml: 'YAML', docker: 'Docker',
}

interface LabStepProps { num: number; title: string; tags?: TagType[]; children: React.ReactNode }

export default function LabStep({ num, title, tags = [], children }: LabStepProps) {
  return (
    <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', marginBottom: '24px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 22px', borderBottom: '1px solid #1a2234' }}>
        <span style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34,197,94,0.12)', color: '#22c55e', fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
          {num}
        </span>
        <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', flex: 1 }}>{title}</span>
        {tags.map((tag) => (
          <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', border: `1px solid ${TAG_COLORS[tag]}33`, background: `${TAG_COLORS[tag]}15`, color: TAG_COLORS[tag] }}>
            {TAG_LABELS[tag]}
          </span>
        ))}
      </div>
      <div style={{ padding: '22px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
