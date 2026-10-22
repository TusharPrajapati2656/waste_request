// src/pages/home/components/ContactSection.jsx

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { footerContact } from "../../../common/Footer/FooterData";

export default function ContactSection({ contact }) {
  const {
    contactData,
    setContactData,
    contactSubmitted,
    setContactSubmitted,
    contactStatus,
    handleContactSubmit,
  } = contact;

  return (
    <section id="contact" className="section-wrapper" style={{ paddingTop: "2rem" }}>
      <div className="section-header">
        <span className="section-tag">Get in Touch</span>
        <h2 className="section-title">We're Here to Help Keep Cities Clean</h2>
        <p className="section-subtitle">
          Have questions about collection routes, missed pickups, bulk quotes, or recycling audits? 
          Reach our team directly.
        </p>
      </div>

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
              <span>{footerContact.address}</span>
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

          {contactSubmitted ? (
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
              <p style={{ margin: 0, fontSize: "1.45rem", lineHeight: 1.6 }}>{contactStatus}</p>
              <button
                type="button"
                className="btn-primary"
                style={{ marginTop: "2rem" }}
                onClick={() => setContactSubmitted(false)}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="home-contact-name">Full Name</label>
                <input
                  id="home-contact-name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={contactData.name}
                  onChange={(e) =>
                    setContactData({ ...contactData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="home-contact-email">Email Address</label>
                  <input
                    id="home-contact-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={contactData.email}
                    onChange={(e) =>
                      setContactData({ ...contactData, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="home-contact-phone">Phone Number</label>
                  <input
                    id="home-contact-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={contactData.phone}
                    onChange={(e) =>
                      setContactData({ ...contactData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="home-contact-category">Inquiry Subject</label>
                  <select
                    id="home-contact-category"
                    value={contactData.category}
                    onChange={(e) =>
                      setContactData({ ...contactData, category: e.target.value })
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
                  <label htmlFor="home-contact-pin">Area / Pincode</label>
                  <input
                    id="home-contact-pin"
                    type="text"
                    placeholder="e.g. Sector 12"
                    value={contactData.pincode}
                    onChange={(e) =>
                      setContactData({ ...contactData, pincode: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="home-contact-message">Your Message</label>
                <textarea
                  id="home-contact-message"
                  required
                  placeholder="Describe your inquiry, waste volume, or location details..."
                  value={contactData.message}
                  onChange={(e) =>
                    setContactData({ ...contactData, message: e.target.value })
                  }
                />
              </div>

              {contactStatus && !contactSubmitted && (
                <p style={{ color: "var(--error)", margin: 0, fontSize: "1.35rem" }}>
                  {contactStatus}
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
  );
}
