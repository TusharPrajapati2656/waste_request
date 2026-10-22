// src/pages/home/components/ContactSection.jsx

import React from "react";
import { FiAlertTriangle, FiCheckCircle, FiTruck } from "react-icons/fi";
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
  LuClock,
  LuRecycle,
  LuHeadphones,
} from "react-icons/lu";
import SectionHeaderBadge from "../../../common/SectionBadge/SectionHeaderBadge";
import { footerContact } from "../../../common/Footer/FooterData";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";
import contactHeadset from "../../../assets/image/contact_headset.png";
import contactMap from "../../../assets/image/contact_map.png";
import contactLeaves from "../../../assets/image/contact_leaves.png";
import "../style/ContactSection.css";

const subjectOptions = [
  { value: "general", label: "General Question" },
  { value: "pickup", label: "Pickup Scheduling Help" },
  { value: "commercial", label: "Commercial Partnership" },
  { value: "missed", label: "Report Missed Collection" },
  { value: "hazardous", label: "Hazardous Disposal" },
];

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
        {/* Top Section Header with Heading and Label */}
        <div className="section-header">
          <SectionHeaderBadge icon={<LuHeadphones />} />
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">
            We're Here to Help Keep Cities Clean
          </h2>
          <p className="section-subtitle">
            Have questions about collection routes, missed pickups, bulk quotes,
            or recycling audits? Reach our team directly.
          </p>
        </div>

        <div className="contact-dual-grid">
          {/* ========================================================
              LEFT CARD: Contact Details, Map & 24/7 Hotline
             ======================================================== */}
          <div className="contact-card-main contact-info-card">
            {/* Header with Title and 3D Headset Illustration */}
            <div className="contact-card-header">
              <div className="contact-card-header-left">
                <div className="contact-card-tag">
                  <span className="tag-dot" aria-hidden="true" />
                  <span>CONTACT US</span>
                </div>
                <h2 className="contact-main-title">We're Here to Help</h2>
                <p className="contact-main-desc">
                  Have a question, need support, or want to partner with us? Our
                  team is just a message away.
                </p>
              </div>

              <div className="contact-card-header-art" aria-hidden="true">
                <img
                  src={contactHeadset}
                  alt="Customer Support Headset"
                  className="contact-headset-art"
                />
              </div>
            </div>

            {/* Row 1: Two Quick Contact Channels Side-by-Side */}
            <div className="contact-channels-grid">
              {/* Phone & Dispatch */}
              <div className="contact-channel-card">
                <div className="channel-icon-wrap" aria-hidden="true">
                  <LuPhone />
                </div>
                <div className="channel-info">
                  <div className="channel-top">
                    <h4>Phone & Dispatch</h4>
                    <span className="channel-badge">Mon - Sat</span>
                  </div>
                  <a
                    href={`tel:${footerContact.phone.replace(/[^\d+]/g, "")}`}
                    className="channel-link"
                  >
                    {footerContact.phone}
                  </a>
                  <span className="channel-meta">7:00 AM - 8:00 PM</span>
                </div>
              </div>

              {/* Email Support */}
              <div className="contact-channel-card">
                <div className="channel-icon-wrap" aria-hidden="true">
                  <LuMail />
                </div>
                <div className="channel-info">
                  <div className="channel-top">
                    <h4>Email Support</h4>
                    <span className="channel-badge">&lt; 15m reply</span>
                  </div>
                  <a
                    href={`mailto:${footerContact.email}`}
                    className="channel-link"
                    title={footerContact.email}
                  >
                    {footerContact.email}
                  </a>
                  <span className="channel-meta">Online ticketing 24/7</span>
                </div>
              </div>
            </div>

            {/* Row 2: Central Recovery & Depot Hub with Visual Map & Facility Timings */}
            <div className="contact-depot-hub-card">
              <div className="depot-header">
                <div
                  className="channel-icon-wrap depot-icon-wrap"
                  aria-hidden="true"
                >
                  <LuMapPin />
                </div>
                <div className="depot-header-info">
                  <div className="depot-title-row">
                    <h4>Central Recovery & Depot Hub</h4>
                    <span className="depot-badge">
                      <FiTruck
                        className="depot-badge-icon"
                        aria-hidden="true"
                      />
                      <span>Drop-offs Welcome</span>
                    </span>
                  </div>
                  <span className="depot-address">{footerContact.address}</span>
                  <span className="depot-type">
                    Waste Segregation & Materials Transfer Station
                  </span>
                </div>
              </div>

              {/* Sub-grid: Map Visual & Timings */}
              <div className="depot-details-row">
                <div className="depot-map-box">
                  <img
                    src={contactMap}
                    alt="GreenCycle Eco-Park Location Map"
                    className="depot-map-img"
                  />
                </div>

                <div className="depot-timings-box">
                  <div className="timings-title">
                    <LuClock className="timings-icon" aria-hidden="true" />
                    <span>Facility Timings</span>
                  </div>
                  <div className="timings-content">
                    <p className="timings-open">Mon - Sat: 7:00 AM - 8:00 PM</p>
                    <p className="timings-closed">Sunday: Closed</p>
                  </div>
                  <div className="timings-deco-leaf" aria-hidden="true">
                    <LuRecycle />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Emergency / Hazardous Spill Alert Card */}
            <div className="emergency-alert-card">
              <div className="emergency-alert-icon" aria-hidden="true">
                <FiAlertTriangle />
              </div>
              <div className="emergency-alert-content">
                <h5>Emergency or Hazardous Spill?</h5>
                <p>
                  Call <strong>1800-GREENCYCLE</strong> for immediate 24/7
                  priority dispatch.
                </p>
              </div>
              <div className="emergency-arrow" aria-hidden="true">
                <LuChevronRight />
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT CARD: Clean Message Form Card
             ======================================================== */}
          <div className="contact-card-main contact-form-card">
            <div className="contact-card-header">
              <div className="contact-card-header-left">
                <div className="contact-card-tag">
                  <span className="tag-dot" aria-hidden="true" />
                  <span>SEND US A MESSAGE</span>
                </div>
                <h2 className="contact-main-title">Get in Touch</h2>
                <p className="contact-main-desc">
                  Tell us how we can help and our operations team will get back
                  to you.
                </p>
              </div>

              <div className="contact-card-header-art" aria-hidden="true">
                <img
                  src={contactLeaves}
                  alt="Decorative Leaves"
                  className="contact-leaves-art"
                />
              </div>
            </div>

            {contactSubmitted ? (
              <div className="contact-submitted-box">
                <FiCheckCircle
                  style={{
                    fontSize: "4.5rem",
                    margin: "0 auto 1.4rem",
                    color: "var(--primary)",
                  }}
                />
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "2.2rem" }}>
                  Message Dispatched!
                </h3>
                <p style={{ margin: 0, fontSize: "1.45rem", lineHeight: 1.6 }}>
                  {contactStatus}
                </p>
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
              <form
                onSubmit={handleContactSubmit}
                className="contact-form-flow"
              >
                {/* Row 1: Full Name & Email Address */}
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="home-contact-name">
                      Full Name <span className="req-star">*</span>
                    </label>
                    <div className="contact-input-wrap">
                      <LuUser className="field-icon" aria-hidden="true" />
                      <input
                        id="home-contact-name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={contactData.name}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="contact-form-field">
                    <label htmlFor="home-contact-email">
                      Email Address <span className="req-star">*</span>
                    </label>
                    <div className="contact-input-wrap">
                      <LuMail className="field-icon" aria-hidden="true" />
                      <input
                        id="home-contact-email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={contactData.email}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone Number & Area/Pincode */}
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="home-contact-phone">
                      Phone Number <span className="req-star">*</span>
                    </label>
                    <div className="contact-input-wrap">
                      <LuPhone className="field-icon" aria-hidden="true" />
                      <input
                        id="home-contact-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={contactData.phone}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="contact-form-field">
                    <label htmlFor="home-contact-pin">Area / Pincode</label>
                    <div className="contact-input-wrap">
                      <LuMapPin className="field-icon" aria-hidden="true" />
                      <input
                        id="home-contact-pin"
                        type="text"
                        placeholder="e.g. Sector 12 or 110001"
                        value={contactData.pincode}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Inquiry Subject */}
                <div className="contact-form-field">
                  <label htmlFor="home-contact-category">
                    Inquiry Subject <span className="req-star">*</span>
                  </label>
                  <CustomDropdown
                    id="home-contact-category"
                    options={subjectOptions}
                    value={contactData.category}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        category: e.target.value,
                      })
                    }
                    icon={<LuFileText />}
                    placeholder="Select a subject"
                    ariaLabel="Inquiry Subject"
                  />
                </div>

                {/* Row 4: Your Message */}
                <div className="contact-form-field">
                  <label htmlFor="home-contact-message">
                    Your Message <span className="req-star">*</span>
                  </label>
                  <div className="contact-textarea-wrap">
                    <LuMessageSquare
                      className="field-icon textarea-icon"
                      aria-hidden="true"
                    />
                    <textarea
                      id="home-contact-message"
                      required
                      maxLength={500}
                      placeholder="Describe your inquiry, waste volume, or location details..."
                      value={contactData.message}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          message: e.target.value,
                        })
                      }
                    />
                    <span className="char-counter">
                      {(contactData.message || "").length}/500
                    </span>
                  </div>
                </div>

                {contactStatus && !contactSubmitted && (
                  <p className="contact-error-text">{contactStatus}</p>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn-send-inquiry-primary">
                  <LuSend className="send-icon" aria-hidden="true" />
                  <span>Send Inquiry</span>
                </button>

                {/* Privacy Trust Badge */}
                <div className="contact-trust-pill">
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
