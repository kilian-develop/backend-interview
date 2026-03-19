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
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // framer-motion (134KB)
          if (id.includes('framer-motion')) return 'vendor-motion'
          // React 코어
          if (id.includes('/react-dom/')) return 'vendor-react'
          // 라우팅 + 상태관리 + 검색
          if (id.includes('react-router') || id.includes('zustand') || id.includes('fuse.js')) {
            return 'vendor-app'
          }
          // Shiki는 내부 dynamic import가 자연 분할되도록 건드리지 않음
        },
      },
    },
  },
})
