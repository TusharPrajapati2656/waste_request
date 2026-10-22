// src/pages/home/components/HeroSection.jsx

import { useRef } from "react";
import {
  LuLeaf,
  LuRecycle,
  LuMapPin,
  LuScale,
  LuCalendar,
  LuClock,
  LuSearch,
  LuArrowRight,
  LuSun,
  LuMoon,
  LuCircleCheck,
  LuChevronDown,
} from "react-icons/lu";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";
import CustomDatePicker from "../../../common/Calendar/CustomDatePicker";
import "../style/HeroSection.css";

const wasteCategoryOptions = [
  { value: "recyclables", label: "Household Recyclables", description: "(Plastic, Paper, Glass)" },
  { value: "organic", label: "Organic / Food Waste", description: "(Kitchen, Compost)" },
  { value: "ewaste", label: "E-Waste & Electronics", description: "(Appliances, Laptops)" },
  { value: "bulk", label: "Bulky Items & Furniture", description: "(Mattresses, Wood)" },
  { value: "hazardous", label: "Special / Hazardous Waste", description: "(Batteries, Paint)" },
  { value: "commercial", label: "Commercial & Retail Waste", description: "(Offices, Retail)" },
];

const quantityUnits = ["kg", "bags", "items", "tons"];

const timeSlots = [
  {
    id: "morning",
    label: "Morning",
    time: "8:00 AM - 11:30 AM",
    value: "Morning (8:00 AM - 11:30 AM)",
    icon: "sun",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    time: "1:00 PM - 4:00 PM",
    value: "Afternoon (1:00 PM - 4:00 PM)",
    icon: "sun",
  },
  {
    id: "evening",
    label: "Evening",
    time: "5:00 PM - 7:30 PM",
    value: "Evening (5:00 PM - 7:30 PM)",
    icon: "moon",
  },
];

export default function HeroSection({
  estimator,
  onOpenBooking,
}) {
  const {
    wasteType,
    setWasteType,
    pincode,
    setPincode,
    pickupDate,
    setPickupDate,
    approxQuantity,
    setApproxQuantity,
    quantityUnit,
    setQuantityUnit,
    timeSlot,
    setTimeSlot,
    estimateResult,
    handleEstimate,
  } = estimator;

  const dateInputRef = useRef(null);

  const handleDateBoxClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        try {
          dateInputRef.current.showPicker();
        } catch {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Top Centered Header */}
        <div className="hero-header-center">
          <div className="hero-pill-badge">
            <LuLeaf className="hero-badge-leaf" aria-hidden="true" />
            <span>Instant Pickup Estimate</span>
          </div>

          <h1 className="hero-title">
            Clean Communities,<span className="hero-title-accent">_Greener Tomorrows</span>
          </h1>

          <p className="hero-subtitle">
            Get an estimated cost and check pickup availability in seconds.
          </p>
        </div>

        {/* Central Floating Form Card */}
        <div className="hero-main-card">
          <form onSubmit={handleEstimate} className="hero-estimate-form">
            {/* Row 1: 4 Inputs + CTA Button */}
            <div className="hero-form-row-main">
              {/* Field 1: Waste Category */}
              <div className="hero-field-col category-col">
                <label className="hero-field-label">
                  Waste Category <span className="req-asterisk">*</span>
                </label>
                <CustomDropdown
                  id="waste-category-select"
                  options={wasteCategoryOptions}
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  icon={<LuRecycle />}
                  variant="hero"
                  ariaLabel="Waste Category"
                />
              </div>

              {/* Field 2: Area / Pincode */}
              <div className="hero-field-col pincode-col">
                <label htmlFor="hero-pincode" className="hero-field-label">
                  Area / Pincode <span className="req-asterisk">*</span>
                </label>
                <div className="hero-input-box">
                  <div className="hero-field-icon-badge" aria-hidden="true">
                    <LuMapPin />
                  </div>
                  <input
                    id="hero-pincode"
                    type="text"
                    className="hero-native-input"
                    placeholder="Enter 6 digit pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              {/* Field 3: Approx. Quantity */}
              <div className="hero-field-col qty-col">
                <label htmlFor="hero-qty" className="hero-field-label">
                  Approx. Quantity <span className="req-asterisk">*</span>
                </label>
                <div className="hero-input-box hero-qty-input-box">
                  <div className="hero-field-icon-badge" aria-hidden="true">
                    <LuScale />
                  </div>
                  <input
                    id="hero-qty"
                    type="number"
                    min="1"
                    className="hero-native-input hero-qty-number"
                    placeholder="Enter qty"
                    value={approxQuantity}
                    onChange={(e) => setApproxQuantity(e.target.value)}
                    required
                  />
                  <div className="hero-unit-selector">
                    <CustomDropdown
                      id="hero-qty-unit"
                      options={quantityUnits}
                      value={quantityUnit}
                      onChange={(e) => setQuantityUnit(e.target.value)}
                      variant="embedded"
                      size="sm"
                      align="right"
                      ariaLabel="Quantity Unit"
                    />
                  </div>
                </div>
              </div>

              {/* Field 4: Pickup Date */}
              <div className="hero-field-col date-col">
                <label htmlFor="hero-pickup-date" className="hero-field-label">
                  Pickup Date <span className="req-asterisk">*</span>
                </label>
                <div className="hero-input-box hero-date-box">
                  <CustomDatePicker
                    id="hero-pickup-date"
                    value={pickupDate}
                    onChange={(e, date) => setPickupDate(date)}
                    minDate={new Date().toISOString().split("T")[0]}
                    placeholder="Select a date"
                    variant="hero"
                    singleMonth={true}
                    ariaLabel="Select Pickup Date"
                    title="Select pickup date"
                  />
                </div>
              </div>

              {/* Field 5: CTA Button */}
              <div className="hero-field-col btn-col">
                <button type="submit" className="hero-btn-calculate">
                  <LuSearch className="hero-btn-icon-left" aria-hidden="true" />
                  <div className="hero-btn-text">
                    <span className="hero-btn-title">Calculate Estimate</span>
                    <span className="hero-btn-sub">& Check Availability</span>
                  </div>
                  <LuArrowRight className="hero-btn-icon-right" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Row 2: Pickup Time Slot Bar */}
            <div className="hero-slot-bar">
              <div className="hero-slot-bar-left">
                <div className="hero-slot-clock-badge" aria-hidden="true">
                  <LuClock />
                </div>
                <div className="hero-slot-bar-text">
                  <span className="hero-slot-bar-title">Pickup Time Slot</span>
                  <p className="hero-slot-bar-desc">
                    Select date and pincode to view available slots.
                  </p>
                </div>
              </div>

              <div className="hero-slot-pills-group" role="radiogroup" aria-label="Pickup Time Slot">
                {timeSlots.map((s) => {
                  const isSelected = timeSlot.startsWith(s.label);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`hero-slot-pill ${isSelected ? "is-selected" : ""}`}
                      onClick={() => setTimeSlot(s.value)}
                    >
                      {s.icon === "sun" ? (
                        <LuSun className="hero-slot-icon sun-icon" aria-hidden="true" />
                      ) : (
                        <LuMoon className="hero-slot-icon moon-icon" aria-hidden="true" />
                      )}
                      <div className="hero-slot-pill-text">
                        <strong className="hero-slot-pill-name">{s.label}</strong>
                        <span className="hero-slot-pill-time">{s.time}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expandable Calculation Result State */}
            {estimateResult && (
              <div className="hero-estimate-result-drawer" role="region" aria-live="polite">
                <div className="hero-result-header">
                  <div className="hero-result-rate">
                    <span className="hero-result-rate-label">Estimated Rate:</span>
                    <strong className="hero-result-rate-value">{estimateResult.calculatedRate}</strong>
                  </div>
                  <div className="hero-result-badge-available">
                    <LuCircleCheck aria-hidden="true" /> Slot Available on {estimateResult.date}
                  </div>
                </div>

                <div className="hero-result-metrics">
                  <div className="hero-metric-box">
                    <span className="hero-metric-label">Manifest Volume</span>
                    <strong className="hero-metric-val">{estimateResult.quantity}</strong>
                  </div>
                  <div className="hero-metric-box">
                    <span className="hero-metric-label">Estimated Turnaround</span>
                    <strong className="hero-metric-val">{estimateResult.turnaround}</strong>
                  </div>
                  <div className="hero-metric-box">
                    <span className="hero-metric-label">Eco Benefit</span>
                    <strong className="hero-metric-val text-green">{estimateResult.earnedPoints}</strong>
                  </div>
                  <div className="hero-metric-box">
                    <span className="hero-metric-label">Target Zone</span>
                    <strong className="hero-metric-val">{estimateResult.pincode}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="hero-btn-confirm-reserve"
                  onClick={() =>
                    onOpenBooking(
                      wasteType,
                      pickupDate,
                      pincode,
                      approxQuantity,
                      quantityUnit,
                      timeSlot
                    )
                  }
                >
                  <span>Confirm & Reserve This Slot</span>
                  <LuArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
