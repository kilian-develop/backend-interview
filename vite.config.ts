import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // prism-react-renderer만 별도 청크로 분리 (언어 컴포넌트는 ESM 평가 순서에 의존하므로 제외)
          'doc-shared': ['prism-react-renderer'],
          // framer-motion을 별도 청크로 분리하여 메인 번들 경량화
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
