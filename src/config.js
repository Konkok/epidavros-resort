import { imageUrl } from "./media";

// ── Site Identity ────────────────────────────────────────────────────────────
export const SITE_NAME = "Epidavros Villas & Suites | Akros Eco Estate";
export const SITE_URL = "https://akrosecoestate.com";
export const THEME_COLOR = "#94ca3e";

// ── Contact ──────────────────────────────────────────────────────────────────
// BOOKING_RECIPIENT receives enquiry form submissions from the website
export const BOOKING_RECIPIENT = import.meta.env.VITE_BOOKING_RECIPIENT;
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;
export const CONTACT_PHONE = "+30 2110139456";
export const CONTACT_ADDRESS =
  "44th km Corinth–Epidaurus Road, Nea Epidavros, Greece";

// ── Social Media ─────────────────────────────────────────────────────────────
export const SOCIAL_FACEBOOK =
  "https://www.facebook.com/profile.php?id=61573682061893";
export const SOCIAL_INSTAGRAM = "https://www.instagram.com/epidavros_villas/";
export const SOCIAL_TIKTOK = "https://www.tiktok.com/@epidavrosvillas";
export const SOCIAL_LINKEDIN =
  "https://www.linkedin.com/company/epidavros-villas-akros-eco-estate/";

// ── Virtual Tours (thevivestia.com) ──────────────────────────────────────────
export const ESTATE_TOUR_URL =
  "https://my.thevivestia.com/tour/epidavros-villas";

// ── Booking / Holihouse ───────────────────────────────────────────────────────
// Set to true to embed the Holihouse booking portal as an iframe.
// Set to false to use the live Guesty API search widget instead.
export const BOOKING_IFRAME_ENABLED = true;
export const BOOKING_IFRAME_BASE = import.meta.env.VITE_BOOKING_IFRAME_BASE;
// Maps i18n language codes to Holihouse URL slugs (de falls back to en)
export const HOLIHOUSE_LANG_MAP = { en: "en", el: "el", de: "en" };

// ── SEO / Structured Data ────────────────────────────────────────────────────
export const SEO_PHONE = "+302753041000";
export const SEO_EMAIL = "info@epidavrosresort.gr";
export const SEO_OG_IMAGE =
  imageUrl("images/general/Sea-view-Mountain-view-Akros-Eco-Estate-1.jpg", 1600);
export const SEO_ROOMS = 6;
export const SEO_RATING = "4.9";
export const SEO_SAME_AS = [
  "https://epidavrosvillas.holihouse.gr",
  "https://epidavrosrentalvillas.gr",
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_TIKTOK,
  SOCIAL_LINKEDIN,
];
export const GEO = {
  streetAddress: "42nd km of the Isthmus - Epidaurus National Road",
  city: "Nea Epidavros",
  region: "Argolida",
  postalCode: "210 54",
  country: "GR",
  lat: 37.6700983,
  lng: 23.1470858,
};

// ── Rooms / Villas ────────────────────────────────────────────────────────────

const TOUR_BASE = import.meta.env.VITE_VIVESTIA_BASE;

export const SAFETY_KEY_MAP = {
  "Smoke detector": "smokeDetector",
  "Fire extinguisher": "fireExtinguisher",
  "First aid kit": "firstAidKit",
  "Security cameras in common outdoor areas": "securityCameras",
};

export const WELCOME_KEY_MAP = {
  "Complimentary bottle of Moschofilero wine": "wine",
  "Mineral water": "water",
  "Nespresso coffee": "coffee",
  "Tea selection": "tea",
};

export const FAMILY_KEY_MAP = {
  "Baby crib": "babyCrib",
  "High chair": "highChair",
};

export const AMENITY_KEY_MAP = {
  "Private Balcony": "privateBalcony",
  "Sea View": "seaView",
  "King Bed": "kingBed",
  "Soaking Tub": "soakingTub",
  "Air Conditioning": "airConditioning",
  "Mini Bar": "miniBar",
  "Private Terrace": "privateTerrace",
  "Garden View": "gardenView",
  "Queen Bed": "queenBed",
  "Rain Shower": "rainShower",
  Safe: "safe",
  "Double Bed": "doubleBed",
  "En-Suite Bathroom": "enSuiteBathroom",
  "Flat-Screen TV": "flatScreenTV",
  "Wi-Fi": "wifi",
  Balcony: "balcony",
  "2 Bedrooms": "twoBedrooms",
  "Living Area": "livingArea",
  "Large Terrace": "largeTerrace",
  Kitchenette: "kitchenette",
  "Pool Access": "poolAccess",
  "Private Patio": "privatePatio",
  "Stone Walls": "stoneWalls",
  "Outdoor Shower": "outdoorShower",
  "Private Plunge Pool": "privatePlungePool",
  "360° Views": "panoramicViews",
  "Gourmet Kitchen": "gourmetKitchen",
  "Butler Service": "butlerService",
  "Premium Bar": "premiumBar",
  Jacuzzi: "jacuzzi",
  "Full Kitchen": "fullKitchen",
  "Washing Machine": "washingMachine",
  "Shared Pool": "sharedPool",
  "Private Parking": "privateParking",
};

export const rooms = [
  {
    id: 1,
    villaKey: "voukamvilia",
    name: "Voukamvilia",
    category: "Suite",
    price: 280,
    size: "55 m²",
    capacity: 5,
    bedrooms: 2,
    bathrooms: 2,
    image: `images/properties/voukamvilia/Voukamvilia_main-photo.jpg`,
    photos: [
      {
        src: `images/properties/voukamvilia/Voukamvilia_main-photo.jpg`,
        alt: "Voukamvilia — main view",
      },
      {
        src: `images/properties/voukamvilia/General-View-of-Voukamvilia-rental-residence-.jpg`,
        alt: "General view of Voukamvilia",
      },
      {
        src: `images/properties/voukamvilia/Outdoor-dining-area-with-panoramic-view-of-Voukamvilia-rental-residence.jpg`,
        alt: "Outdoor dining with panoramic view",
      },
      {
        src: `images/properties/voukamvilia/Patio-of-Voukamvilia-rental-residence.jpg`,
        alt: "Private patio",
      },
      {
        src: `images/properties/voukamvilia/Outdoor-seating-area-of-Voukamvilia-rental-residence-.jpg`,
        alt: "Outdoor seating area",
      },
      {
        src: `images/properties/voukamvilia/Pool-area-of-Voukamvilia-rental-residence.jpg`,
        alt: "Pool area",
      },
      {
        src: `images/properties/voukamvilia/Bedroom-of-Voukamvilia-_A-rental-residence.jpg`,
        alt: "Bedroom A",
      },
      {
        src: `images/properties/voukamvilia/Double-Bed-of-Voukamvilia-_A-rentalresidence-.jpg`,
        alt: "Double bed — Bedroom A",
      },
      {
        src: `images/properties/voukamvilia/Bedroom-of-of-Voukamvilia_-B-rental-residence.jpg`,
        alt: "Bedroom B",
      },
      {
        src: `images/properties/voukamvilia/Bedroom-Queen-bed-of-of-Voukamvilia_-B-rental-residence.jpg`,
        alt: "Queen bed — Bedroom B",
      },
      {
        src: `images/properties/voukamvilia/Bathroom-of-Voukamvilia-_A-rental-residence.jpg`,
        alt: "Bathroom",
      },
      {
        src: `images/general/Sea-View-Akros-Eco-Estate.jpg`,
        alt: "Sea view from the estate",
      },
      {
        src: `images/general/General-view-to-the-sea-and-the-mountain-from-Akros-Eco-Estate.jpg`,
        alt: "Sea and mountain view",
      },
    ],
    amenities: [
      "Sea View",
      "Shared Pool",
      "Air Conditioning",
      "Wi-Fi",
      "Private Parking",
      "Garden View",
    ],
    familyFriendly: ["Baby crib", "High chair"],
    safety: [
      "Smoke detector",
      "Fire extinguisher",
      "First aid kit",
      "Security cameras in common outdoor areas",
    ],
    welcomeAmenities: [
      "Complimentary bottle of Moschofilero wine",
      "Mineral water",
      "Nespresso coffee",
      "Tea selection",
    ],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-voukamvilia`,
  },
  {
    id: 2,
    villaKey: "gardenia",
    name: "Gardenia",
    category: "Suite",
    price: 180,
    size: "25 m²",
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: `images/properties/gardenia/rental-residence-Gardenia.jpg`,
    photos: [
      {
        src: `images/properties/gardenia/rental-residence-Gardenia.jpg`,
        alt: "Gardenia villa",
      },
      {
        src: `images/properties/gardenia/Gardenia_1.jpg`,
        alt: "Gardenia — exterior view",
      },
      {
        src: `images/properties/gardenia/Outdoor-patio-area-of-Gardenia-rental-residence.jpg`,
        alt: "Outdoor patio",
      },
      {
        src: `images/properties/gardenia/Balkony-of-Gardenia-rental-residence.jpg`,
        alt: "Balcony",
      },
      {
        src: `images/properties/gardenia/Balkony-view-of-Gardenia-rental-residence.jpg`,
        alt: "View from the balcony",
      },
      {
        src: `images/properties/gardenia/Pool-area-of-Gardenia-rental-residence.jpg`,
        alt: "Shared pool area",
      },
      {
        src: `images/properties/gardenia/Bedroom-of-Gardenia-rental-residence.jpg`,
        alt: "Bedroom",
      },
      {
        src: `images/properties/gardenia/Double-Bed-and-Wardrobe-of-Gardenia-rental-residence.jpg`,
        alt: "Double bed and wardrobe",
      },
      {
        src: `images/properties/gardenia/Console-and-single-bed-of-Gardenia-rental-residence.jpg`,
        alt: "Console and single bed",
      },
      {
        src: `images/properties/gardenia/Bathroom-of-Gardenia-rental-residence.jpg`,
        alt: "Bathroom",
      },
      {
        src: `images/properties/gardenia/Bathroom-Washbasin-of-Gardenia-rental-residence.jpg`,
        alt: "Bathroom washbasin",
      },
    ],
    amenities: [
      "Sea View",
      "Shared Pool",
      "Air Conditioning",
      "Wi-Fi",
      "Private Parking",
      "Garden View",
    ],
    safety: [
      "Smoke detector",
      "Fire extinguisher",
      "First aid kit",
      "Security cameras in common outdoor areas",
    ],
    welcomeAmenities: [
      "Complimentary bottle of Moschofilero wine",
      "Mineral water",
      "Nespresso coffee",
      "Tea selection",
    ],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-gardenia`,
  },
  {
    id: 3,
    villaKey: "dafni",
    name: "Dafni",
    category: "Villa",
    price: 220,
    size: "60 m²",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: `images/properties/dafni/Dafni-10-aa.jpg`,
    photos: [
      { src: `images/properties/dafni/Dafni-10-aa.jpg`, alt: "Dafni villa" },
      { src: `images/properties/dafni/Dafni-7.jpg`, alt: "Dafni — exterior" },
      { src: `images/properties/dafni/Dafni-8.jpg`, alt: "Dafni — terrace" },
      { src: `images/properties/dafni/Dafni-living-room-1.jpg`, alt: "Living room" },
      {
        src: `images/properties/dafni/Dafni-living-room-4.jpg`,
        alt: "Living room — seating area",
      },
      { src: `images/properties/dafni/Dafni-kichen_1.jpg`, alt: "Kitchen" },
      { src: `images/properties/dafni/Dafni-kichen_3.jpg`, alt: "Kitchen — details" },
      { src: `images/properties/dafni/Dafni-bedroom_A-3.jpg`, alt: "Bedroom A" },
      {
        src: `images/properties/dafni/Dafni-bedroom_A-4.jpg`,
        alt: "Bedroom A — details",
      },
      { src: `images/properties/dafni/Dafni-bedroom_B-2.jpg`, alt: "Bedroom B" },
      { src: `images/properties/dafni/Dafni-bathroom-1.jpg`, alt: "Bathroom" },
      {
        src: `images/general/Sea-View-Akros-Eco-Estate-1.jpg`,
        alt: "Sea view from the estate",
      },
    ],
    amenities: [
      "Sea View",
      "Full Kitchen",
      "Air Conditioning",
      "Wi-Fi",
      "Private Parking",
      "Washing Machine",
    ],
    familyFriendly: ["Baby crib", "High chair"],
    safety: [
      "Smoke detector",
      "Fire extinguisher",
      "First aid kit",
      "Security cameras in common outdoor areas",
    ],
    welcomeAmenities: [
      "Complimentary bottle of Moschofilero wine",
      "Mineral water",
      "Nespresso coffee",
      "Tea selection",
    ],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-dafni`,
  },
  {
    id: 4,
    villaKey: "elia",
    name: "Elia",
    category: "Suite",
    price: 200,
    size: "24 m²",
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: `images/properties/elia/General-View-of-Elia-rental-residence.jpg`,
    photos: [
      {
        src: `images/properties/elia/General-View-of-Elia-rental-residence.jpg`,
        alt: "Elia villa",
      },
      {
        src: `images/properties/elia/Balcony-of-Elia-rental-residence.jpg`,
        alt: "Balcony",
      },
      {
        src: `images/properties/elia/Parcial-view-of-rental-resince-Elia_2.jpg`,
        alt: "Partial view of Elia",
      },
      {
        src: `images/properties/elia/Outdoor-patio-area-in-a-garden-setting-of-Elia-rental-residence.jpg`,
        alt: "Outdoor patio in garden setting",
      },
      {
        src: `images/properties/elia/Outdoor-dining-area-with-panoramic-view-of-Elia-rental-residence.jpg`,
        alt: "Outdoor dining with panoramic view",
      },
      {
        src: `images/properties/elia/Pool-area-of-Elia-rental-residence.jpg`,
        alt: "Shared pool area",
      },
      {
        src: `images/properties/elia/Bedroom-of-Elia-rental-residence.jpg`,
        alt: "Bedroom",
      },
      {
        src: `images/properties/elia/Double-Bed-of-Elia-rental-residence_5.jpg`,
        alt: "Double bed",
      },
      {
        src: `images/properties/elia/Double-Bed-and-wardrobe-of-Elia-rental-residence.jpg`,
        alt: "Double bed and wardrobe",
      },
      {
        src: `images/properties/elia/Console-and-Single-Bed-of-Elia-rental-residence.jpg`,
        alt: "Console and single bed",
      },
    ],
    amenities: [
      "Sea View",
      "Shared Pool",
      "Air Conditioning",
      "Wi-Fi",
      "Private Parking",
      "Garden View",
    ],
    safety: [
      "Smoke detector",
      "Fire extinguisher",
      "First aid kit",
      "Security cameras in common outdoor areas",
    ],
    welcomeAmenities: [
      "Complimentary bottle of Moschofilero wine",
      "Mineral water",
      "Nespresso coffee",
      "Tea selection",
    ],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-elia`,
  },
  {
    id: 5,
    villaKey: "thymari",
    name: "Thymari",
    category: "Villa",
    price: 380,
    size: "92 m²",
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: `images/properties/thymari/Panoramic-view-of-Thymari-rental-residence.jpg`,
    photos: [
      {
        src: `images/properties/thymari/Panoramic-view-of-Thymari-rental-residence.jpg`,
        alt: "Thymari — panoramic view",
      },
      {
        src: `images/properties/thymari/Side-view-and-Entrance-of-Thymari-rental-residence.jpg`,
        alt: "Side view and entrance",
      },
      {
        src: `images/properties/thymari/Balcony-General-view-of-Thymari-rental-residence.jpg`,
        alt: "Balcony — general view",
      },
      {
        src: `images/properties/thymari/General-view-of-balkony-in-rental-resindence-thymari.jpg`,
        alt: "Balcony overview",
      },
      {
        src: `images/properties/thymari/percial-view-from-terrace-of-Thymari-rental-residence.jpg`,
        alt: "View from the terrace",
      },
      {
        src: `images/properties/thymari/Enjoy-Greek-summer-sun-in-the-balcony-of-rental-residence-thymari-.jpg`,
        alt: "Enjoying the Greek sun on the balcony",
      },
      {
        src: `images/properties/thymari/outdoor-table-ideal-for-dinning-and-breakfast-in-the-balcony-of-rental-thymari-residence.jpg`,
        alt: "Outdoor dining table on the balcony",
      },
      {
        src: `images/general/evening-time-enjoy-a-glass-of-wine-in-endless-blue-sea-and-sky.jpg`,
        alt: "Evening — sea and sky view",
      },
      {
        src: `images/properties/thymari/Sitting-Area-of-Thymari-rental-residence.jpg`,
        alt: "Sitting area",
      },
      {
        src: `images/properties/thymari/Kitchen-and-Dinning-room-of-Thymari-rental-residence.jpg`,
        alt: "Kitchen and dining room",
      },
      {
        src: `images/properties/thymari/Dinning-table-of-Thymari-rental-residence.jpg`,
        alt: "Dining table",
      },
      {
        src: `images/properties/thymari/Bedroom_A-of-Thymari-rental-residence.jpg`,
        alt: "Bedroom A",
      },
      {
        src: `images/properties/thymari/Bedroom_B-of-Thymari-rental-residence.jpg`,
        alt: "Bedroom B",
      },
      {
        src: `images/properties/thymari/Bedroom_C-of-Thymari-rental-residence.jpg`,
        alt: "Bedroom C",
      },
      {
        src: `images/properties/thymari/Bathroom_A-of-Thymari-rental-residence.jpg`,
        alt: "Bathroom A",
      },
      {
        src: `images/properties/thymari/Bathroom_B-oof-Thymari-rental-residence.jpg`,
        alt: "Bathroom B",
      },
      {
        src: `images/general/Sea-view-Mountain-view-Akros-Eco-Estate.jpg`,
        alt: "Sea and mountain view",
      },
    ],
    amenities: [
      "Sea View",
      "Full Kitchen",
      "Air Conditioning",
      "Wi-Fi",
      "Private Parking",
      "Washing Machine",
    ],
    familyFriendly: ["Baby crib", "High chair"],
    safety: [
      "Smoke detector",
      "Fire extinguisher",
      "First aid kit",
      "Security cameras in common outdoor areas",
    ],
    welcomeAmenities: [
      "Complimentary bottle of Moschofilero wine",
      "Mineral water",
      "Nespresso coffee",
      "Tea selection",
    ],
    badge: "Largest Villa",
    tourUrl: `${TOUR_BASE}/epidavros-villa-thymari`,
  },
  {
    id: 6,
    villaKey: "rodia",
    name: "Rodia",
    category: "Villa",
    price: 300,
    size: "65 m²",
    capacity: 4,
    bedrooms: 1,
    bathrooms: 1,
    image: `images/properties/rodia/rental-residence-Rodia.jpg`,
    photos: [
      { src: `images/properties/rodia/rental-residence-Rodia.jpg`, alt: "Rodia villa" },
      { src: `images/properties/rodia/Rodia_22.jpg`, alt: "Rodia — exterior" },
      { src: `images/properties/rodia/Rodia_11.jpg`, alt: "Rodia — garden side" },
      {
        src: `images/properties/rodia/General-Outdoor-sitting-table-and-relax-of-Rodia-rental-residence.jpg`,
        alt: "Outdoor sitting and relax area",
      },
      {
        src: `images/properties/rodia/Outdoor-sitting-table-and-relax-of-Rodia-rental-residence.jpg`,
        alt: "Outdoor table",
      },
      {
        src: `images/properties/rodia/General-view-Living-room-of-Rodia-rental-residence.jpg`,
        alt: "Living room",
      },
      {
        src: `images/properties/rodia/Sofa-Beds-Living-room-of-Rodia-rental-residence.jpg`,
        alt: "Sofa beds in living room",
      },
      {
        src: `images/properties/rodia/Dinning-Table-of-Rodia-rental-residence.jpg`,
        alt: "Dining table",
      },
      {
        src: `images/properties/rodia/Kitchen-of-Rodia-rental-residence.jpg`,
        alt: "Kitchen",
      },
      {
        src: `images/properties/rodia/Bedroom-of-Rodia-rental-residence.jpg`,
        alt: "Bedroom",
      },
      {
        src: `images/properties/rodia/General-view-Bedroom-of-Rodia-rental-residence.jpg`,
        alt: "Bedroom — general view",
      },
      {
        src: `images/properties/rodia/Double-Bed-of-Rodia-rental-residence.jpg`,
        alt: "Double bed",
      },
      {
        src: `images/properties/rodia/Bathroom-of-Rodia-rental-residence.jpg`,
        alt: "Bathroom",
      },
      {
        src: `images/properties/rodia/view-entrance-of-Rodia-rental-residence.jpg`,
        alt: "Entrance view",
      },
      {
        src: `images/general/General-view-to-the-sea-and-the-mountain-from-Akros-Eco-Estate-4.jpg`,
        alt: "Sea and mountain view from the estate",
      },
    ],
    amenities: [
      "Sea View",
      "Full Kitchen",
      "Air Conditioning",
      "Wi-Fi",
      "Private Parking",
      "Washing Machine",
    ],
    familyFriendly: ["Baby crib", "High chair"],
    safety: [
      "Smoke detector",
      "Fire extinguisher",
      "First aid kit",
      "Security cameras in common outdoor areas",
    ],
    welcomeAmenities: [
      "Complimentary bottle of Moschofilero wine",
      "Mineral water",
      "Nespresso coffee",
      "Tea selection",
    ],
    badge: null,
    tourUrl: `${TOUR_BASE}/epidavros-villa-rodia`,
  },
];
