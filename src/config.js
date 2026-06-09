// ── Site Identity ────────────────────────────────────────────────────────────
export const SITE_NAME   = 'Epidavros Villas & Suites | Akros Eco Farm'
export const SITE_URL    = 'https://www.epidavrosvillas.gr'
export const THEME_COLOR = '#94ca3e'

// ── Contact ──────────────────────────────────────────────────────────────────
// BOOKING_RECIPIENT receives enquiry form submissions from the website
export const BOOKING_RECIPIENT = import.meta.env.VITE_BOOKING_RECIPIENT
export const CONTACT_EMAIL     = import.meta.env.VITE_CONTACT_EMAIL
export const CONTACT_PHONE     = '+30 6933037694'
export const CONTACT_ADDRESS   = '44th km Corinth–Epidaurus Road, Nea Epidavros, Greece'

// ── Social Media ─────────────────────────────────────────────────────────────
export const SOCIAL_FACEBOOK  = 'https://www.facebook.com/profile.php?id=61573682061893'
export const SOCIAL_INSTAGRAM = 'https://www.instagram.com/epidavros_villas/'
export const SOCIAL_TIKTOK    = 'https://www.tiktok.com/@epidavrosvillas'

// ── Virtual Tours (thevivestia.com) ──────────────────────────────────────────
export const ESTATE_TOUR_URL = 'https://my.thevivestia.com/tour/epidavros-villas'

// ── Booking / Holihouse ───────────────────────────────────────────────────────
// Set to true to embed the Holihouse booking portal as an iframe.
// Set to false to use the live Guesty API search widget instead.
export const BOOKING_IFRAME_ENABLED = true
export const BOOKING_IFRAME_BASE    = import.meta.env.VITE_BOOKING_IFRAME_BASE
// Maps i18n language codes to Holihouse URL slugs (de falls back to en)
export const HOLIHOUSE_LANG_MAP = { en: 'en', el: 'el', de: 'en' }

// ── SEO / Structured Data ────────────────────────────────────────────────────
export const SEO_PHONE    = '+302753041000'
export const SEO_EMAIL    = 'info@epidavrosresort.gr'
export const SEO_OG_IMAGE = 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/Sea-view-Mountain-view-Akros-Eco-Estate-1.jpg'
export const SEO_ROOMS    = 6
export const SEO_RATING   = '4.9'
export const SEO_SAME_AS  = [
  'https://epidavrosvillas.holihouse.gr',
  'https://epidavrosrentalvillas.gr',
]
export const GEO = {
  streetAddress: '42nd km of the Isthmus - Epidaurus National Road',
  city:          'Nea Epidavros',
  region:        'Argolida',
  postalCode:    '210 54',
  country:       'GR',
  lat:           37.6700983,
  lng:           23.1470858,
}

// ── Rooms / Villas ────────────────────────────────────────────────────────────

const BASE      = 'https://epidavrosrentalvillas.gr/wp-content/uploads'
const TOUR_BASE = import.meta.env.VITE_VIVESTIA_BASE

export const AMENITY_KEY_MAP = {
  'Private Balcony':   'privateBalcony',
  'Sea View':          'seaView',
  'King Bed':          'kingBed',
  'Soaking Tub':       'soakingTub',
  'Air Conditioning':  'airConditioning',
  'Mini Bar':          'miniBar',
  'Private Terrace':   'privateTerrace',
  'Garden View':       'gardenView',
  'Queen Bed':         'queenBed',
  'Rain Shower':       'rainShower',
  'Safe':              'safe',
  'Double Bed':        'doubleBed',
  'En-Suite Bathroom': 'enSuiteBathroom',
  'Flat-Screen TV':    'flatScreenTV',
  'Wi-Fi':             'wifi',
  'Balcony':           'balcony',
  '2 Bedrooms':        'twoBedrooms',
  'Living Area':       'livingArea',
  'Large Terrace':     'largeTerrace',
  'Kitchenette':       'kitchenette',
  'Pool Access':       'poolAccess',
  'Private Patio':     'privatePatio',
  'Stone Walls':       'stoneWalls',
  'Outdoor Shower':    'outdoorShower',
  'Private Plunge Pool': 'privatePlungePool',
  '360° Views':        'panoramicViews',
  'Gourmet Kitchen':   'gourmetKitchen',
  'Butler Service':    'butlerService',
  'Premium Bar':       'premiumBar',
  'Jacuzzi':           'jacuzzi',
  'Full Kitchen':      'fullKitchen',
  'Washing Machine':   'washingMachine',
  'Shared Pool':       'sharedPool',
  'Private Parking':   'privateParking',
}

export const rooms = [
  {
    id: 1,
    villaKey: 'voukamvilia',
    name: 'Voukamvilia',
    category: 'Villa',
    price: 280,
    size: '41 m²',
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: `${BASE}/2019/06/Voukamvilia_main-photo.jpg`,
    photos: [
      { src: `${BASE}/2019/06/Voukamvilia_main-photo.jpg`,                                                   alt: 'Voukamvilia — main view' },
      { src: `${BASE}/2019/06/General-View-of-Voukamvilia-rental-residence-.jpg`,                            alt: 'General view of Voukamvilia' },
      { src: `${BASE}/2019/06/Outdoor-dining-area-with-panoramic-view-of-Voukamvilia-rental-residence.jpg`,  alt: 'Outdoor dining with panoramic view' },
      { src: `${BASE}/2019/06/Patio-of-Voukamvilia-rental-residence.jpg`,                                    alt: 'Private patio' },
      { src: `${BASE}/2019/06/Outdoor-seating-area-of-Voukamvilia-rental-residence-.jpg`,                    alt: 'Outdoor seating area' },
      { src: `${BASE}/2019/06/Pool-area-of-Voukamvilia-rental-residence.jpg`,                                alt: 'Pool area' },
      { src: `${BASE}/2019/06/Bedroom-of-Voukamvilia-_A-rental-residence.jpg`,                               alt: 'Bedroom A' },
      { src: `${BASE}/2019/06/Double-Bed-of-Voukamvilia-_A-rentalresidence-.jpg`,                            alt: 'Double bed — Bedroom A' },
      { src: `${BASE}/2019/06/Bedroom-of-of-Voukamvilia_-B-rental-residence.jpg`,                            alt: 'Bedroom B' },
      { src: `${BASE}/2019/06/Bedroom-Queen-bed-of-of-Voukamvilia_-B-rental-residence.jpg`,                  alt: 'Queen bed — Bedroom B' },
      { src: `${BASE}/2019/06/Bathroom-of-Voukamvilia-_A-rental-residence.jpg`,                              alt: 'Bathroom' },
      { src: `${BASE}/2019/06/Sea-View-Akros-Eco-Estate.jpg`,                                                alt: 'Sea view from the estate' },
      { src: `${BASE}/2019/06/General-view-to-the-sea-and-the-mountain-from-Akros-Eco-Estate.jpg`,           alt: 'Sea and mountain view' },
    ],
    amenities: ['Sea View', 'Shared Pool', 'Air Conditioning', 'Wi-Fi', 'Private Balcony', 'Private Parking'],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-voukamvilia`,
  },
  {
    id: 2,
    villaKey: 'gardenia',
    name: 'Gardenia',
    category: 'Deluxe',
    price: 180,
    size: '21 m²',
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: `${BASE}/2025/02/rental-residence-Gardenia.jpg`,
    photos: [
      { src: `${BASE}/2025/02/rental-residence-Gardenia.jpg`,                                        alt: 'Gardenia villa' },
      { src: `${BASE}/2025/02/Gardenia_1.jpg`,                                                       alt: 'Gardenia — exterior view' },
      { src: `${BASE}/2025/02/Outdoor-patio-area-of-Gardenia-rental-residence.jpg`,                  alt: 'Outdoor patio' },
      { src: `${BASE}/2025/02/Balkony-of-Gardenia-rental-residence.jpg`,                             alt: 'Balcony' },
      { src: `${BASE}/2025/02/Balkony-view-of-Gardenia-rental-residence.jpg`,                        alt: 'View from the balcony' },
      { src: `${BASE}/2025/02/Pool-area-of-Gardenia-rental-residence.jpg`,                           alt: 'Shared pool area' },
      { src: `${BASE}/2025/02/Bedroom-of-Gardenia-rental-residence.jpg`,                             alt: 'Bedroom' },
      { src: `${BASE}/2025/02/Double-Bed-and-Wardrobe-of-Gardenia-rental-residence.jpg`,             alt: 'Double bed and wardrobe' },
      { src: `${BASE}/2025/02/Console-and-single-bed-of-Gardenia-rental-residence.jpg`,              alt: 'Console and single bed' },
      { src: `${BASE}/2025/02/Bathroom-of-Gardenia-rental-residence.jpg`,                            alt: 'Bathroom' },
      { src: `${BASE}/2025/02/Bathroom-Washbasin-of-Gardenia-rental-residence.jpg`,                  alt: 'Bathroom washbasin' },
    ],
    amenities: ['Sea View', 'Shared Pool', 'Air Conditioning', 'Wi-Fi', 'Private Balcony', 'Garden View'],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-gardenia`,
  },
  {
    id: 3,
    villaKey: 'dafni',
    name: 'Dafni',
    category: 'Villa',
    price: 220,
    size: '60 m²',
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: `${BASE}/2025/02/Dafni-10-aa.jpg`,
    photos: [
      { src: `${BASE}/2025/02/Dafni-10-aa.jpg`,                           alt: 'Dafni villa' },
      { src: `${BASE}/2025/02/Dafni-7.jpg`,                               alt: 'Dafni — exterior' },
      { src: `${BASE}/2025/02/Dafni-8.jpg`,                               alt: 'Dafni — terrace' },
      { src: `${BASE}/2025/02/Dafni-living-room-1.jpg`,                   alt: 'Living room' },
      { src: `${BASE}/2025/02/Dafni-living-room-4.jpg`,                   alt: 'Living room — seating area' },
      { src: `${BASE}/2025/02/Dafni-kichen_1.jpg`,                        alt: 'Kitchen' },
      { src: `${BASE}/2025/02/Dafni-kichen_3.jpg`,                        alt: 'Kitchen — details' },
      { src: `${BASE}/2025/02/Dafni-bedroom_A-3.jpg`,                     alt: 'Bedroom A' },
      { src: `${BASE}/2025/02/Dafni-bedroom_A-4.jpg`,                     alt: 'Bedroom A — details' },
      { src: `${BASE}/2025/02/Dafni-bedroom_B-2.jpg`,                     alt: 'Bedroom B' },
      { src: `${BASE}/2025/02/Dafni-bathroom-1.jpg`,                      alt: 'Bathroom' },
      { src: `${BASE}/2025/02/Sea-View-Akros-Eco-Estate-1.jpg`,           alt: 'Sea view from the estate' },
    ],
    amenities: ['Sea View', 'Full Kitchen', 'Air Conditioning', 'Wi-Fi', 'Private Balcony', 'Washing Machine'],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-dafni`,
  },
  {
    id: 4,
    villaKey: 'elia',
    name: 'Elia',
    category: 'Deluxe',
    price: 200,
    size: '20 m²',
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: `${BASE}/2025/02/General-View-of-Elia-rental-residence.jpg`,
    photos: [
      { src: `${BASE}/2025/02/General-View-of-Elia-rental-residence.jpg`,                                    alt: 'Elia villa' },
      { src: `${BASE}/2025/02/Balcony-of-Elia-rental-residence.jpg`,                                         alt: 'Balcony' },
      { src: `${BASE}/2025/02/Parcial-view-of-rental-resince-Elia_2.jpg`,                                    alt: 'Partial view of Elia' },
      { src: `${BASE}/2025/02/Outdoor-patio-area-in-a-garden-setting-of-Elia-rental-residence.jpg`,          alt: 'Outdoor patio in garden setting' },
      { src: `${BASE}/2025/02/Outdoor-dining-area-with-panoramic-view-of-Elia-rental-residence.jpg`,         alt: 'Outdoor dining with panoramic view' },
      { src: `${BASE}/2025/02/Pool-area-of-Elia-rental-residence.jpg`,                                       alt: 'Shared pool area' },
      { src: `${BASE}/2025/02/Bedroom-of-Elia-rental-residence.jpg`,                                         alt: 'Bedroom' },
      { src: `${BASE}/2025/02/Double-Bed-of-Elia-rental-residence_5.jpg`,                                    alt: 'Double bed' },
      { src: `${BASE}/2025/02/Double-Bed-and-wardrobe-of-Elia-rental-residence.jpg`,                         alt: 'Double bed and wardrobe' },
      { src: `${BASE}/2025/02/Console-and-Single-Bed-of-Elia-rental-residence.jpg`,                          alt: 'Console and single bed' },
    ],
    amenities: ['Sea View', 'Shared Pool', 'Air Conditioning', 'Wi-Fi', 'Private Balcony', 'Garden View'],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-elia`,
  },
  {
    id: 5,
    villaKey: 'thymari',
    name: 'Thymari',
    category: 'Villa',
    price: 380,
    size: '90 m²',
    capacity: 7,
    bedrooms: 3,
    bathrooms: 2,
    image: `${BASE}/2025/02/Panoramic-view-of-Thymari-rental-residence.jpg`,
    photos: [
      { src: `${BASE}/2025/02/Panoramic-view-of-Thymari-rental-residence.jpg`,                                                              alt: 'Thymari — panoramic view' },
      { src: `${BASE}/2025/02/Side-view-and-Entrance-of-Thymari-rental-residence.jpg`,                                                      alt: 'Side view and entrance' },
      { src: `${BASE}/2025/02/Balcony-General-view-of-Thymari-rental-residence.jpg`,                                                        alt: 'Balcony — general view' },
      { src: `${BASE}/2025/02/General-view-of-balkony-in-rental-resindence-thymari.jpg`,                                                    alt: 'Balcony overview' },
      { src: `${BASE}/2025/02/percial-view-from-terrace-of-Thymari-rental-residence.jpg`,                                                   alt: 'View from the terrace' },
      { src: `${BASE}/2025/02/Enjoy-Greek-summer-sun-in-the-balcony-of-rental-residence-thymari-.jpg`,                                      alt: 'Enjoying the Greek sun on the balcony' },
      { src: `${BASE}/2025/02/outdoor-table-ideal-for-dinning-and-breakfast-in-the-balcony-of-rental-thymari-residence.jpg`,                alt: 'Outdoor dining table on the balcony' },
      { src: `${BASE}/2025/02/evening-time-enjoy-a-glass-of-wine-in-endless-blue-sea-and-sky.jpg`,                                         alt: 'Evening — sea and sky view' },
      { src: `${BASE}/2025/02/Sitting-Area-of-Thymari-rental-residence.jpg`,                                                               alt: 'Sitting area' },
      { src: `${BASE}/2025/02/Kitchen-and-Dinning-room-of-Thymari-rental-residence.jpg`,                                                   alt: 'Kitchen and dining room' },
      { src: `${BASE}/2025/02/Dinning-table-of-Thymari-rental-residence.jpg`,                                                              alt: 'Dining table' },
      { src: `${BASE}/2025/02/Bedroom_A-of-Thymari-rental-residence.jpg`,                                                                  alt: 'Bedroom A' },
      { src: `${BASE}/2025/02/Bedroom_B-of-Thymari-rental-residence.jpg`,                                                                  alt: 'Bedroom B' },
      { src: `${BASE}/2025/02/Bedroom_C-of-Thymari-rental-residence.jpg`,                                                                  alt: 'Bedroom C' },
      { src: `${BASE}/2025/02/Bathroom_A-of-Thymari-rental-residence.jpg`,                                                                 alt: 'Bathroom A' },
      { src: `${BASE}/2025/02/Bathroom_B-oof-Thymari-rental-residence.jpg`,                                                                alt: 'Bathroom B' },
      { src: `${BASE}/2025/02/Sea-view-Mountain-view-Akros-Eco-Estate.jpg`,                                                                alt: 'Sea and mountain view' },
    ],
    amenities: ['Sea View', 'Full Kitchen', 'Air Conditioning', 'Wi-Fi', 'Private Balcony', 'Washing Machine'],
    badge: 'Largest Villa',
    tourUrl: `${TOUR_BASE}/epidavros-villa-thymari`,
  },
  {
    id: 6,
    villaKey: 'rodia',
    name: 'Rodia',
    category: 'Villa',
    price: 300,
    size: '60 m²',
    capacity: 4,
    bedrooms: 1,
    bathrooms: 1,
    image: `${BASE}/2025/02/rental-residence-Rodia.jpg`,
    photos: [
      { src: `${BASE}/2025/02/rental-residence-Rodia.jpg`,                                                          alt: 'Rodia villa' },
      { src: `${BASE}/2025/02/Rodia_22.jpg`,                                                                        alt: 'Rodia — exterior' },
      { src: `${BASE}/2025/02/Rodia_11.jpg`,                                                                        alt: 'Rodia — garden side' },
      { src: `${BASE}/2025/02/General-Outdoor-sitting-table-and-relax-of-Rodia-rental-residence.jpg`,               alt: 'Outdoor sitting and relax area' },
      { src: `${BASE}/2025/02/Outdoor-sitting-table-and-relax-of-Rodia-rental-residence.jpg`,                       alt: 'Outdoor table' },
      { src: `${BASE}/2025/02/General-view-Living-room-of-Rodia-rental-residence.jpg`,                              alt: 'Living room' },
      { src: `${BASE}/2025/02/Sofa-Beds-Living-room-of-Rodia-rental-residence.jpg`,                                 alt: 'Sofa beds in living room' },
      { src: `${BASE}/2025/02/Dinning-Table-of-Rodia-rental-residence.jpg`,                                         alt: 'Dining table' },
      { src: `${BASE}/2025/02/Kitchen-of-Rodia-rental-residence.jpg`,                                               alt: 'Kitchen' },
      { src: `${BASE}/2025/02/Bedroom-of-Rodia-rental-residence.jpg`,                                               alt: 'Bedroom' },
      { src: `${BASE}/2025/02/General-view-Bedroom-of-Rodia-rental-residence.jpg`,                                  alt: 'Bedroom — general view' },
      { src: `${BASE}/2025/02/Double-Bed-of-Rodia-rental-residence.jpg`,                                            alt: 'Double bed' },
      { src: `${BASE}/2025/02/Bathroom-of-Rodia-rental-residence.jpg`,                                              alt: 'Bathroom' },
      { src: `${BASE}/2025/02/view-entrance-of-Rodia-rental-residence.jpg`,                                         alt: 'Entrance view' },
      { src: `${BASE}/2025/02/General-view-to-the-sea-and-the-mountain-from-Akros-Eco-Estate-4.jpg`,                alt: 'Sea and mountain view from the estate' },
    ],
    amenities: ['Sea View', 'Full Kitchen', 'Air Conditioning', 'Wi-Fi', 'Private Balcony', 'Washing Machine'],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-rodia`,
  },
]
