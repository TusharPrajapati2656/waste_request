// src/pages/home/components/ServicesSection.jsx

import { Link } from "react-router-dom";
import { FiCheckCircle, FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import {
  LuCoins,
  LuCheck,
  LuCircleCheck,
  LuBuilding2,
  LuRecycle,
  LuSparkles,
  LuTruck,
} from "react-icons/lu";
import SectionHeaderBadge from "../../../common/SectionBadge/SectionHeaderBadge";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";
import CustomDatePicker from "../../../common/Calendar/CustomDatePicker";
import "../style/ServicesSection.css";

const slotOptions = [
  "Morning (8:00 AM - 11:30 AM)",
  "Afternoon (1:00 PM - 4:00 PM)",
  "Evening (5:00 PM - 7:30 PM)",
];

const unitOptions = ["kg", "bags", "items", "tons"];

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
    <section id="services" className="services-section">
      <div className="section-wrapper">
        <div className="section-header">
          <SectionHeaderBadge icon={<LuTruck />} />
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">
            Tailored Waste Solutions for Homes & Businesses
          </h2>
          <p className="section-subtitle">
            Reliable, on-schedule collection services built with
            state-of-the-art segregation standards and verified environmental
            compliance.
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
          {filteredServices.map((service) => {
            const titleWords = (service.title || "").split(" ");
            const part1 = service.titlePart1 || titleWords[0] || "";
            const part2 =
              service.titlePart2 || titleWords.slice(1).join(" ") || "";

            return (
              <div key={service.id} className="service-card">
                {/* Artistic leaf watermark in the top right */}
                <div className="service-card-leaf-watermark" aria-hidden="true">
                  <svg
                    viewBox="0 0 180 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M180 0C130 10 75 50 40 120C75 105 145 80 180 0Z"
                      fill="rgba(34, 197, 94, 0.08)"
                    />
                    <path
                      d="M180 0C140 55 100 85 40 120"
                      stroke="rgba(22, 121, 75, 0.12)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M180 45C145 70 105 100 80 155C108 140 155 110 180 45Z"
                      fill="rgba(74, 222, 128, 0.06)"
                    />
                  </svg>
                </div>

                {/* Top row: Icon + Two-line Title on left, Badge on right */}
                <div className="service-card-top">
                  <div className="service-card-header-left">
                    <div className="service-card-icon" aria-hidden="true">
                      {service.icon}
                    </div>
                    <h3 className="service-card-title">
                      <span className="title-dark">{part1}</span>
                      <span className="title-green">{part2}</span>
                    </h3>
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

                {/* Vertical Features List (2 items) */}
                <div className="service-features-list">
                  {service.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="service-feature-row">
                      <span
                        className="service-feature-circle"
                        aria-hidden="true"
                      >
                        {feat.icon || <LuCheck />}
                      </span>
                      <span className="service-feature-label">
                        {feat.text || feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Horizontal Hairline Divider */}
                <div className="service-card-divider" aria-hidden="true" />

                {/* Footer: Price info on left, Book Service button on right */}
                <div className="service-card-footer">
                  <div className="service-price-block">
                    <span
                      className="service-price-badge-circle"
                      aria-hidden="true"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M12 18v-7" />
                        <path d="M9.5 13.5c0-.8.7-1.5 1.5-1.5h1.5a1.5 1.5 0 0 1 0 3H10.5a1.5 1.5 0 0 0 0 3h1.5a1.5 1.5 0 0 0 1.5-1.5" />
                      </svg>
                    </span>
                    <div className="service-price-texts">
                      <span className="service-price-primary">
                        {service.price}
                      </span>
                      <span className="service-price-secondary">
                        {service.turnaround}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-book-service"
                    onClick={() => setSelectedService(service)}
                    aria-label={`Book ${service.title}`}
                  >
                    <span>Book Service</span>
                    <FiArrowRight
                      className="btn-book-arrow"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Waste Classification / Can I Recycle This? Widget */}
        <div className="checker-box">
          <SectionHeaderBadge icon={<LuSparkles />} />
          <span className="section-tag">
            Instant Segregation Guide
          </span>
          <h2 className="section-title">Can I Recycle This?</h2>
          <p className="section-subtitle">
            Search any household material to check whether GreenCycle collects
            it and how to pack it safely.
          </p>

          <div className="checker-input-wrap">
            <FiSearch
              style={{ fontSize: "2rem", color: "var(--text-muted)" }}
            />
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
                className={`checker-item ${item.accepted ? "accepted" : "not-accepted"}`}
              >
                <div className="checker-item-icon-wrap" aria-hidden="true">
                  {item.icon || <LuRecycle />}
                </div>

                <div className="checker-info">
                  <h4>{item.item}</h4>
                  <p>
                    Category: <strong>{item.category}</strong> • {item.tip}
                  </p>
                </div>

                <span
                  className={`checker-status-badge ${
                    item.accepted ? "accepted" : "restricted"
                  }`}
                >
                  {item.accepted ? (
                    <>
                      <LuCircleCheck
                        className="status-badge-icon"
                        aria-hidden="true"
                      />
                      <span>Accepted</span>
                    </>
                  ) : (
                    <>
                      <LuBuilding2
                        className="status-badge-icon"
                        aria-hidden="true"
                      />
                      <span>Depot Only</span>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
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
            <h2 className="service-modal-title">
              Request {selectedService.title}
            </h2>
            <p className="service-modal-subtitle">
              Estimated rate: <strong>{selectedService.price}</strong> •{" "}
              {selectedService.turnaround}
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
                <FiCheckCircle
                  style={{
                    fontSize: "4.5rem",
                    margin: "0 auto 1.4rem",
                    color: "var(--primary)",
                  }}
                />
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "2.2rem" }}>
                  Pickup Request Created!
                </h3>
                <p style={{ margin: "0 0 1.6rem", fontSize: "1.45rem" }}>
                  Your request has been logged. Use this unique tracking ID to
                  track real-time collection updates:
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
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
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
                        setBookingData({
                          ...bookingData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-client-email">
                      Email (Optional)
                    </label>
                    <input
                      id="service-client-email"
                      type="email"
                      placeholder="you@example.com"
                      value={bookingData.email}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service-client-date">
                      Preferred Pickup Date *
                    </label>
                    <CustomDatePicker
                      id="service-client-date"
                      required
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                      minDate={new Date().toISOString().split("T")[0]}
                      placeholder="Select pickup date"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-client-slot">
                      Preferred Slot *
                    </label>
                    <CustomDropdown
                      id="service-client-slot"
                      options={slotOptions}
                      value={bookingData.timeSlot}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          timeSlot: e.target.value,
                        })
                      }
                      ariaLabel="Preferred Slot"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service-client-address">
                    Pickup Address & House/Flat *
                  </label>
                  <input
                    id="service-client-address"
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Green Meadows, Sector 14"
                    value={bookingData.address}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service-client-pin">Pincode / Area *</label>
                    <input
                      id="service-client-pin"
                      type="text"
                      placeholder="e.g. 110001"
                      value={bookingData.pincode}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          pincode: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-client-qty">
                      Approximate Quantity
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.8rem",
                        alignItems: "center",
                      }}
                    >
                      <input
                        id="service-client-qty"
                        type="number"
                        min="1"
                        placeholder="e.g. 10"
                        style={{ flex: 1 }}
                        value={bookingData.approxQuantity}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            approxQuantity: e.target.value,
                          })
                        }
                      />
                      <div style={{ width: "10rem" }}>
                        <CustomDropdown
                          id="service-client-unit"
                          options={unitOptions}
                          value={bookingData.quantityUnit || "kg"}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              quantityUnit: e.target.value,
                            })
                          }
                          size="sm"
                          align="right"
                          ariaLabel="Quantity Unit"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service-client-notes">
                    Access or Driver Instructions
                  </label>
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

                <button type="submit" className="btn-submit-booking">
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
