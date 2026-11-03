import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Photos, videos and the blog come from the media site; a build without it
  // would ship a site with no images and no articles.
  if (command === 'build' && !loadEnv(mode, process.cwd()).VITE_ASSET_BASE_URL) {
    throw new Error('VITE_ASSET_BASE_URL is not set. Point it at the akrosecoestate-media GitHub Pages URL (see .env.example).')
  }
  return config
})

const config = {
  plugins: [react()],
  // Prerender build (scripts/prerender.js): react-helmet-async ships CJS that
  // Node can't import by name, so bundle it instead of leaving it external.
  ssr: {
    noExternal: ['react-helmet-async'],
  },
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
}
