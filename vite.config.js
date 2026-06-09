import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxies /api/guesty/* → https://app.guesty.com/api/pm-websites-backend/*
      // This bypasses CORS in development (server-to-server request).
      // For production, add a redirect rule in your hosting provider:
      //   Netlify: /api/guesty/* https://app.guesty.com/api/pm-websites-backend/:splat 200
      //   Vercel:  { "source": "/api/guesty/(.*)", "destination": "https://app.guesty.com/api/pm-websites-backend/$1" }
      '/api/guesty': {
        target: 'https://app.guesty.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/guesty/, '/api/pm-websites-backend'),
      },
    },
  },
})
