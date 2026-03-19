import { useEffect, useState, useCallback } from 'react'
import { codeToHtml } from 'shiki'

const LANG_LABELS: Record<string, string> = {
  json: 'JSON', js: 'JavaScript', ts: 'TypeScript', java: 'Java', kotlin: 'Kotlin',
  sql: 'SQL', sh: 'Shell', bash: 'Bash', yaml: 'YAML', yml: 'YAML',
  xml: 'XML', html: 'HTML', dockerfile: 'Dockerfile', properties: 'Properties',
}

interface CodeSnippetProps { code: string; lang?: string }

export default function CodeSnippet({ code, lang = 'json' }: CodeSnippetProps) {
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)
  const trimmed = code.trim()
  const label = LANG_LABELS[lang] || lang.toUpperCase()

  useEffect(() => {
    codeToHtml(trimmed, { lang, theme: 'github-dark-default' }).then(setHtml)
  }, [trimmed, lang])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(trimmed).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }, [trimmed])

  return (
    <div style={{ background: '#0a0d14', border: '1px solid #1a2234', borderRadius: '10px', margin: '12px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', height: '38px', background: '#0f1219', borderBottom: '1px solid #1a2234' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#5a6a85' }}>{label}</span>
        <button onClick={handleCopy} style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 10px', borderRadius: '6px', cursor: 'pointer', border: 'none', background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)', color: copied ? '#22c55e' : '#5a6a85', transition: 'all .2s' }}>
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      {html ? (
        <div style={{ padding: '0' }} dangerouslySetInnerHTML={{ __html: html.replace(/<pre /g, '<pre style="background:transparent;margin:0;padding:14px 18px;line-height:1.8;overflow-x:auto" ').replace(/<code /g, '<code style="font-size:13px;font-family:var(--mono)" ') }} />
      ) : (
        <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', padding: '14px 18px', lineHeight: 1.8, whiteSpace: 'pre-wrap', color: '#94a3b8' }}>{trimmed}</div>
      )}
    </div>
  )
}
