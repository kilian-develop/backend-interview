/**
 * prism-react-renderer의 Prism 인스턴스를 globalThis에 등록합니다.
 * 이 모듈이 prism-languages.ts보다 먼저 평가되어야 합니다.
 */
import { Prism } from 'prism-react-renderer'

;(typeof globalThis !== 'undefined' ? globalThis : window).Prism = Prism

export { Prism }
