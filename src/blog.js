import { useEffect, useState } from 'react'
import { Marked } from 'marked'
import { imageSources, mediaUrl } from './media'
import { SITE_URL } from './config'

// Articles are Markdown files in the akrosecoestate-media repo: blog/<slug>.md.
// Its publish workflow also writes blog/index.json (every article's front
// matter, newest first), so the site never needs a directory listing.
//
// Build time: scripts/prerender.js calls loadBlog() and renders every article
// to static HTML, embedding the data each page used in #blog-data.
// Browser: that embedded data shows instantly; anything else (an article
// published since the last deploy) is fetched from GitHub Pages on demand.

export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Front matter: flat `key: value` lines between two "---" lines. Values may be
// "double-quoted" (JSON escapes), 'single-quoted' or bare. Must match
// parseFrontMatter in akrosecoestate-media/scripts/build.mjs.
export function parseFrontMatter(raw) {
  const match = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }
  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*?)\s*$/)
    if (!m) continue
    let value = m[2]
    if (/^".*"$/.test(value)) {
      try { value = JSON.parse(value) } catch { value = value.slice(1, -1) }
    } else if (/^'.*'$/.test(value)) {
      value = value.slice(1, -1).replace(/''/g, "'")
    } else {
      value = value.replace(/\s+#.*$/, '')
    }
    meta[m[1]] = value
  }
  return { meta, body: match[2] }
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const PROSE_SIZES = '(max-width: 768px) 100vw, 720px'

// Media-repo image paths become responsive <picture>s; links to other sites
// open in a new tab. Raw HTML in an article is passed through: articles are
// trusted because only people with write access to the media repo can publish.
const markdown = new Marked({
  renderer: {
    image({ href, title, text }) {
      const s = imageSources(href)
      const attrs = `alt="${esc(text)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy" decoding="async"`
      if (!s.avif) return `<img src="${esc(s.src)}" ${attrs}>`
      return (
        `<picture class="media-img">` +
        `<source type="image/avif" srcset="${esc(s.avif)}" sizes="${PROSE_SIZES}">` +
        `<source type="image/webp" srcset="${esc(s.webp)}" sizes="${PROSE_SIZES}">` +
        `<img src="${esc(s.src)}" srcset="${esc(s.jpg)}" sizes="${PROSE_SIZES}" ${attrs}>` +
        `</picture>`
      )
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const external = /^(https?:)?\/\//i.test(href) && !href.startsWith(SITE_URL)
      const target = external ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${target}>${text}</a>`
    },
  },
})

export function toPost(slug, raw) {
  const { meta, body } = parseFrontMatter(raw)
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    description: meta.description || '',
    image: meta.image || '',
    html: markdown.parse(body),
  }
}

// posts[slug]: a post, null when it doesn't exist, absent when not loaded yet.
const store = { index: null, posts: {} }
if (typeof document !== 'undefined') {
  const el = document.getElementById('blog-data')
  try {
    if (el) Object.assign(store, JSON.parse(el.textContent))
  } catch {
    // Malformed embed: everything is fetched instead.
  }
}

const indexUrl = () => mediaUrl('blog/index.json')
const postUrl = (slug) => mediaUrl(`blog/${slug}.md`)

async function get(url, as) {
  const res = await fetch(url)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
  return res[as]()
}

let indexRequest
function fetchIndex() {
  indexRequest ??= get(indexUrl(), 'json')
    .then((list) => (store.index = list || []))
    .catch((err) => {
      indexRequest = undefined // allow a retry on the next visit to the page
      throw err
    })
  return indexRequest
}

const postRequests = {}
function fetchPost(slug) {
  if (!SLUG.test(slug)) return Promise.resolve((store.posts[slug] = null))
  postRequests[slug] ??= get(postUrl(slug), 'text')
    .then((raw) => (store.posts[slug] = raw == null ? null : toPost(slug, raw)))
    .finally(() => delete postRequests[slug])
  return postRequests[slug]
}

// Build time: every article, read past the GitHub Pages CDN cache so a deploy
// triggered right after publishing sees the new article. Throws if the media
// site is unreachable, which fails the build and keeps the live site as is.
export async function loadBlog() {
  if (!/^https?:\/\//.test(indexUrl())) {
    throw new Error('VITE_ASSET_BASE_URL must be set to the media site URL (see .env.example)')
  }
  const fresh = `?v=${Date.now()}`
  const index = await get(indexUrl() + fresh, 'json')
  if (!Array.isArray(index)) throw new Error(`${indexUrl()} is missing or not a list`)
  const posts = {}
  await Promise.all(
    index.map(async ({ slug }) => {
      const raw = await get(postUrl(slug) + fresh, 'text')
      if (raw == null) throw new Error(`${postUrl(slug)} is listed in index.json but missing`)
      posts[slug] = toPost(slug, raw)
    }),
  )
  Object.assign(store, { index, posts })
  return index
}

// What a prerendered page embeds: the list, plus the one article it shows.
export function blogDataFor(slug) {
  return { index: store.index, posts: slug && store.posts[slug] ? { [slug]: store.posts[slug] } : {} }
}

export function useBlogIndex() {
  const [posts, setPosts] = useState(store.index)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let live = true
    // Runs even with embedded data, to pick up articles published since the last deploy.
    fetchIndex().then(
      (list) => live && setPosts(list),
      () => live && setFailed(true),
    )
    return () => {
      live = false
    }
  }, [])
  return { posts, failed: failed && !posts }
}

// { post } once loaded; post is null when no such article exists.
export function usePost(slug) {
  const [, rerender] = useState(0)
  const [failed, setFailed] = useState(null)
  const known = slug in store.posts
  useEffect(() => {
    if (!slug || known) return
    let live = true
    fetchPost(slug).then(
      () => live && rerender((n) => n + 1),
      () => live && setFailed(slug),
    )
    return () => {
      live = false
    }
  }, [slug, known])
  return { post: store.posts[slug], loading: !!slug && !known && failed !== slug, failed: failed === slug }
}
