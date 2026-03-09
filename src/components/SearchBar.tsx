import { useState, useCallback } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      onSearch(e.target.value)
    },
    [onSearch],
  )

  const handleClear = useCallback(() => {
    setValue('')
    onSearch('')
  }, [onSearch])

  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      <span
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--muted)',
          fontSize: '14px',
          pointerEvents: 'none',
        }}
      >
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="주제 검색..."
        style={{
          width: '100%',
          paddingLeft: '40px',
          paddingRight: value ? '40px' : '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          borderRadius: '12px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          fontSize: '14px',
          fontFamily: 'var(--sans)',
          outline: 'none',
          transition: 'border-color .2s',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
      />
      {value && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--muted)',
            cursor: 'pointer',
            fontSize: '16px',
            lineHeight: 1,
            padding: '4px',
          }}
        >
          ✕
        </button>
      )}
    </div>
  )
}
