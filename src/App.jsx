import { useEffect } from "react";
import { Routes, Route, Navigate, useParams, useNavigate, useLocation } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingSearch from "./components/BookingSearch";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Amenities from "./components/Amenities";
import Area from "./components/Area";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VillaPage from "./components/VillaPage";
import { BlogList, BlogPost } from "./components/Blog";
import CookieConsent from "./components/CookieConsent";
import { pageView } from "./tracking";
import { rooms } from "./config";
import "./App.css";

function HomePage() {
  const location = useLocation();
  const scrollTo = location.state?.scrollTo;

  useEffect(() => {
    if (!scrollTo) return;
    const el =
      document.getElementById(scrollTo) ||
      document.querySelector(".booking-search__iframe-wrap") ||
      document.querySelector(".booking-search__iframe");
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  }, [scrollTo]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <BookingSearch />
        <Area />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function VillaRoute() {
  const { villaKey } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.villaKey === villaKey);

  if (!room) return <Navigate to="/" replace />;

  const handleBack = (scrollTo) => {
    navigate("/", { state: scrollTo ? { scrollTo } : undefined });
  };

  return <VillaPage room={room} onBack={handleBack} />;
}

// Without a route, Speed Insights groups every page under "Unknown".
function RouteSpeedInsights() {
  const { pathname } = useLocation();
  const route =
    pathname === "/" || pathname === "/blog"
      ? pathname
      : pathname.startsWith("/blog/")
        ? "/blog/[slug]"
        : "/[villaKey]";
  return <SpeedInsights route={route} />;
}

// Ad platforms need a page view per route change in a single-page app.
function RouteTracking() {
  const { pathname } = useLocation();
  useEffect(() => {
    pageView();
  }, [pathname]);
  return null;
}

// The router is supplied by the entry: BrowserRouter in main.jsx,
// StaticRouter in entry-server.jsx for build-time prerendering.
function App() {
  return (
    <>
      <SEO />
      <RouteSpeedInsights />
      <Analytics />
      <RouteTracking />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/:villaKey" element={<VillaRoute />} />
      </Routes>
    </>
  );
}

export default App;
