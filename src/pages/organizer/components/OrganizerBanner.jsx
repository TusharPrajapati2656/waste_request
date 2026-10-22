// src/pages/organizer/components/OrganizerBanner.jsx

import { Link } from "react-router-dom";
import { FiShield, FiArrowRight, FiRefreshCw } from "react-icons/fi";

export default function OrganizerBanner({ onResetData }) {
  return (
    <section className="organizer-header-banner">
      <div className="organizer-header-container">
        <div>
          <div className="organizer-tag">
            <FiShield />
            <span>Organizer Dispatch & Route Hub</span>
          </div>
          <h1 className="organizer-title">Local Waste Collection Management</h1>
          <p className="organizer-subtitle">
            Review live citizen pickup requests, allocate collection vehicles,
            advance status milestones, and verify diversion weights.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            to="/my-requests"
            className="btn-secondary"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            Switch to Citizen Tracker <FiArrowRight />
          </Link>
          <button
            type="button"
            className="btn-secondary"
            onClick={onResetData}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            <FiRefreshCw /> Reset Demo Data
          </button>
        </div>
      </div>
    </section>
  );
}
