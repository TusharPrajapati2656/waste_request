// src/pages/organizer/components/OrganizerBanner.jsx

import { Link } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import {
  LuShieldCheck,
  LuArrowLeftRight,
  LuArrowRight,
  LuFileText,
  LuTruck,
  LuRoute,
  LuChartColumnIncreasing,
} from "react-icons/lu";

export default function OrganizerBanner({ onResetData }) {
  return (
    <div className="organizer-banner-card">
      {/* Top Bar: Badge & Action Buttons aligned horizontally to compress height */}
      <div className="organizer-banner-top-bar">
        <div className="organizer-banner-badge">
          <LuShieldCheck className="organizer-badge-icon" aria-hidden="true" />
          <span>Organizer Dispatch & Route Hub</span>
        </div>

        <div className="organizer-banner-actions">
          <Link to="/my-requests" className="organizer-banner-btn-switch">
            <LuArrowLeftRight className="btn-icon" aria-hidden="true" />
            <span>Switch to Citizen Tracker</span>
            <LuArrowRight className="btn-arrow" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={onResetData}
            className="organizer-banner-btn-reset"
            title="Reset demo requests data"
          >
            <FiRefreshCw className="btn-icon" aria-hidden="true" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="organizer-banner-content">

        <h1 className="organizer-banner-title">
          Local <span className="organizer-title-highlight">Waste</span> Collection Management
        </h1>

        <p className="organizer-banner-desc">
          Review live citizen pickup requests, allocate collection vehicles,
          advance status milestones, and verify diversion weights.
        </p>

        <div className="organizer-banner-pills">
          <div className="organizer-feature-pill">
            <LuFileText className="pill-icon" aria-hidden="true" />
            <span>Live Requests</span>
          </div>
          <div className="organizer-feature-pill">
            <LuTruck className="pill-icon" aria-hidden="true" />
            <span>Vehicle Allocation</span>
          </div>
          <div className="organizer-feature-pill">
            <LuRoute className="pill-icon" aria-hidden="true" />
            <span>Route Tracking</span>
          </div>
          <div className="organizer-feature-pill">
            <LuChartColumnIncreasing className="pill-icon" aria-hidden="true" />
            <span>Diversion Reports</span>
          </div>
        </div>
      </div>
    </div>
  );
}
