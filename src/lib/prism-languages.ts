/**
 * prism-react-renderer 기본 번들에 포함되지 않는 언어를 등록합니다.
 * ESM 평가 순서에 의해 prism-setup이 먼저 실행되어 globalThis.Prism이 설정된 후,
 * 각 prismjs 컴포넌트가 해당 Prism 인스턴스에 언어 문법을 추가합니다.
 */
import './prism-setup'

import 'prismjs/components/prism-java'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-protobuf'
import 'prismjs/components/prism-ini'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-typescript'
