import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import {
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
  const lang = i18n.language?.split('-')[0] || 'en'

  return (
    <Helmet>
      <html lang={lang} />
      <title>{t('seo.title')}</title>
      <meta name="description" content={t('seo.description')} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content={THEME_COLOR} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t('seo.ogTitle')} />
      <meta property="og:description" content={t('seo.ogDescription')} />
      <meta property="og:image" content={SEO_OG_IMAGE} />
      <meta property="og:locale" content={lang === 'el' ? 'el_GR' : lang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:locale:alternate" content="el_GR" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('seo.ogTitle')} />
      <meta name="twitter:description" content={t('seo.ogDescription')} />
      <meta name="twitter:image" content={SEO_OG_IMAGE} />

      {/* hreflang for multilingual SEO */}
      <link rel="alternate" hrefLang="en" href={SITE_URL} />
      <link rel="alternate" hrefLang="el" href={SITE_URL} />
      <link rel="alternate" hrefLang="de" href={SITE_URL} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(STRUCTURED_DATA)}
      </script>
    </Helmet>
  )
}
