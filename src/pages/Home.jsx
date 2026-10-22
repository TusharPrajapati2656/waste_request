// src/pages/Home.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuLeaf,
  LuRecycle,
  LuTruck,
  LuTrash2,
  LuShieldCheck,
  LuArrowRight,
  LuSparkles,
} from "react-icons/lu";
import "./Home.css";

const wasteCategories = [
  {
    id: "recyclables",
    title: "Household Recyclables",
    icon: <LuRecycle />,
    description: "Paper, corrugated cardboard, PET plastics, glass bottles, and aluminium beverage cans.",
    tags: ["Paper", "Plastic", "Glass", "Metals"],
  },
  {
    id: "organic",
    title: "Organic & Food Waste",
    icon: <LuLeaf />,
    description: "Kitchen food scraps, produce waste, garden trimmings, and natural compostable items.",
    tags: ["Compost", "Kitchen", "Green Waste"],
  },
  {
    id: "ewaste",
    title: "E-Waste & Electronics",
    icon: <LuSparkles />,
    description: "Old laptops, phones, cables, circuit boards, appliances, and batteries with certified data wipe.",
    tags: ["Computers", "Phones", "Batteries"],
  },
  {
    id: "bulk",
    title: "Bulky Items & Furniture",
    icon: <LuTruck />,
    description: "Mattresses, couches, wooden furniture, renovation debris, and oversized household gear.",
    tags: ["Mattresses", "Furniture", "Renovation"],
  },
  {
    id: "hazardous",
    title: "Special & Hazardous",
    icon: <LuTrash2 />,
    description: "Paints, motor oils, cleaning chemicals, expired medications, and fluorescent tubes.",
    tags: ["Chemicals", "Medical", "Safe Disposal"],
  },
  {
    id: "commercial",
    title: "Commercial & Business",
    icon: <LuShieldCheck />,
    description: "Scheduled recurring disposal, warehouse waste clearances, and certified compliance reports.",
    tags: ["Offices", "Retail", "Industrial"],
  },
];

export default function Home() {
  const [wasteType, setWasteType] = useState("recyclables");
  const [pincode, setPincode] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [estimateResult, setEstimateResult] = useState(null);

  const handleEstimate = (e) => {
    e.preventDefault();
    if (!pincode.trim() || !pickupDate) {
      alert("Please provide your pickup location (Pincode/Area) and preferred date.");
      return;
    }

    // Dynamic mock calculation for realistic user experience
    const prices = {
      recyclables: { base: "Free Pickup", credit: "Earn green points", turnaround: "Within 24h" },
      organic: { base: "$12 / bin", credit: "Zero-landfill certified", turnaround: "Every morning" },
      ewaste: { base: "$15 flat", credit: "Certificate of destruction", turnaround: "Scheduled slot" },
      bulk: { base: "$45 - $90", credit: "2 movers included", turnaround: "Within 48h" },
      hazardous: { base: "$35 base fee", credit: "EPA compliant handling", turnaround: "Special slot" },
      commercial: { base: "Custom Quote", credit: "Monthly invoicing", turnaround: "Daily/Weekly" },
    };

    setEstimateResult(prices[wasteType] || prices.recyclables);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <LuLeaf aria-hidden="true" />
              <span>Smart Zero-Waste Portal</span>
            </div>

            <h1 className="hero-title">
              Effortless Waste Pickup & <span>Sustainable Recycling</span>
            </h1>

            <p className="hero-subtitle">
              Schedule on-demand doorstep pickups for household recyclables, bulky furniture, 
              organic waste, and electronics. Fast, transparent, and 100% eco-responsible.
            </p>

            <div className="hero-actions">
              <Link to="/services" className="btn-primary">
                Book a Pickup <LuArrowRight aria-hidden="true" />
              </Link>
              <Link to="/about" className="btn-secondary">
                How It Works
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-number">48,500+</span>
                <span className="trust-label">Tons Recycled</span>
              </div>
              <div className="trust-item">
                <span className="trust-number">99.4%</span>
                <span className="trust-label">On-time Pickups</span>
              </div>
              <div className="trust-item">
                <span className="trust-number">35,000+</span>
                <span className="trust-label">Happy Citizens</span>
              </div>
            </div>
          </div>

          {/* Quick Schedule Estimator Card */}
          <div className="hero-card">
            <div className="card-header">
              <h3>Instant Pickup Estimate</h3>
              <p>Check slot availability and rate in your area</p>
            </div>

            <form onSubmit={handleEstimate} className="booking-form">
              <div className="form-group">
                <label htmlFor="waste-type">Waste Category</label>
                <select
                  id="waste-type"
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                >
                  <option value="recyclables">Household Recyclables (Plastic, Paper, Glass)</option>
                  <option value="organic">Organic / Compostable Waste</option>
                  <option value="ewaste">E-Waste & Electronics</option>
                  <option value="bulk">Bulky Items & Furniture</option>
                  <option value="hazardous">Special / Hazardous Waste</option>
                  <option value="commercial">Commercial & Retail Waste</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pincode">Area / Pincode</label>
                  <input
                    id="pincode"
                    type="text"
                    placeholder="e.g. 110001 or Sector 5"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pickup-date">Preferred Date</label>
                  <input
                    id="pickup-date"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-calculate">
                Calculate Estimate & Availability
              </button>

              {estimateResult && (
                <div className="booking-estimate" role="region" aria-live="polite">
                  <div className="estimate-header">
                    <span>Estimated Rate:</span>
                    <span>{estimateResult.base}</span>
                  </div>
                  <div className="estimate-details">
                    <div>Turnaround: <strong>{estimateResult.turnaround}</strong></div>
                    <div>Eco Benefit: <strong>{estimateResult.credit}</strong></div>
                  </div>
                  <Link
                    to={`/contact?type=${wasteType}&date=${pickupDate}&pin=${encodeURIComponent(pincode)}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      marginTop: "1.2rem",
                      color: "var(--primary-dark)",
                      fontWeight: "700",
                      fontSize: "1.3rem",
                      textDecoration: "underline"
                    }}
                  >
                    Confirm & Reserve This Slot <LuArrowRight />
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">What We Collect</span>
          <h2 className="section-title">Comprehensive Waste Segregation & Recovery</h2>
          <p className="section-subtitle">
            Every material is responsibly sorted, recycled, or disposed of in certified facilities to protect local ecosystems.
          </p>
        </div>

        <div className="categories-grid">
          {wasteCategories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <div className="category-tags">
                {cat.tags.map((t) => (
                  <span key={t} className="category-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title">How GreenCycle Works in 3 Steps</h2>
          <p className="section-subtitle">
            From booking your pickup to seeing your environmental impact score, we make waste management frictionless.
          </p>
        </div>

        <div className="process-grid">
          <div className="process-step">
            <span className="step-badge">1</span>
            <h3>1. Book Your Window</h3>
            <p>
              Select your waste category and choose a pickup date & time that suits your schedule. Upload photos if you have bulk items.
            </p>
          </div>

          <div className="process-step">
            <span className="step-badge">2</span>
            <h3>2. Doorstep Collection</h3>
            <p>
              Our background-verified drivers arrive with electric collection vans, weigh the waste digitally, and give you an instant receipt.
            </p>
          </div>

          <div className="process-step">
            <span className="step-badge">3</span>
            <h3>3. Certified Recycling</h3>
            <p>
              Materials are transported to local recycling and composting plants, diverting 90%+ waste away from polluting landfills.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental Impact Banner */}
      <section className="section-wrapper">
        <div className="impact-banner">
          <div className="impact-item">
            <h4>48.5K+</h4>
            <p>Tons of Waste Diverted from Landfills</p>
          </div>
          <div className="impact-item">
            <h4>120K+</h4>
            <p>Trees Preserved via Recycled Paper</p>
          </div>
          <div className="impact-item">
            <h4>650K+</h4>
            <p>Liters of Water Conserved</p>
          </div>
          <div className="impact-item">
            <h4>100%</h4>
            <p>Compliance with Local Environmental Standards</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section-wrapper">
        <div className="cta-banner">
          <span className="section-tag">Get Started Today</span>
          <h2>Join Over 35,000 Responsible Citizens</h2>
          <p>
            Schedule your first waste collection in under 60 seconds. Together, we can build zero-waste, greener communities.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary">
              Schedule Pickup Now <LuArrowRight aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
