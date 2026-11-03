// Run with `npm test` after `npm run build` (needs dist-ssr/ and dist/).
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const { parseFrontMatter, toPost, mediaUrl, imageUrl, imageSources, MEDIA_BASE } = ssr

test('media URLs: slashes and absolute URLs', () => {
  for (const base of ['https://u.github.io/m', 'https://u.github.io/m/', 'https://u.github.io/m//']) {
    for (const p of ['images/a.jpg', '/images/a.jpg', './images/a.jpg', '../images/a.jpg']) {
      assert.equal(mediaUrl(p, base), 'https://u.github.io/m/images/a.jpg')
    }
  }
  assert.equal(mediaUrl('https://x.com/a.jpg', 'https://b/'), 'https://x.com/a.jpg')
  assert.equal(mediaUrl('//x.com/a.jpg', 'https://b/'), '//x.com/a.jpg')
  assert.equal(mediaUrl('', 'https://b/'), '')
})

test('image variants only for media-repo JPEG/PNG', () => {
  const b = 'https://u.github.io/m/'
  assert.equal(imageUrl('images/a.b.JPG', 1600, b), 'https://u.github.io/m/images/a.b-1600.jpg')
  assert.equal(imageUrl('images/logo.svg', 1600, b), 'https://u.github.io/m/images/logo.svg')
  assert.equal(imageUrl('https://x.com/a.jpg', 1600, b), 'https://x.com/a.jpg')
  const s = imageSources('images/a.png', b)
  assert.equal(s.src, 'https://u.github.io/m/images/a-1000.jpg')
  assert.equal(s.avif, 'https://u.github.io/m/images/a-480.avif 480w, https://u.github.io/m/images/a-1000.avif 1000w, https://u.github.io/m/images/a-1600.avif 1600w')
  assert.deepEqual(imageSources('https://x.com/a.jpg', b), { src: 'https://x.com/a.jpg' })
})

test('front matter: quoted, bare, CRLF, missing', () => {
  const { meta, body } = parseFrontMatter(
    '---\r\ntitle: "Say \\"hi\\": now"\r\ndate: 2026-11-03\r\ndescription: \'It\'\'s fine\'\r\nimage: images/x.jpg # cover\r\n---\r\nBody',
  )
  assert.deepEqual(meta, { title: 'Say "hi": now', date: '2026-11-03', description: "It's fine", image: 'images/x.jpg' })
  assert.equal(body, 'Body')
  assert.deepEqual(parseFrontMatter('No front matter'), { meta: {}, body: 'No front matter' })
})

test('markdown: formatting, links and relative images', () => {
  const md = [
    '---', 'title: "T"', '---',
    '## Heading', '', 'Some **bold** and *italic*.', '', '> quote', '',
    '- a', '- b', '', '1. one', '2. two', '',
    '[home](/#availability) [ext](https://example.com) [own](https://akrosecoestate.com/blog)', '',
    '![Alt "text"](images/blog/p.jpg)', '', '![remote](https://x.com/r.gif)',
  ].join('\n')
  const { html, title, image } = toPost('t', md)
  assert.equal(title, 'T')
  assert.equal(image, '')
  for (const s of ['<h2>Heading</h2>', '<strong>bold</strong>', '<em>italic</em>', '<blockquote>', '<ul>', '<ol>']) {
    assert.ok(html.includes(s), s)
  }
  assert.ok(html.includes('<a href="/#availability">home</a>'))
  assert.ok(html.includes('<a href="https://example.com" target="_blank" rel="noopener noreferrer">ext</a>'))
  assert.ok(html.includes('<a href="https://akrosecoestate.com/blog">own</a>'))
  assert.ok(html.includes(`srcset="${MEDIA_BASE}images/blog/p-480.avif 480w`))
  assert.ok(html.includes(`<img src="${MEDIA_BASE}images/blog/p-1000.jpg"`))
  assert.ok(html.includes('alt="Alt &quot;text&quot;"'))
  assert.ok(html.includes('<img src="https://x.com/r.gif" alt="remote" loading="lazy"'))
})

// Prerendered output, checked for every article the build found.
const routes = fs.readFileSync('dist/sitemap.xml', 'utf8').match(/<loc>[^<]+<\/loc>/g).map((l) => l.slice(5, -6))
const articles = routes.filter((u) => u.includes('/blog/'))

test('hero poster is preloaded on the homepage only', () => {
  const heroPreload = /<link\s+rel="preload"\s+as="image"\s+type="image\/avif"\s+href="\/hero-poster/g
  assert.equal(fs.readFileSync('dist/index.html', 'utf8').match(heroPreload).length, 1)
  assert.ok(!heroPreload.test(fs.readFileSync('dist/elia/index.html', 'utf8')))
})

test('sitemap lists the site and at least one article', () => {
  assert.ok(routes.includes('https://akrosecoestate.com/'))
  assert.ok(routes.includes('https://akrosecoestate.com/blog'))
  assert.ok(articles.length > 0)
})

for (const url of articles) {
  test(`prerendered SEO: ${url}`, () => {
    const html = fs.readFileSync(path.join('dist', new URL(url).pathname, 'index.html'), 'utf8')
    const head = html.slice(0, html.indexOf('</head>'))
    assert.match(head, /<title data-prerender>[^<]+ \| /)
    assert.ok(head.includes(`<link data-prerender rel="canonical" href="${url}"/>`))
    assert.ok(head.includes('<meta data-prerender property="og:type" content="article"/>'))
    assert.match(head, /property="article:published_time" content="\d{4}-\d{2}-\d{2}"/)
    assert.match(head, new RegExp(`property="og:image" content="${MEDIA_BASE}`))
    assert.ok(head.includes('<meta data-prerender name="robots" content="index, follow"/>'))
    assert.match(html, /"@type":"BlogPosting"/)
    assert.match(html, /<div class="blog__prose">\s*<(p|h[1-6]|ul|ol|blockquote)/)
    assert.match(html, /<script id="blog-data" type="application\/json">\{"index":\[/)
    assert.ok(!html.includes('%VITE_ASSET_BASE_URL%'))
    // The hero poster preload is homepage-only; nothing is preloaded here.
    assert.ok(!html.includes('hero-poster.avif'))
  })
}
