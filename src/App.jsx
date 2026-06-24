import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
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
import "./App.css";

function App() {
  const [selectedVilla, setSelectedVilla] = useState(null);

  if (selectedVilla) {
    return (
      <>
        <SEO />
        <VillaPage room={selectedVilla} onBack={() => setSelectedVilla(null)} />
      </>
    );
  }

  return (
    <>
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms onSelectVilla={setSelectedVilla} />
        <Amenities />
        <BookingSearch />
        <Area />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
    </>
  );
}

export default App;
