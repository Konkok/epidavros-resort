// Every photo, video and blog article lives in the akrosecoestate-media repo,
// published on GitHub Pages. Components reference files by their path in that
// repo ("images/properties/elia/x.jpg"); this module turns paths into URLs.
//
// VITE_ASSET_BASE_URL is required for builds (scripts/prerender.js fails
// without it). If it is missing in dev, paths resolve against this site's
// root, so media 404s instead of silently loading from somewhere else.
export const MEDIA_BASE = withSlash(import.meta.env?.VITE_ASSET_BASE_URL || '/')

if (MEDIA_BASE === '/' && import.meta.env?.DEV) {
  console.error('VITE_ASSET_BASE_URL is not set: photos, videos and the blog will not load. See .env.example.')
}

// Must match WIDTHS in akrosecoestate-media/scripts/build.mjs, which writes
// name-480.avif, name-480.webp, name-480.jpg, … next to each original.
export const WIDTHS = [480, 1000, 1600]

function withSlash(url) {
  return url.replace(/\/*$/, '/')
}

const isAbsolute = (path) => /^([a-z][a-z\d+.-]*:|\/\/)/i.test(path)

// "images/x.jpg", "/images/x.jpg", "./images/x.jpg" and "../images/x.jpg" all
// mean the same file in the media repo. Absolute URLs pass through untouched.
export function mediaUrl(path, base = MEDIA_BASE) {
  if (!path || isAbsolute(path)) return path
  return withSlash(base) + path.replace(/^(\.{0,2}\/)+/, '')
}

// Only JPEG/PNG files in the media repo get resized variants.
const hasVariants = (path) => !!path && !isAbsolute(path) && /\.(jpe?g|png)$/i.test(path)

const variant = (path, width, ext) => path.replace(/\.[^.]+$/, `-${width}.${ext}`)

// URL of one size of an image: used where a single URL is needed (og:image,
// JSON-LD). Falls back to the file itself when it has no variants.
export function imageUrl(path, width = 1000, base = MEDIA_BASE) {
  return mediaUrl(hasVariants(path) ? variant(path, width, 'jpg') : path, base)
}

// srcset strings per format for <picture>, or just { src } for files without variants.
export function imageSources(path, base = MEDIA_BASE) {
  if (!hasVariants(path)) return { src: mediaUrl(path, base) }
  const set = (ext) => WIDTHS.map((w) => `${mediaUrl(variant(path, w, ext), base)} ${w}w`).join(', ')
  return { src: imageUrl(path, 1000, base), avif: set('avif'), webp: set('webp'), jpg: set('jpg') }
}

export const VIDEOS = {
  heroLoop: 'videos/hero/hero-loop.mp4',
  heroLoopSmall: 'videos/hero/hero-loop-720.mp4',
  promo: 'videos/hero/promo.mp4',
}
