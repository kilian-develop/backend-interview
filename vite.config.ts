import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // framer-motion을 별도 청크로 분리하여 메인 번들 경량화
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
