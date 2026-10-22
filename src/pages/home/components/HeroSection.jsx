// src/pages/home/components/HeroSection.jsx

import { LuLeaf, LuArrowRight } from "react-icons/lu";

export default function HeroSection({
  estimator,
  onOpenBooking,
  onScrollTo,
}) {
  const {
    wasteType,
    setWasteType,
    pincode,
    setPincode,
    pickupDate,
    setPickupDate,
    estimateResult,
    handleEstimate,
  } = estimator;

  return (
    <section id="home" className="hero-section">
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
            <button
              type="button"
              className="btn-primary"
              onClick={() => onScrollTo("services")}
            >
              Book a Pickup <LuArrowRight aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onScrollTo("about")}
            >
              How It Works
            </button>
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
                <button
                  type="button"
                  onClick={() => onOpenBooking(wasteType, pickupDate, pincode)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginTop: "1.2rem",
                    background: "transparent",
                    border: "none",
                    color: "var(--primary-dark)",
                    fontWeight: "700",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: 0,
                  }}
                >
                  Confirm & Reserve This Slot <LuArrowRight />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
