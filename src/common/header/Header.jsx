// src/components/Header/Header.jsx

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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

  const closeMenu = () => setIsMenuOpen(false);

  const openAuth = () => {
    closeMenu();
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <Link
            to="/"
            className="header-brand"
            aria-label="GreenCycle home"
            onClick={closeMenu}
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
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `navigation-link ${isActive ? "active" : ""}`
                    }
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
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