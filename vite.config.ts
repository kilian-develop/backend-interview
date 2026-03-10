import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 거의 모든 doc 페이지에서 사용하는 공용 컴포넌트를 하나로 묶어 워터폴 감소
          'doc-shared': [
            'prism-react-renderer',
            'prismjs/components/prism-java',
            'prismjs/components/prism-yaml',
            'prismjs/components/prism-bash',
            'prismjs/components/prism-protobuf',
            'prismjs/components/prism-ini',
            'prismjs/components/prism-kotlin',
            'prismjs/components/prism-typescript',
          ],
          // framer-motion을 별도 청크로 분리하여 메인 번들 경량화
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
