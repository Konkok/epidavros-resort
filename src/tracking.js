// Tracking: Meta Pixel, Google Ads and Google Analytics 4 (one shared gtag.js).
// IDs come from env vars set at build time (locally in .env, on Vercel under
// Project → Settings → Environment Variables). A missing ID disables that
// platform. Nothing loads until the visitor accepts cookies (GDPR); see
// CookieConsent.jsx.
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID // "AW-XXXXXXXXX"
const GOOGLE_ADS_LEAD_LABEL = import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL // conversion label for enquiries
const GA4_ID = import.meta.env.VITE_GA4_ID // "G-XXXXXXXXXX"
// Google allows one gtag.js per page; Ads and GA4 share it.
const GOOGLE_IDS = [GOOGLE_ADS_ID, GA4_ID].filter(Boolean)

export const trackingEnabled = Boolean(META_PIXEL_ID || GOOGLE_IDS.length)

const CONSENT_KEY = 'ad-consent' // 'granted' | 'denied'
export const OPEN_COOKIE_SETTINGS = 'open-cookie-settings'

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

let loaded = false

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Storage blocked: the choice applies to this visit only.
  }
  if (value === 'granted') {
    if (!loaded) load()
    else updateConsent('granted')
  } else if (loaded) {
    // Scripts can't be unloaded mid-visit; tell both platforms to stop.
    updateConsent('denied')
  }
}

function updateConsent(state) {
  window.gtag?.('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  })
  window.fbq?.('consent', state === 'granted' ? 'grant' : 'revoke')
}

function addScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function load() {
  loaded = true

  if (GOOGLE_IDS.length) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments) // gtag.js requires the arguments object
    }
    window.gtag('consent', 'default', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    })
    window.gtag('js', new Date())
    // Page views are sent per route by pageView(), not automatically.
    for (const id of GOOGLE_IDS) window.gtag('config', id, { send_page_view: false })
    addScript(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_IDS[0]}`)
  }

  if (META_PIXEL_ID) {
    // Meta's standard bootstrap: queues calls until fbevents.js arrives.
    const fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
    }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = window._fbq = fbq
    addScript('https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', META_PIXEL_ID)
  }
}

function active() {
  if (!trackingEnabled || getConsent() !== 'granted') return false
  if (!loaded) load()
  return true
}

// Called on every route change (App.jsx).
export function pageView() {
  if (!active()) return
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title,
  })
  window.fbq?.('track', 'PageView')
}

// Called when the enquiry form is sent successfully (Contact.jsx).
export function trackLead() {
  if (!active()) return
  window.fbq?.('track', 'Lead')
  if (GA4_ID) window.gtag('event', 'generate_lead', { send_to: GA4_ID })
  if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL) {
    window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}` })
  }
}
