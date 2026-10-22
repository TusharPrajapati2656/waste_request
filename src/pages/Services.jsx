// src/pages/Services.jsx

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LuBuilding2,
  LuRecycle,
} from "react-icons/lu";
import {
  FiHome,
  FiTruck,
  FiAlertTriangle,
  FiSearch,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import "./Services.css";

const servicesList = [
  {
    id: "residential",
    category: "residential",
    title: "Residential Waste Pickup",
    badge: "Most Popular",
    icon: <FiHome />,
    price: "Free - $12/mo",
    turnaround: "Daily / On-demand",
    description: "Scheduled doorstep pickup for single-family homes, townhouses, and housing complexes.",
    features: [
      "Separate wet and dry segregation bags",
      "Real-time collection vehicle tracking",
      "Automated SMS/Email morning notifications",
      "Earn green eco-points for sorted recyclables",
    ],
  },
  {
    id: "commercial",
    category: "commercial",
    title: "Commercial & Business Collection",
    badge: "Enterprise",
    icon: <LuBuilding2 />,
    price: "Custom Quote",
    turnaround: "Flexible Schedules",
    description: "Complete waste management for restaurants, offices, retail spaces, and corporate parks.",
    features: [
      "Dedicated commercial wheelie bin provision",
      "Certified carbon offset & ESG compliance reports",
      "Confidential document destruction & baling",
      "Monthly consolidated tax invoicing",
    ],
  },
  {
    id: "recycling",
    category: "recyclables",
    title: "Dry Recyclable Waste Sorting",
    badge: "Eco-Hero",
    icon: <LuRecycle />,
    price: "Free with Cashback",
    turnaround: "Every Weekend",
    description: "Specialized recovery for clean cardboard, paper, glass, aluminum, and rigid plastics.",
    features: [
      "Digital weigh-scale doorstep verification",
      "Cashback or gift cards per kilogram sorted",
      "100% processed at ISO-14001 certified hubs",
      "Impact badge displayed on your citizen profile",
    ],
  },
  {
    id: "bulk",
    category: "bulk",
    title: "On-Demand Bulk & Furniture Disposal",
    badge: "Heavy Duty",
    icon: <FiTruck />,
    price: "$45 - $90 flat",
    turnaround: "Within 24-48 hours",
    description: "Full-service collection for mattresses, broken furniture, home renovations, and large appliances.",
    features: [
      "2 trained loaders included in every booking",
      "Staircase and basement removal available",
      "Salvageable items donated to local NGOs",
      "Safe dismantling & scrap metal separation",
    ],
  },
  {
    id: "hazardous",
    category: "hazardous",
    title: "Hazardous & Battery Safe Handling",
    badge: "EPA Certified",
    icon: <FiAlertTriangle />,
    price: "$25 base slot",
    turnaround: "Bi-weekly Saturdays",
    description: "Safe neutralization and specialized transport for chemicals, motor oils, e-waste, and batteries.",
    features: [
      "Spill-proof UN-certified containment containers",
      "Certified chain-of-custody documentation",
      "Zero-groundwater contamination guarantee",
      "Safe handling of paint thinners and mercury",
    ],
  },
];

const wasteDatabase = [
  { item: "Cardboard boxes", category: "Recyclables", accepted: true, tip: "Flatten and tie with string. Keep dry." },
  { item: "Plastic water bottles (PET)", category: "Recyclables", accepted: true, tip: "Empty liquid, rinse, and crush." },
  { item: "Vegetable peels & food scraps", category: "Organic", accepted: true, tip: "Dispose in green compostable bag." },
  { item: "Batteries (AA, AAA, Li-ion)", category: "Hazardous", accepted: true, tip: "Do NOT place in general trash. Tape terminals." },
  { item: "Glass bottles & jars", category: "Recyclables", accepted: true, tip: "Rinse clean. Remove metal lids." },
  { item: "Styrofoam / Thermocol", category: "Special Waste", accepted: false, tip: "Not accepted in curbside bin. Requires depot drop-off." },
  { item: "Broken CFL & fluorescent tubes", category: "Hazardous", accepted: true, tip: "Wrap safely in newspaper to prevent mercury vapor." },
  { item: "Old Mattresses", category: "Bulk Waste", accepted: true, tip: "Book an On-Demand Bulk Truck pickup." },
];

export default function Services() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";
  const [activeTab, setActiveTab] = useState(initialCategory);

  // Search/Checker state
  const [searchQuery, setSearchQuery] = useState("");

  // Booking Modal state
  const [selectedService, setSelectedService] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    notes: "",
  });

  const filteredServices =
    activeTab === "all"
      ? servicesList
      : servicesList.filter((s) => s.category === activeTab);

  const filteredItems = searchQuery.trim()
    ? wasteDatabase.filter(
        (w) =>
          w.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : wasteDatabase.slice(0, 4);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedService(null);
      setBookingData({ name: "", phone: "", address: "", date: "", notes: "" });
    }, 2500);
  };

  return (
    <div className="services-page">
      {/* Hero */}
      <section className="services-hero">
        <div className="services-hero-content">
          <span className="hero-badge">
            <LuRecycle aria-hidden="true" />
            <span>Eco-Friendly Solutions</span>
          </span>
          <h1 className="hero-title" style={{ marginTop: "1.6rem" }}>
            Tailored Waste Solutions for <span>Homes & Businesses</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: "1.6rem auto 0" }}>
            Reliable, on-schedule collection services built with state-of-the-art segregation 
            standards and verified environmental compliance.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="section-wrapper">
        <div className="service-tabs" role="tablist">
          <button
            className={`service-tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Services
          </button>
          <button
            className={`service-tab-btn ${activeTab === "residential" ? "active" : ""}`}
            onClick={() => setActiveTab("residential")}
          >
            Residential
          </button>
          <button
            className={`service-tab-btn ${activeTab === "commercial" ? "active" : ""}`}
            onClick={() => setActiveTab("commercial")}
          >
            Commercial
          </button>
          <button
            className={`service-tab-btn ${activeTab === "recyclables" ? "active" : ""}`}
            onClick={() => setActiveTab("recyclables")}
          >
            Recyclables
          </button>
          <button
            className={`service-tab-btn ${activeTab === "bulk" ? "active" : ""}`}
            onClick={() => setActiveTab("bulk")}
          >
            Bulk Waste
          </button>
          <button
            className={`service-tab-btn ${activeTab === "hazardous" ? "active" : ""}`}
            onClick={() => setActiveTab("hazardous")}
          >
            Hazardous
          </button>
        </div>

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
      </section>

      {/* Waste Classification / Can I Recycle This? Widget */}
      <section className="section-wrapper">
        <div className="checker-box">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="checker-results">
            {filteredItems.map((item) => (
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
      </section>

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
                  <label htmlFor="client-name">Your Full Name</label>
                  <input
                    id="client-name"
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
                    <label htmlFor="client-phone">Phone Number</label>
                    <input
                      id="client-phone"
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
                    <label htmlFor="client-date">Pickup Date</label>
                    <input
                      id="client-date"
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
                  <label htmlFor="client-address">Pickup Address & Landmark</label>
                  <input
                    id="client-address"
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
                  <label htmlFor="client-notes">Special Instructions (Optional)</label>
                  <input
                    id="client-notes"
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
    </div>
  );
}
