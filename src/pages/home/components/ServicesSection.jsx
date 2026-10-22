// src/pages/home/components/ServicesSection.jsx

import { Link } from "react-router-dom";
import { FiCheckCircle, FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { LuCoins, LuCheck } from "react-icons/lu";

export default function ServicesSection({ servicesBooking }) {
  const {
    activeServiceTab,
    setActiveServiceTab,
    searchCheckerQuery,
    setSearchCheckerQuery,
    selectedService,
    setSelectedService,
    bookingSuccess,
    createdRequestId,
    resetBookingModal,
    bookingData,
    setBookingData,
    handleBookingSubmit,
    filteredServices,
    filteredCheckerItems,
  } = servicesBooking;

  return (
    <section id="services" className="section-wrapper" style={{ paddingTop: "2rem" }}>
      <div className="section-header">
        <span className="section-tag">Our Services</span>
        <h2 className="section-title">Tailored Waste Solutions for Homes & Businesses</h2>
        <p className="section-subtitle">
          Reliable, on-schedule collection services built with state-of-the-art segregation 
          standards and verified environmental compliance.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="service-tabs" role="tablist">
        <button
          className={`service-tab-btn ${activeServiceTab === "all" ? "active" : ""}`}
          onClick={() => setActiveServiceTab("all")}
        >
          All Services
        </button>
        <button
          className={`service-tab-btn ${activeServiceTab === "residential" ? "active" : ""}`}
          onClick={() => setActiveServiceTab("residential")}
        >
          Residential
        </button>
        <button
          className={`service-tab-btn ${activeServiceTab === "commercial" ? "active" : ""}`}
          onClick={() => setActiveServiceTab("commercial")}
        >
          Commercial
        </button>
        <button
          className={`service-tab-btn ${activeServiceTab === "recyclables" ? "active" : ""}`}
          onClick={() => setActiveServiceTab("recyclables")}
        >
          Recyclables
        </button>
        <button
          className={`service-tab-btn ${activeServiceTab === "bulk" ? "active" : ""}`}
          onClick={() => setActiveServiceTab("bulk")}
        >
          Bulk Waste
        </button>
        <button
          className={`service-tab-btn ${activeServiceTab === "hazardous" ? "active" : ""}`}
          onClick={() => setActiveServiceTab("hazardous")}
        >
          Hazardous
        </button>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            {/* Top row: Icon + Title on left, Badge on right */}
            <div className="service-card-top">
              <div className="service-card-header-left">
                <div className="service-card-icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
              </div>

              {service.badge && (
                <span className="service-badge">
                  {service.badgeIcon}
                  <span>{service.badge}</span>
                </span>
              )}
            </div>

            {/* Description */}
            <p className="service-card-desc">{service.description}</p>

            {/* Features 2x2 Grid with vertical divider */}
            <div className="service-features-grid">
              <div className="service-features-col">
                {service.features
                  .filter((_, idx) => idx % 2 === 0)
                  .map((feat, idx) => (
                    <div key={idx} className="service-feature-item">
                      <span className="service-feature-icon" aria-hidden="true">
                        {feat.icon || <LuCheck />}
                      </span>
                      <span className="service-feature-text">
                        {feat.text || feat}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="service-features-divider" aria-hidden="true" />

              <div className="service-features-col">
                {service.features
                  .filter((_, idx) => idx % 2 !== 0)
                  .map((feat, idx) => (
                    <div key={idx} className="service-feature-item">
                      <span className="service-feature-icon" aria-hidden="true">
                        {feat.icon || <LuCheck />}
                      </span>
                      <span className="service-feature-text">
                        {feat.text || feat}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Horizontal Divider */}
            <div className="service-card-divider" aria-hidden="true" />

            {/* Footer: Price with Coins icon + Book Service Button */}
            <div className="service-card-footer">
              <div className="service-price-wrap">
                <span className="service-price-icon" aria-hidden="true">
                  <LuCoins />
                </span>
                <div className="service-price-copy">
                  <span className="price-val">{service.price}</span>
                  <span className="price-sub">{service.turnaround}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-book-service"
                onClick={() => setSelectedService(service)}
              >
                <span>Book Service</span>
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Waste Classification / Can I Recycle This? Widget */}
      <div className="checker-box" style={{ marginTop: "6rem" }}>
        <span className="section-tag">Instant Segregation Guide</span>
        <h2 className="section-title">Can I Recycle This?</h2>
        <p className="section-subtitle">
          Search any household material to check whether GreenCycle collects it and how to pack it safely.
        </p>

        <div className="checker-input-wrap">
          <FiSearch style={{ fontSize: "2rem", color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search items like batteries, cardboard, styrofoam, paint..."
            value={searchCheckerQuery}
            onChange={(e) => setSearchCheckerQuery(e.target.value)}
          />
        </div>

        <div className="checker-results">
          {filteredCheckerItems.map((item) => (
            <div
              key={item.item}
              className={`checker-item ${item.accepted ? "" : "not-accepted"}`}
            >
              <div className="checker-info">
                <h4>{item.item}</h4>
                <p>Category: <strong>{item.category}</strong> • {item.tip}</p>
              </div>
              <span
                className={`checker-status-badge ${
                  item.accepted ? "accepted" : "restricted"
                }`}
              >
                {item.accepted ? "Accepted" : "Depot Only"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div
          className="service-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetBookingModal();
          }}
        >
          <div className="service-modal" role="dialog" aria-modal="true">
            <button
              className="auth-close"
              type="button"
              onClick={resetBookingModal}
              aria-label="Close booking modal"
            >
              <FiX />
            </button>

            <span className="section-tag">Step 1: Create Request</span>
            <h2 style={{ margin: "0.8rem 0 0.4rem", fontSize: "2.2rem" }}>
              Request {selectedService.title}
            </h2>
            <p style={{ margin: "0 0 2rem", color: "var(--text-secondary)", fontSize: "1.4rem" }}>
              Estimated rate: <strong>{selectedService.price}</strong> • {selectedService.turnaround}
            </p>

            {bookingSuccess ? (
              <div
                style={{
                  padding: "3.2rem",
                  textAlign: "center",
                  background: "var(--primary-light)",
                  borderRadius: "var(--radius-lg)",
                  color: "var(--primary-dark)",
                }}
              >
                <FiCheckCircle style={{ fontSize: "4.5rem", margin: "0 auto 1.4rem", color: "var(--primary)" }} />
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "2.2rem" }}>Pickup Request Created!</h3>
                <p style={{ margin: "0 0 1.6rem", fontSize: "1.45rem" }}>
                  Your request has been logged. Use this unique tracking ID to track real-time collection updates:
                </p>
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.8rem 1.8rem",
                    background: "var(--surface)",
                    border: "0.15rem solid var(--primary)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "2rem",
                    fontWeight: "800",
                    color: "var(--primary-dark)",
                    letterSpacing: "0.08em",
                    marginBottom: "2rem",
                  }}
                >
                  {createdRequestId}
                </div>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link
                    to={`/my-requests?id=${createdRequestId}`}
                    className="btn-primary"
                    style={{ textDecoration: "none" }}
                  >
                    Track This Pickup <FiArrowRight />
                  </Link>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={resetBookingModal}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="service-client-name">Your Full Name *</label>
                  <input
                    id="service-client-name"
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service-client-phone">Phone Number *</label>
                    <input
                      id="service-client-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={bookingData.phone}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-client-email">Email (Optional)</label>
                    <input
                      id="service-client-email"
                      type="email"
                      placeholder="you@example.com"
                      value={bookingData.email}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service-client-date">Preferred Pickup Date *</label>
                    <input
                      id="service-client-date"
                      type="date"
                      required
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-client-slot">Preferred Slot *</label>
                    <select
                      id="service-client-slot"
                      value={bookingData.timeSlot}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, timeSlot: e.target.value })
                      }
                    >
                      <option value="Morning (8:00 AM - 11:30 AM)">Morning (8:00 AM - 11:30 AM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (5:00 PM - 7:30 PM)">Evening (5:00 PM - 7:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service-client-address">Pickup Address & House/Flat *</label>
                  <input
                    id="service-client-address"
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Green Meadows, Sector 14"
                    value={bookingData.address}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, address: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service-client-pin">Pincode / Area</label>
                    <input
                      id="service-client-pin"
                      type="text"
                      placeholder="e.g. 110001"
                      value={bookingData.pincode}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, pincode: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-client-volume">Estimated Volume / Bags</label>
                    <input
                      id="service-client-volume"
                      type="text"
                      placeholder="e.g. 2 bags cardboard / ~8 kg"
                      value={bookingData.volume}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, volume: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service-client-notes">Access or Driver Instructions</label>
                  <input
                    id="service-client-notes"
                    type="text"
                    placeholder="e.g. Ring bell, 2nd floor, elevator available"
                    value={bookingData.notes}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, notes: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="btn-calculate" style={{ marginTop: "1rem" }}>
                  Submit Pickup Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
