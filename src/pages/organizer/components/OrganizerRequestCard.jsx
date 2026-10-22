// src/pages/organizer/components/OrganizerRequestCard.jsx

import { useState } from "react";
import {
  LuFileText,
  LuRecycle,
  LuLeaf,
  LuSparkles,
  LuTruck,
  LuTriangleAlert,
  LuShieldCheck,
  LuUser,
  LuPhone,
  LuMail,
  LuMapPin,
  LuCalendar,
  LuPackage,
  LuSettings,
  LuArrowRight,
  LuCircleCheck,
  LuClock,
  LuCircleX,
  LuScale,
  LuSprout,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";
import { STATUS_MAP } from "../../../services/requestStore";
import TrackTimeline from "../../track/components/TrackTimeline";

const CATEGORY_MAP = {
  recyclables: {
    icon: <LuRecycle />,
    subtitle: "Paper, plastic, metal, glass & other dry recyclables",
  },
  organic: {
    icon: <LuLeaf />,
    subtitle: "Kitchen food scraps, produce & natural compostable items",
  },
  ewaste: {
    icon: <LuSparkles />,
    subtitle: "Old laptops, phones, cables & appliances with data wipe",
  },
  bulk: {
    icon: <LuTruck />,
    subtitle: "Mattresses, couches, wooden furniture & oversized items",
  },
  hazardous: {
    icon: <LuTriangleAlert />,
    subtitle: "Paints, motor oils, cleaning chemicals & battery disposal",
  },
  commercial: {
    icon: <LuShieldCheck />,
    subtitle: "Scheduled recurring disposal & compliance manifests",
  },
};

function getCategoryInfo(req) {
  if (req.category && CATEGORY_MAP[req.category]) {
    return CATEGORY_MAP[req.category];
  }
  const typeLower = (req.wasteType || "").toLowerCase();
  if (typeLower.includes("organic") || typeLower.includes("food")) return CATEGORY_MAP.organic;
  if (typeLower.includes("e-waste") || typeLower.includes("electronic")) return CATEGORY_MAP.ewaste;
  if (typeLower.includes("bulk") || typeLower.includes("furniture")) return CATEGORY_MAP.bulk;
  if (typeLower.includes("hazard") || typeLower.includes("chemical")) return CATEGORY_MAP.hazardous;
  if (typeLower.includes("commercial") || typeLower.includes("business")) return CATEGORY_MAP.commercial;
  return CATEGORY_MAP.recyclables;
}

function getExpectedNote(status) {
  switch (status) {
    case "in_transit":
      return "Expected today";
    case "submitted":
      return "Needs depot review";
    case "confirmed":
      return "Ready for dispatch";
    case "assigned":
      return "Driver allocated";
    case "collected":
      return "En route to recovery hub";
    case "completed":
      return "Recycled & verified";
    case "cancelled":
      return "Request closed";
    default:
      return "Scheduled service";
  }
}

export default function OrganizerRequestCard({
  request,
  onQuickAdvance,
  onOpenManage,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const req = request;
  const statusCfg = STATUS_MAP[req.status] || {
    label: req.status,
    color: "#18251e",
    bg: "#f2f6f3",
  };
  const categoryInfo = getCategoryInfo(req);
  const expectedNote = getExpectedNote(req.status);

  return (
    <div className="organizer-request-card">
      {/* ========================================================
          1. Header Row (ID, Category Icon, Title, Status & Chevron)
         ======================================================== */}
      <div className="org-card-header">
        <div className="org-card-title-group">
          {/* Document ID Pill */}
          <span className="org-id-badge">
            <LuFileText className="org-id-icon" aria-hidden="true" />
            <span>{req.id}</span>
          </span>

          {/* Waste Category Icon Square Box */}
          <div className="org-cat-icon-box" aria-hidden="true">
            {categoryInfo.icon}
          </div>

          {/* Title & Subtitle */}
          <div className="org-title-texts">
            <h3 className="org-card-title">{req.wasteType}</h3>
            <span className="org-card-subtitle">{categoryInfo.subtitle}</span>
          </div>
        </div>

        {/* Right Status Badge & Dropdown Chevron Toggle */}
        <div className="org-card-status-group">
          <div className="org-status-stack">
            <span
              className={`org-status-badge status-${req.status}`}
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
              <span className="org-status-dot" aria-hidden="true">•</span>
            </span>
            <span className="org-status-subtext">{expectedNote}</span>
          </div>

          <button
            type="button"
            className={`org-chevron-btn ${isExpanded ? "open" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse card details" : "Expand card timeline"}
            title={isExpanded ? "Hide progress timeline" : "Show progress timeline"}
          >
            {isExpanded ? <LuChevronUp /> : <LuChevronDown />}
          </button>
        </div>
      </div>

      {/* ========================================================
          2. 4-Column Details Grid (Compressed & Highly Organized)
         ======================================================== */}
      <div className="org-details-grid">
        {/* Col 1: Citizen Details */}
        <div className="org-col">
          <div className="org-col-icon icon-citizen" aria-hidden="true">
            <LuUser />
          </div>
          <div className="org-col-content">
            <span className="org-col-label">CITIZEN DETAILS</span>
            <span className="org-col-val-primary">{req.name}</span>
            <div className="org-col-subrow">
              <span className="org-contact-item green">
                <LuPhone className="contact-icon" aria-hidden="true" />
                <span>{req.phone}</span>
              </span>
              {req.email && (
                <span className="org-contact-item gray" title={req.email}>
                  <LuMail className="contact-icon" aria-hidden="true" />
                  <span>{req.email}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Col 2: Address & Schedule */}
        <div className="org-col">
          <div className="org-col-icon icon-address" aria-hidden="true">
            <LuMapPin />
          </div>
          <div className="org-col-content">
            <span className="org-col-label">ADDRESS & SCHEDULE</span>
            <span className="org-col-val-primary">{req.address}</span>
            {req.pincode && (
              <span className="org-pincode-text">Pincode: {req.pincode}</span>
            )}
            <div className="org-col-subrow org-schedule-subrow">
              <span className="org-schedule-date-wrap">
                <LuCalendar className="contact-icon blue" aria-hidden="true" />
                <span>{req.date}</span>
              </span>
              <span className="org-schedule-pipe" aria-hidden="true">|</span>
              <span className="org-schedule-time">{req.timeSlot}</span>
            </div>
          </div>
        </div>

        {/* Col 3: Waste Manifest */}
        <div className="org-col">
          <div className="org-col-icon icon-manifest" aria-hidden="true">
            <LuPackage />
          </div>
          <div className="org-col-content">
            <span className="org-col-label">WASTE MANIFEST</span>
            <div className="org-manifest-volume">
              <span className="org-box-emoji" aria-hidden="true">📦</span>
              <span className="org-manifest-volume-text">{req.volume}</span>
            </div>
            <div className="org-col-subrow org-weight-subrow">
              <span className="org-weight-wrap">
                <LuScale className="contact-icon amber" aria-hidden="true" />
                <span>Est. Weight: <strong>{req.estimatedWeight}</strong></span>
              </span>
              {req.measuredWeight && (
                <span className="org-verified-badge">
                  <LuCircleCheck aria-hidden="true" />
                  <span>Verified: {req.measuredWeight}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Col 4: Assigned Logistics */}
        <div className="org-col">
          <div className="org-col-icon icon-logistics" aria-hidden="true">
            <LuTruck />
          </div>
          <div className="org-col-content">
            <span className="org-col-label">ASSIGNED LOGISTICS</span>
            <span className="org-col-val-primary">
              {req.driver && req.driver !== "Unassigned" ? req.driver : "Unassigned"}
            </span>
            <div className="org-col-subrow">
              {req.driverPhone ? (
                <span className="org-contact-item purple">
                  <LuPhone className="contact-icon" aria-hidden="true" />
                  <span>{req.driverPhone}</span>
                </span>
              ) : (
                <span className="org-contact-item unassigned">
                  Driver notified on route dispatch
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. Bottom Row (Organizer Notes Pill + Manage Status Button)
         ======================================================== */}
      <div className="org-card-footer">
        {/* Left: Organizer Notes Quote Pill or Quick Advance */}
        <div className="org-footer-left">
          {req.organizerNotes ? (
            <div className="org-notes-pill">
              <span className="org-notes-quote-mark" aria-hidden="true">❝</span>
              <span className="org-notes-text">"{req.organizerNotes}"</span>
            </div>
          ) : (
            <div className="org-quick-action-slot">
              {req.status === "submitted" && (
                <button
                  type="button"
                  className="org-quick-btn"
                  onClick={() => onQuickAdvance(req)}
                >
                  <LuCircleCheck className="org-quick-icon" aria-hidden="true" />
                  <span>Confirm Slot</span>
                </button>
              )}
              {req.status === "confirmed" && (
                <button
                  type="button"
                  className="org-quick-btn"
                  onClick={() => onQuickAdvance(req)}
                >
                  <LuTruck className="org-quick-icon" aria-hidden="true" />
                  <span>Assign Driver & Van</span>
                </button>
              )}
              {req.status === "assigned" && (
                <button
                  type="button"
                  className="org-quick-btn"
                  onClick={() => onQuickAdvance(req)}
                >
                  <LuTruck className="org-quick-icon" aria-hidden="true" />
                  <span>Dispatch En Route</span>
                </button>
              )}
              {req.status === "in_transit" && (
                <button
                  type="button"
                  className="org-quick-btn mark-collected"
                  onClick={() => onQuickAdvance(req)}
                >
                  <LuSprout className="org-quick-icon green" aria-hidden="true" />
                  <span>Mark Collected</span>
                </button>
              )}
              {req.status === "collected" && (
                <button
                  type="button"
                  className="org-quick-btn"
                  onClick={() => onQuickAdvance(req)}
                >
                  <LuSprout className="org-quick-icon green" aria-hidden="true" />
                  <span>Certify Recycled</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: Manage & Change Status Button */}
        <button
          type="button"
          className="org-btn-manage-status"
          onClick={() => onOpenManage(req)}
        >
          <LuSettings className="org-manage-icon" aria-hidden="true" />
          <span>Manage & Change Status</span>
          <LuArrowRight className="org-manage-arrow" aria-hidden="true" />
        </button>
      </div>

      {/* Expandable Milestone Audit Trail */}
      {isExpanded && <TrackTimeline timeline={req.timeline} />}
    </div>
  );
}
