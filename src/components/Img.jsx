import { imageSources } from '../media'

// <img> for a media-repo path, served as AVIF/WebP/JPEG at the size the
// layout needs. `sizes` should describe the rendered width (default: full
// viewport). `priority` is for the one above-the-fold image of a page; every
// other image loads lazily. Extra props (className, alt, loading, …) go on the <img>.
export default function Img({ src, sizes = '100vw', priority = false, ...props }) {
  const s = imageSources(src)
  const img = (
    <img
      sizes={s.jpg ? sizes : undefined}
      srcSet={s.jpg}
      src={s.src}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      {...props}
    />
  )
  if (!s.avif) return img
  // .media-img is display: contents, so existing CSS that styles the <img>
  // as a direct box in its container keeps working.
  return (
    <picture className="media-img">
      <source type="image/avif" sizes={sizes} srcSet={s.avif} />
      <source type="image/webp" sizes={sizes} srcSet={s.webp} />
      {img}
    </picture>
  )
}
