// Post-build step: renders every route to static HTML so crawlers that don't
// execute JavaScript (most AI crawlers) see real content and structured data.
// Blog articles are fetched from the media site (VITE_ASSET_BASE_URL); if it
// can't be reached the build fails, so the live deployment stays in place.
// Also writes sitemap.xml from the same route list.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render, getRoutes, blogDataFor, SITE_URL } = await import(
  pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href
)

// React 19 emits hoistable tags (<title>, <meta>, <link>, <script>) at the
// start of renderToString output; that leading run belongs in <head>.
const HEAD_TAGS =
  /^(?:<(?:link|meta)\b[^>]*\/>|<title>[\s\S]*?<\/title>|<script\b[^>]*>[\s\S]*?<\/script>)+/

// JSON inside <script> must not contain "</script>" or "<!--".
const embed = (data) =>
  `<script id="blog-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

// The hero poster preload in index.html only helps the homepage; elsewhere it
// would download an image the page never shows.
const HERO_PRELOAD = /\n\s*<!--\s*LCP preload[\s\S]*?-->\s*<link\s+rel="preload"[\s\S]*?\/>\s*<!--[\s\S]*?-->/
if (!HERO_PRELOAD.test(template)) throw new Error('hero preload block not found in index.html')

const routes = await getRoutes()

for (const { url, slug } of routes) {
  const rendered = await render(url)
  const head = rendered.match(HEAD_TAGS)?.[0] ?? ''
  if (!head.includes('<title>')) throw new Error(`no <title> rendered for ${url}`)
  if (slug && !rendered.includes('blog__prose')) throw new Error(`article body missing for ${url}`)
  // Marked so main.jsx can drop them once React renders its own copies.
  const marked = head.replace(/<(title|meta|link|script)\b/g, '<$1 data-prerender')
  // Blog pages carry the data they were rendered from, so the browser shows
  // them without fetching it again.
  const data = url === '/blog' ? embed(blogDataFor()) : slug ? embed(blogDataFor(slug)) : ''
  const page = (url === '/' ? template : template.replace(HERO_PRELOAD, ''))
    .replace('<!--app-head-->', marked)
    .replace('<!--app-html-->', rendered.slice(head.length))
    .replace('<!--app-data-->', data)
  const file = path.join(dist, url, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page)
  console.log(`prerendered ${url}`)
}

const urls = routes
  .map(({ url, lastmod }) =>
    `  <url><loc>${SITE_URL}${url}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
  .join('\n')
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`sitemap.xml: ${routes.length} urls`)
