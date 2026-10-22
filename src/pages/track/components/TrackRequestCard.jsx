// src/pages/track/components/TrackRequestCard.jsx

import { Link } from "react-router-dom";
import {
  LuFileText,
  LuClock,
  LuCircleCheck,
  LuCircleX,
  LuTruck,
  LuScale,
  LuMapPin,
  LuCalendar,
  LuTrash2,
  LuPhone,
  LuChevronDown,
  LuChevronUp,
  LuArrowRight,
  LuEye,
  LuAward,
} from "react-icons/lu";
import { STATUS_MAP } from "../../../services/requestStore";
import TrackStepper from "./TrackStepper";
import TrackTimeline from "./TrackTimeline";

export default function TrackRequestCard({
  request,
  isExpanded,
  onToggleExpand,
  onCancelRequest,
}) {
  const req = request;
  const statusCfg = STATUS_MAP[req.status] || {
    label: req.status,
    color: "#18251e",
    bg: "#f2f6f3",
    step: 1,
  };
  const isCancelled = req.status === "cancelled";
  const currentStepNumber = statusCfg.step || 1;

  return (
    <div className="tracker-card">
      {/* Top Header */}
      <div className="tracker-card-top">
        <div className="tracker-req-title-group">
          <span className="tracker-id-badge">
            <LuFileText className="tracker-id-icon" aria-hidden="true" />
            <span>{req.id}</span>
          </span>
          <span className="tracker-header-divider" aria-hidden="true" />
          <h2 className="tracker-service-title">{req.wasteType}</h2>
        </div>

        <div className="tracker-status-wrap">
          <span
            className={`tracker-status-pill status-${req.status}`}
            style={{ background: statusCfg.bg, color: statusCfg.color }}
          >
            {req.status === "submitted" && <LuClock aria-hidden="true" />}
            {req.status === "confirmed" && <LuCircleCheck aria-hidden="true" />}
            {req.status === "assigned" && <LuTruck aria-hidden="true" />}
            {req.status === "in_transit" && <LuTruck aria-hidden="true" />}
            {req.status === "collected" && <LuScale aria-hidden="true" />}
            {req.status === "completed" && <LuCircleCheck aria-hidden="true" />}
            {req.status === "cancelled" && <LuCircleX aria-hidden="true" />}
            <span>{statusCfg.label}</span>
          </span>
        </div>
      </div>

      {/* Stepper Pipeline */}
      <TrackStepper
        currentStepNumber={currentStepNumber}
        isCancelled={isCancelled}
      />

      {/* 4-Column Details Grid */}
      <div className="tracker-details-grid">
        {/* Col 1: Location */}
        <div className="tracker-detail-col">
          <div className="tracker-detail-icon" aria-hidden="true">
            <LuMapPin />
          </div>
          <div className="tracker-detail-content">
            <span className="tracker-detail-label">Pickup Location</span>
            <span className="tracker-detail-value">{req.address}</span>
            {req.pincode && (
              <span className="tracker-detail-sub" style={{ fontWeight: 600 }}>Pincode: {req.pincode}</span>
            )}
            {req.landmark && (
              <span className="tracker-detail-sub">Near: {req.landmark}</span>
            )}
          </div>
        </div>

        {/* Col 2: Slot */}
        <div className="tracker-detail-col">
          <div className="tracker-detail-icon" aria-hidden="true">
            <LuCalendar />
          </div>
          <div className="tracker-detail-content">
            <span className="tracker-detail-label">Scheduled Slot</span>
            <span className="tracker-detail-value">{req.date}</span>
            <span className="tracker-detail-sub">{req.timeSlot}</span>
          </div>
        </div>

        {/* Col 3: Waste Details */}
        <div className="tracker-detail-col">
          <div className="tracker-detail-icon" aria-hidden="true">
            <LuTrash2 />
          </div>
          <div className="tracker-detail-content">
            <span className="tracker-detail-label">Waste Details</span>
            <span className="tracker-detail-value">{req.volume}</span>
            <span className="tracker-detail-sub">
              Est: {req.estimatedWeight}
              {req.measuredWeight && ` • Actual: ${req.measuredWeight}`}
            </span>
          </div>
        </div>

        {/* Col 4: Assigned Vehicle */}
        <div className="tracker-detail-col">
          <div className="tracker-detail-icon" aria-hidden="true">
            <LuTruck />
          </div>
          <div className="tracker-detail-content">
            <span className="tracker-detail-label">Assigned Vehicle</span>
            <span className="tracker-detail-value">
              {req.driver || "Unassigned"}
            </span>
            <span className="tracker-detail-sub">
              {req.driverPhone ? (
                <>
                  <LuPhone
                    style={{
                      display: "inline",
                      marginRight: "0.3rem",
                      fontSize: "1.2rem",
                    }}
                  />
                  {req.driverPhone}
                </>
              ) : (
                "Driver notified before arrival"
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Certified badge if completed */}
      {req.status === "completed" && (
        <div className="manifest-certificate">
          <LuAward style={{ fontSize: "2.2rem", flexShrink: 0 }} />
          <div>
            <strong>Digital Recycling Certificate Verified</strong>
            <p style={{ margin: "0.2rem 0 0", fontSize: "1.25rem" }}>
              Waste processed and certified diverted from municipal landfill.
              {req.measuredWeight && ` Verified weight: ${req.measuredWeight}.`}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Action Row */}
      <div className="tracker-card-actions">
        {/* Left: View Progress Timeline button */}
        <button
          type="button"
          className="tracker-timeline-pill-btn"
          onClick={() => onToggleExpand(req.id)}
        >
          <LuClock className="tracker-btn-icon" aria-hidden="true" />
          <span>
            View Progress Timeline ({req.timeline?.length || 1} event
            {req.timeline?.length === 1 ? "" : "s"})
          </span>
          {isExpanded ? (
            <LuChevronUp className="tracker-chevron-icon" aria-hidden="true" />
          ) : (
            <LuChevronDown className="tracker-chevron-icon" aria-hidden="true" />
          )}
        </button>

        {/* Right: Cancel Request and Organizer View buttons */}
        <div className="tracker-actions-right">
          {!["completed", "cancelled"].includes(req.status) && (
            <button
              type="button"
              className="tracker-cancel-btn"
              onClick={() => onCancelRequest(req.id)}
            >
              <LuCircleX className="tracker-btn-icon" aria-hidden="true" />
              <span>Cancel Request</span>
            </button>
          )}

          <Link to="/organizer" className="tracker-organizer-btn">
            <LuEye className="tracker-btn-icon" aria-hidden="true" />
            <span>Organizer View</span>
            <LuArrowRight className="tracker-btn-arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Expanded Milestone Timeline */}
      {isExpanded && <TrackTimeline timeline={req.timeline} />}
    </div>
  );
}
