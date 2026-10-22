// src/pages/track/components/TrackHeader.jsx

import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { LuPlus, LuLeaf, LuArrowRight } from "react-icons/lu";

export default function TrackHeader({ searchTerm, onSearchChange }) {
  return (
    <div className="tracker-header-box">
      <div className="tracker-banner-content">
        <div className="tracker-banner-badge">
          <LuLeaf className="tracker-badge-icon" aria-hidden="true" />
          <span>CITIZEN PORTAL</span>
        </div>

        <h1 className="tracker-banner-title">Track Waste Pickup Requests</h1>

        <p className="tracker-banner-desc">
          Monitor your pickup milestones in real-time — from depot review
          and EV driver dispatch to doorstep weighing and verified recycling certification.
        </p>

        <div className="tracker-banner-actions">
          <div className="tracker-banner-search">
            <FiSearch className="tracker-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by ID (e.g. GC-84920) or Phone Number"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search pickup requests"
            />
            {searchTerm && (
              <button
                type="button"
                className="tracker-search-clear-btn"
                onClick={() => onSearchChange("")}
                title="Clear search"
                aria-label="Clear search input"
              >
                <FiX />
              </button>
            )}
          </div>

          <Link to="/#services" className="tracker-banner-book-btn">
            <LuPlus className="tracker-btn-plus" aria-hidden="true" />
            <span>Book New Pickup</span>
            <LuArrowRight className="tracker-btn-arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
