// src/pages/ContactUs.jsx

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { footerContact } from "../common/Footer/FooterData";
import "./ContactUs.css";

export default function ContactUs() {
  const [searchParams] = useSearchParams();
  const prefilledType = searchParams.get("type") || "general";
  const prefilledPin = searchParams.get("pin") || "";
  const prefilledDate = searchParams.get("date") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: prefilledType,
    pincode: prefilledPin,
    message: prefilledDate ? `Inquiry for pickup scheduled on: ${prefilledDate}` : "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatusMessage("Please fill in your name, email, and phone number.");
      return;
    }

    setIsSubmitted(true);
    setStatusMessage("Thank you! Our operations team has received your message and will respond within 15 minutes.");
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="hero-badge">
            <FiPhone aria-hidden="true" />
            <span>24/7 Citizen Support</span>
          </span>
          <h1 className="hero-title" style={{ marginTop: "1.6rem" }}>
            We're Here to <span>Help Keep Cities Clean</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: "1.6rem auto 0" }}>
            Have questions about collection routes, missed pickups, bulk quotes, or recycling audits? 
            Reach our team directly.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="section-wrapper">
        <div className="contact-layout">
          {/* Left Info Panel */}
          <div className="contact-info-panel">
            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <FiPhone />
              </div>
              <div>
                <h3>Phone & Dispatch Helpline</h3>
                <p>Monday - Saturday: 7:00 AM - 8:00 PM</p>
                <a href={`tel:${footerContact.phone}`}>{footerContact.phone}</a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <FiMail />
              </div>
              <div>
                <h3>Email Inquiries</h3>
                <p>Typical response time under 15 minutes</p>
                <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <FiMapPin />
              </div>
              <div>
                <h3>Central Recovery & Depot Hub</h3>
                <p>Waste Segregation & Materials Transfer Station</p>
                <span>GreenCycle Eco-Park, Sector 18, Clean City Hub</span>
              </div>
            </div>

            <div className="emergency-notice">
              <FiAlertCircle style={{ fontSize: "2.4rem", color: "var(--error)", flexShrink: 0 }} />
              <div>
                <h4>Emergency or Hazardous Spill?</h4>
                <p>
                  For medical waste violations, chemical leaks, or roadside hazards, 
                  call our immediate 24/7 rapid dispatch line: <strong>1800-GREENCYCLE</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="contact-form-panel">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and an operations supervisor will contact you shortly.</p>

            {isSubmitted ? (
              <div
                style={{
                  padding: "3.2rem",
                  background: "var(--primary-light)",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  color: "var(--primary-dark)",
                }}
              >
                <FiCheckCircle style={{ fontSize: "4.5rem", margin: "0 auto 1.4rem" }} />
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "2.2rem" }}>Message Dispatched!</h3>
                <p style={{ margin: 0, fontSize: "1.45rem", lineHeight: 1.6 }}>{statusMessage}</p>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ marginTop: "2rem" }}
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-category">Inquiry Subject</label>
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="general">General Question</option>
                      <option value="recyclables">Household Recyclables Pickup</option>
                      <option value="bulk">Bulk Furniture / Debris Removal</option>
                      <option value="missed">Report Missed Collection</option>
                      <option value="commercial">Commercial / Society Partnership</option>
                      <option value="hazardous">Hazardous Waste Disposal</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-pin">Area / Pincode</label>
                    <input
                      id="contact-pin"
                      type="text"
                      placeholder="e.g. Sector 12"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    required
                    placeholder="Describe your inquiry, waste volume, or location details..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                {statusMessage && !isSubmitted && (
                  <p style={{ color: "var(--error)", margin: 0, fontSize: "1.35rem" }}>
                    {statusMessage}
                  </p>
                )}

                <button type="submit" className="btn-calculate">
                  Send Inquiry Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
