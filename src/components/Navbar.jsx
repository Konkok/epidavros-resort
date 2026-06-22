import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/logo.png";
import "./styling/Navbar.css";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const scrollToIframe = (e) => {
    e.preventDefault();
    closeMenu();
    const target =
      document.querySelector(".booking-search__iframe-wrap") ||
      document.querySelector(".booking-search__iframe") ||
      document.getElementById("availability");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.accommodation"), href: "#rooms" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.amenities"), href: "#amenities" },
    {
      label: t("nav.availability"),
      href: "#availability",
      onClick: scrollToIframe,
    },
    { label: t("nav.area"), href: "#area" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={closeMenu}>
          <img
            src={logo}
            alt="Epidavros Villas & Suites – Akros Eco Farm"
            className="navbar__logo-img"
          />
        </a>

        <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={link.onClick || closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#availability"
            className="btn btn-primary navbar__cta"
            onClick={scrollToIframe}
          >
            {t("nav.bookNow")}
          </a>
          <LanguageSwitcher />
        </nav>

        <button
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && <div className="navbar__backdrop" onClick={closeMenu} />}
    </header>
  );
}
