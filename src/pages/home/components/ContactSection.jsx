// src/pages/home/components/ContactSection.jsx

import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import {
  LuPhone,
  LuMail,
  LuMapPin,
  LuChevronRight,
  LuUser,
  LuFileText,
  LuMessageSquare,
  LuSend,
  LuShieldCheck,
} from "react-icons/lu";
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
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="section-header" style={{ marginBottom: "5rem" }}>
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">We're Here to Help Keep Cities Clean</h2>
          <p className="section-subtitle">
            Have questions about collection routes, missed pickups, bulk quotes, or recycling audits? 
            Reach our team directly.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Column: 4 Distinct Contact Detail & Alert Cards */}
          <div className="contact-info-panel">
            {/* 1. Phone Card */}
            <div className="contact-card">
              <div className="contact-card-icon" aria-hidden="true">
                <LuPhone />
              </div>
              <div className="contact-card-content">
                <h3>Phone & Dispatch Helpline</h3>
                <p>Monday - Saturday · 7:00 AM - 8:00 PM</p>
                <a href={`tel:${footerContact.phone.replace(/[^\d+]/g, "")}`} className="contact-link-value">
                  {footerContact.phone}
                </a>
              </div>
              <span className="contact-arrow-badge" aria-hidden="true">
                <LuChevronRight />
              </span>
            </div>

            {/* 2. Email Card */}
            <div className="contact-card">
              <div className="contact-card-icon" aria-hidden="true">
                <LuMail />
              </div>
              <div className="contact-card-content">
                <h3>Email Inquiries</h3>
                <p>Typical response under 15 minutes</p>
                <a href={`mailto:${footerContact.email}`} className="contact-link-value">
                  {footerContact.email}
                </a>
              </div>
              <span className="contact-arrow-badge" aria-hidden="true">
                <LuChevronRight />
              </span>
            </div>

            {/* 3. Depot Location Card */}
            <div className="contact-card">
              <div className="contact-card-icon" aria-hidden="true">
                <LuMapPin />
              </div>
              <div className="contact-card-content">
                <h3>Central Recovery & Depot Hub</h3>
                <p>Waste Segregation & Materials Transfer Station</p>
                <span className="contact-address-value">
                  {footerContact.address}
                </span>
              </div>
              <span className="contact-arrow-badge" aria-hidden="true">
                <LuChevronRight />
              </span>
            </div>

            {/* 4. Emergency Spill Alert Card */}
            <div className="emergency-notice-card">
              <div className="emergency-icon-badge" aria-hidden="true">
                <FiAlertTriangle />
              </div>
              <div className="emergency-content">
                <h4>Emergency or Hazardous Spill?</h4>
                <p>
                  Call <strong>1800-GREENCYCLE</strong> for immediate 24/7 dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Card */}
          <div className="contact-form-panel">
            <div className="contact-form-tag">
              <span className="tag-dot" aria-hidden="true" />
              <span>CONTACT OUR TEAM</span>
              <span className="tag-line" aria-hidden="true" />
            </div>

            <h2 className="contact-form-title">Send us a message</h2>
            <p className="contact-form-subtitle">
              Tell us how we can help and our operations team will get back to you.
            </p>

            {contactSubmitted ? (
              <div className="contact-submitted-box">
                <FiCheckCircle style={{ fontSize: "4.5rem", margin: "0 auto 1.4rem", color: "var(--primary)" }} />
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
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="home-contact-name">Full Name</label>
                  <div className="input-with-icon">
                    <LuUser className="field-icon" aria-hidden="true" />
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
                </div>

                {/* Email & Phone Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="home-contact-email">Email Address</label>
                    <div className="input-with-icon">
                      <LuMail className="field-icon" aria-hidden="true" />
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
                  </div>

                  <div className="form-group">
                    <label htmlFor="home-contact-phone">Phone Number</label>
                    <div className="input-with-icon">
                      <LuPhone className="field-icon" aria-hidden="true" />
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
                </div>

                {/* Inquiry Subject & Area Pincode Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="home-contact-category">Inquiry Subject</label>
                    <div className="input-with-icon">
                      <LuFileText className="field-icon" aria-hidden="true" />
                      <select
                        id="home-contact-category"
                        value={contactData.category}
                        onChange={(e) =>
                          setContactData({ ...contactData, category: e.target.value })
                        }
                      >
                        <option value="general">General Question</option>
                        <option value="pickup">Pickup Scheduling Help</option>
                        <option value="commercial">Commercial Partnership</option>
                        <option value="missed">Report Missed Collection</option>
                        <option value="hazardous">Hazardous Disposal</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="home-contact-pin">Area / Pincode</label>
                    <div className="input-with-icon">
                      <LuMapPin className="field-icon" aria-hidden="true" />
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
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="home-contact-message">Your Message</label>
                  <div className="textarea-with-icon">
                    <LuMessageSquare className="field-icon-textarea" aria-hidden="true" />
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
                </div>

                {contactStatus && !contactSubmitted && (
                  <p className="contact-error-text">
                    {contactStatus}
                  </p>
                )}

                {/* Send Button */}
                <button type="submit" className="btn-send-inquiry">
                  <LuSend aria-hidden="true" />
                  <span>Send Inquiry</span>
                </button>

                {/* Trust Badge */}
                <div className="contact-trust-badge">
                  <LuShieldCheck className="trust-icon" aria-hidden="true" />
                  <span>Your information stays private.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
