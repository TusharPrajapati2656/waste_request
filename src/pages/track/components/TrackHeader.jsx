// src/pages/track/components/TrackHeader.jsx

import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";

export default function TrackHeader({ searchTerm, onSearchChange }) {
  return (
    <div className="tracker-header-box">
      <div className="tracker-header-info">
        <span className="section-tag">Citizen Portal</span>
        <h1>Track Waste Pickup Requests</h1>
        <p>
          Monitor your pickup milestones in real-time — from depot review
          and EV driver dispatch to doorstep weighing and verified recycling certification.
        </p>
      </div>

      <div className="tracker-search-wrap">
        <div className="tracker-search-input">
          <FiSearch style={{ color: "var(--text-muted)", fontSize: "1.8rem" }} />
          <input
            type="text"
            placeholder="Search by ID (e.g. GC-84920) or Phone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search requests"
          />
        </div>

        <Link to="/#services" className="btn-primary">
          <LuPlus /> Book New Pickup
        </Link>
      </div>
    </div>
  );
}
