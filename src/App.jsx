import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate, useLocation } from "react-router-dom";
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
import { rooms } from "./config";
import "./App.css";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (!scrollTo) return;
    const el =
      document.getElementById(scrollTo) ||
      document.querySelector(".booking-search__iframe-wrap") ||
      document.querySelector(".booking-search__iframe");
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  }, []);

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

function App() {
  return (
    <BrowserRouter>
      <SEO />
      <SpeedInsights />
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:villaKey" element={<VillaRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
