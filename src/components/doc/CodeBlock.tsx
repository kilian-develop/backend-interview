import { useInjectCSS } from '../../hooks/useInjectCSS'
import type { CSSProperties, ReactNode } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import '../../lib/prism-languages'

const CODE_BLOCK_CSS = `
.cb-wrapper { margin:12px 0; border-radius:10px; overflow:hidden; border:1px solid #1a2234; background:#0a0d14; }
.cb-header { display:flex; align-items:center; justify-content:space-between; padding:8px 16px; background:#0f1219; border-bottom:1px solid #1a2234; }
.cb-title { font-size:10px; font-weight:700; color:#5a6a85; font-family:var(--mono); text-transform:uppercase; letter-spacing:0.5px; }
.cb-lang { font-size:9px; font-weight:600; padding:2px 8px; border-radius:4px; font-family:var(--mono); }
.cb-pre { margin:0; padding:16px 18px; overflow-x:auto; background:transparent !important; }
.cb-pre code { font-family:var(--mono); font-size:11px; line-height:1.8; }
@media (max-width:480px) {
  .cb-pre { padding:12px 14px; }
  .cb-pre code { font-size:10px; line-height:1.7; }
  .cb-header { padding:6px 12px; }
}
`

const LANG_COLORS: Record<string, { bg: string; color: string }> = {
  java:       { bg: 'rgba(239,68,68,0.15)', color: '#f87171' },
  yaml:       { bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
  json:       { bg: 'rgba(250,204,21,0.15)', color: '#facc15' },
  http:       { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  sql:        { bg: 'rgba(168,85,247,0.15)', color: '#c084fc' },
  proto:      { bg: 'rgba(6,182,212,0.15)', color: '#22d3ee' },
  protobuf:   { bg: 'rgba(6,182,212,0.15)', color: '#22d3ee' },
  ini:        { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' },
  bash:       { bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
  markup:     { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  comparison: { bg: 'rgba(148,163,184,0.12)', color: '#64748b' },
}

// prism-react-renderer가 지원하는 언어명으로 매핑
const LANG_MAP: Record<string, string> = {
  java: 'java',
  yaml: 'yaml',
  json: 'json',
  http: 'markup',
  sql: 'sql',
  proto: 'protobuf',
  protobuf: 'protobuf',
  ini: 'ini',
  bash: 'bash',
  shell: 'bash',
  xml: 'markup',
  html: 'markup',
  comparison: 'markup',
}

export function CodeBlock({ title, lang, children, style }: {
  title?: string; lang?: string; children: ReactNode; style?: CSSProperties
}) {
  useInjectCSS('style-code-block', CODE_BLOCK_CSS)

  const hasHeader = title || lang
  const langKey = lang?.toLowerCase() ?? ''
  const langStyle = LANG_COLORS[langKey] ?? { bg: '#1a2234', color: '#475569' }
  const prismLang = LANG_MAP[langKey] || 'markup'
  const code = typeof children === 'string' ? children.replace(/\n$/, '') : ''

  return (
    <div className="cb-wrapper" style={style}>
      {hasHeader && (
        <div className="cb-header">
          {title ? <span className="cb-title">{title}</span> : <span />}
          {lang && <span className="cb-lang" style={{ background: langStyle.bg, color: langStyle.color }}>{lang}</span>}
        </div>
      )}
      {typeof children === 'string' ? (
        <Highlight theme={themes.nightOwl} code={code} language={prismLang}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="cb-pre">
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, j) => (
                      <span key={j} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      ) : (
        <pre className="cb-pre"><code style={{ color: '#94a3b8', whiteSpace: 'pre' }}>{children}</code></pre>
      )}
    </div>
  )
}
