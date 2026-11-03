import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { usePost } from '../blog'
import { imageUrl } from '../media'
import {
  rooms,
  SITE_NAME, SITE_URL, THEME_COLOR,
  SEO_PHONE, SEO_EMAIL, SEO_OG_IMAGE, SEO_ROOMS, SEO_RATING, SEO_SAME_AS,
  GEO,
} from '../config'

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: SITE_NAME,
  url: SITE_URL,
  telephone: SEO_PHONE,
  email: SEO_EMAIL,
  image: SEO_OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: GEO.streetAddress,
    addressLocality: GEO.city,
    addressRegion: GEO.region,
    postalCode: GEO.postalCode,
    addressCountry: GEO.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.lat,
    longitude: GEO.lng,
  },
  priceRange: '€€',
  numberOfRooms: SEO_ROOMS,
  starRating: { '@type': 'Rating', ratingValue: SEO_RATING, bestRating: '5' },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Swimming pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Beach access', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Garden', value: true },
  ],
  sameAs: SEO_SAME_AS,
}

export default function SEO() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const lang = i18n.language?.split('-')[0] || 'en'
  const room = rooms.find((r) => `/${r.villaKey}` === pathname)
  const slug = pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1]
  const { post, loading } = usePost(slug)
  const missingPost = Boolean(slug) && !post && !loading
  const isBlog = pathname === '/blog'
  // Villa and blog pages get their own title, description and canonical;
  // otherwise Google treats them as duplicates of the homepage.
  const title = room
    ? `${room.name} | ${SITE_NAME}`
    : post
      ? `${post.title} | ${SITE_NAME}`
      : missingPost
        ? `${t('blog.notFound')} | ${SITE_NAME}`
        : isBlog
          ? `${t('blog.title')} | ${SITE_NAME}`
          : t('seo.title')
  const description = room
    ? t(`rooms.villas.${room.villaKey}.subtitle`, t('seo.description'))
    : post
      ? post.description || t('seo.description')
      : isBlog
        ? t('blog.subtitle')
        : t('seo.description')
  const canonical = room || post || isBlog ? `${SITE_URL}${pathname.replace(/\/$/, '')}` : SITE_URL
  const isSubpage = Boolean(room || post || isBlog)
  // Subpages describe themselves; the homepage keeps its own social copy.
  const socialDescription = isSubpage ? description : t('seo.ogDescription')
  const ogImage = post?.image ? imageUrl(post.image, 1600) : room ? imageUrl(room.image, 1600) : SEO_OG_IMAGE

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta name="robots" content={missingPost ? 'noindex, follow' : 'index, follow'} />
      <meta name="theme-color" content={THEME_COLOR} />

      {/* Open Graph */}
      <meta property="og:type" content={post ? 'article' : 'website'} />
      {post?.date && <meta property="article:published_time" content={post.date} />}
      <meta property="og:title" content={isSubpage ? title : t('seo.ogTitle')} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === 'el' ? 'el_GR' : lang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:locale:alternate" content="el_GR" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={isSubpage ? title : t('seo.ogTitle')} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* No hreflang: every language is served from the same URL (picked
          client-side), so there are no per-language alternates to declare. */}

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(STRUCTURED_DATA)}
      </script>
    </Helmet>
  )
}
