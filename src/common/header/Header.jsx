// src/components/Header/Header.jsx

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";

import { navigationLinks } from "./HeaderData";
import AuthModal from "./AuthModal";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const openAuth = () => {
    closeMenu();
    setIsAuthOpen(true);
  };

  // Track active section as the user scrolls
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionIds = ["home", "services", "faq", "about", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isItemActive = (item) => {
    if (item.path.startsWith("/")) {
      return location.pathname === item.path;
    }
    return location.pathname === "/" && activeSection === item.id;
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    closeMenu();

    if (item.path.startsWith("/")) {
      navigate(item.path);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${item.path}`);
      return;
    }

    const target = document.getElementById(item.id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", item.path);
      setActiveSection(item.id);
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <Link
            to="/#home"
            className="header-brand"
            aria-label="GreenCycle home"
            onClick={(e) => handleNavClick(e, { path: "#home", id: "home" })}
          >
            <span className="brand-icon">
              <LuLeaf aria-hidden="true" />
            </span>

            <span className="brand-copy">
              <span className="brand-name">
                Green<span>Cycle</span>
              </span>
              <span className="brand-tagline">Waste management made easy</span>
            </span>
          </Link>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <nav
            id="primary-navigation"
            className={`header-navigation ${
              isMenuOpen ? "is-open" : ""
            }`}
            aria-label="Main navigation"
          >
            <ul className="navigation-list">
              {navigationLinks.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`navigation-link ${
                      isItemActive(item) ? "active" : ""
                    }`}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="header-actions">
              <button
                type="button"
                className="login-button"
                onClick={openAuth}
              >
                Login
              </button>

              <button
                type="button"
                className="signup-button"
                onClick={openAuth}
              >
                Get Started
                <FiArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}