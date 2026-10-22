// src/pages/home/components/ServicesSection.jsx

import { FiCheckCircle, FiSearch, FiX } from "react-icons/fi";

export default function ServicesSection({ servicesBooking }) {
  const {
    activeServiceTab,
    setActiveServiceTab,
    searchCheckerQuery,
    setSearchCheckerQuery,
    selectedService,
    setSelectedService,
    bookingSuccess,
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
            <span className="service-badge">{service.badge}</span>
            <div className="service-card-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>

            <ul className="service-features">
              {service.features.map((feat) => (
                <li key={feat}>
                  <FiCheckCircle aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="service-footer">
              <div className="service-price">
                <span className="price-val">{service.price}</span>
                <span className="price-sub">{service.turnaround}</span>
              </div>
              <button
                type="button"
                className="btn-book-service"
                onClick={() => setSelectedService(service)}
              >
                Book Service
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
            if (e.target === e.currentTarget) setSelectedService(null);
          }}
        >
          <div className="service-modal" role="dialog" aria-modal="true">
            <button
              className="auth-close"
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Close booking modal"
            >
              <FiX />
            </button>

            <span className="section-tag">Service Booking</span>
            <h2 style={{ margin: "0.8rem 0 0.4rem", fontSize: "2.2rem" }}>
              Request {selectedService.title}
            </h2>
            <p style={{ margin: "0 0 2rem", color: "var(--text-secondary)", fontSize: "1.4rem" }}>
              Estimated rate: <strong>{selectedService.price}</strong> • {selectedService.turnaround}
            </p>

            {bookingSuccess ? (
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  background: "var(--primary-light)",
                  borderRadius: "var(--radius-lg)",
                  color: "var(--primary-dark)",
                }}
              >
                <FiCheckCircle style={{ fontSize: "4rem", margin: "0 auto 1.2rem" }} />
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "2rem" }}>Pickup Request Confirmed!</h3>
                <p style={{ margin: 0, fontSize: "1.4rem" }}>
                  A confirmation SMS and tracking ID have been dispatched to {bookingData.phone || "your phone"}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="service-client-name">Your Full Name</label>
                  <input
                    id="service-client-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service-client-phone">Phone Number</label>
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
                    <label htmlFor="service-client-date">Pickup Date</label>
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
                </div>

                <div className="form-group">
                  <label htmlFor="service-client-address">Pickup Address & Landmark</label>
                  <input
                    id="service-client-address"
                    type="text"
                    required
                    placeholder="House / Flat No., Street, Area, Pincode"
                    value={bookingData.address}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, address: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service-client-notes">Special Instructions (Optional)</label>
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
                  Confirm Pickup Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
