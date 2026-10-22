
/* src/components/Footer/Footer.jsx */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCheckCircle,
} from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";

import {
  footerNavigation,
  footerServices,
  footerContact,
  footerSocialLinks,
  footerLegalLinks,
} from "./FooterData";

import "./Footer.css";

const SOCIAL_ICONS = {
  instagram: <FaInstagram aria-hidden="true" />,
  facebook: <FaFacebookF aria-hidden="true" />,
  linkedin: <FaLinkedinIn aria-hidden="true" />,
};

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage(
      "Newsletter subscription is not available yet. Please try again later."
    );
  };

  const handleFooterClick = (e, path) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const id = path.substring(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", path);
      } else {
        navigate(`/${path}`);
      }
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-brand-column">
            <Link to="/" className="footer-brand" aria-label="GreenCycle home">
              <span className="footer-brand-icon">
                <LuLeaf aria-hidden="true" />
              </span>

              <span className="footer-brand-name">
                Green<span>Cycle</span>
              </span>
            </Link>

            <p className="footer-description">
              Making waste collection simpler, communities cleaner, and
              responsible disposal easier for everyone.
            </p>

            <div className="footer-social-links" aria-label="Social media">
              {footerSocialLinks.map((social) => {
                const icon =
                  SOCIAL_ICONS[social.id] ||
                  SOCIAL_ICONS[social.label.toLowerCase()];
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    title={social.label}
                    className="footer-social-icon-btn"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-link-column">
            <h2 className="footer-heading">Quick Links</h2>

            <ul className="footer-link-list">
              {footerNavigation.map((item) => (
                <li key={item.label}>
                  {item.path.startsWith("#") ? (
                    <a
                      href={item.path}
                      onClick={(e) => handleFooterClick(e, item.path)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.path}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-link-column">
            <h2 className="footer-heading">Our Services</h2>

            <ul className="footer-link-list">
              {footerServices.map((service) => (
                <li key={service.label}>
                  {service.path.startsWith("#") ? (
                    <a
                      href={service.path}
                      onClick={(e) => handleFooterClick(e, service.path)}
                    >
                      {service.label}
                    </a>
                  ) : (
                    <Link to={service.path}>{service.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact-column">
            <h2 className="footer-heading">Get in Touch</h2>

            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon">
                  <FiMail aria-hidden="true" />
                </span>
                <div>
                  <span className="footer-contact-label">Email us</span>
                  <a href={`mailto:${footerContact.email}`}>
                    {footerContact.email}
                  </a>
                </div>
              </li>

              <li>
                <span className="footer-contact-icon">
                  <FiPhone aria-hidden="true" />
                </span>
                <div>
                  <span className="footer-contact-label">Call us</span>
                  <a
                    href={`tel:${footerContact.phone.replace(/[^\d+]/g, "")}`}
                  >
                    {footerContact.phone}
                  </a>
                </div>
              </li>

              <li>
                <span className="footer-contact-icon">
                  <FiMapPin aria-hidden="true" />
                </span>
                <div>
                  <span className="footer-contact-label">Our location</span>
                  <span>{footerContact.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <div className="footer-newsletter-copy">
            <span className="footer-newsletter-icon">
              <FiCheckCircle aria-hidden="true" />
            </span>

            <div>
              <h2>Be part of a cleaner tomorrow.</h2>
              <p>
                Get updates on waste management and sustainable living.
              </p>
            </div>
          </div>

          <form
            className="footer-newsletter-form"
            onSubmit={handleNewsletterSubmit}
            noValidate
          >
            <label className="visually-hidden" htmlFor="footer-newsletter-email">
              Email address
            </label>

            <input
              id="footer-newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              required
            />

            <button type="submit">
              Subscribe
              <FiArrowUpRight aria-hidden="true" />
            </button>

            {message && (
              <p className="footer-newsletter-message" role="status">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            © {currentYear} GreenCycle. All rights reserved.
          </p>

          <nav className="footer-legal-links" aria-label="Legal information">
            {footerLegalLinks.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="footer-sustainability">
            Designed for a greener future <LuLeaf aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
