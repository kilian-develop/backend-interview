import { useEffect } from 'react'

export function useInjectCSS(id: string, css: string) {
  useEffect(() => {
    const style = document.createElement('style')
    style.id = id
    style.textContent = css
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [id, css])
}
