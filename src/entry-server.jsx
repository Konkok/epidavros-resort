// Build-time only: rendered by scripts/prerender.js, never shipped to browsers.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import i18n from './i18n/index.js'
import './index.css'
import App from './App.jsx'
import { rooms } from './config'
import { loadBlog } from './blog'

export { SITE_URL } from './config'
export { blogDataFor } from './blog'
// For scripts/*.test.js: these modules read import.meta.env, so tests import
// them through this Vite-built bundle rather than from src/.
export { parseFrontMatter, toPost } from './blog'
export { mediaUrl, imageUrl, imageSources, MEDIA_BASE } from './media'

// Every page to prerender. Blog articles come from the media site's
// blog/index.json, so a new article is picked up by the next build.
export async function getRoutes() {
  const posts = await loadBlog()
  return [
    { url: '/' },
    ...rooms.map((r) => ({ url: `/${r.villaKey}` })),
    { url: '/blog' },
    ...posts.map((p) => ({ url: `/blog/${p.slug}`, slug: p.slug, lastmod: p.date })),
  ]
}

// With React 19, <Helmet> renders real <title>/<meta>/<link>/<script> elements
// inline instead of filling a context, so prerender.js lifts them into <head>.
export async function render(url) {
  await i18n.changeLanguage('en')
  return renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  )
}
