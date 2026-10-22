// src/pages/organizer/components/OrganizerRequestCard.jsx

import {
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { STATUS_MAP } from "../../../services/requestStore";

export default function OrganizerRequestCard({
  request,
  onQuickAdvance,
  onOpenManage,
}) {
  const req = request;
  const statusCfg = STATUS_MAP[req.status] || {
    label: req.status,
    color: "#18251e",
    bg: "#f2f6f3",
  };

  return (
    <div className="organizer-request-card">
      {/* Card Header */}
      <div className="req-header">
        <div className="req-id-wrap">
          <span className="req-id-badge">{req.id}</span>
          <h3 className="req-service-title">{req.wasteType}</h3>
        </div>

        <span
          className="status-badge"
          style={{ background: statusCfg.bg, color: statusCfg.color }}
        >
          {req.status === "in_transit" && <FiTruck />}
          {req.status === "completed" && <FiCheckCircle />}
          {req.status === "submitted" && <FiClock />}
          {statusCfg.label}
        </span>
      </div>

      {/* Card Details Grid */}
      <div className="req-details-grid">
        <div className="detail-block">
          <h4>Citizen Details</h4>
          <p>
            <strong>{req.name}</strong>
          </p>
          <p>
            <FiPhone style={{ display: "inline", verticalAlign: "middle" }} />{" "}
            {req.phone}
          </p>
          {req.email && (
            <p style={{ fontSize: "1.3rem", color: "var(--text-muted)" }}>
              {req.email}
            </p>
          )}
        </div>

        <div className="detail-block">
          <h4>Address & Schedule</h4>
          <p>
            <FiMapPin style={{ display: "inline", verticalAlign: "middle" }} />{" "}
            {req.address}
          </p>
          {req.pincode && (
            <p style={{ fontSize: "1.3rem", color: "var(--text-secondary)" }}>
              Pincode: {req.pincode}
            </p>
          )}
          <p
            style={{
              fontSize: "1.3rem",
              color: "var(--primary-dark)",
              fontWeight: "600",
              marginTop: "0.4rem",
            }}
          >
            🗓️ {req.date} ({req.timeSlot})
          </p>
        </div>

        <div className="detail-block">
          <h4>Waste Manifest</h4>
          <p>
            📦 <strong>Volume:</strong> {req.volume}
          </p>
          <p>
            ⚖️ <strong>Est:</strong> {req.estimatedWeight}
          </p>
          {req.measuredWeight && (
            <p style={{ color: "var(--primary)", fontWeight: "700" }}>
              ✓ Measured: {req.measuredWeight}
            </p>
          )}
        </div>

        <div className="detail-block">
          <h4>Assigned Logistics</h4>
          <p>
            🚛 <strong>{req.driver}</strong>
          </p>
          {req.driverPhone && (
            <p style={{ fontSize: "1.3rem" }}>📞 {req.driverPhone}</p>
          )}
          {req.organizerNotes && (
            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--text-secondary)",
                marginTop: "0.4rem",
                fontStyle: "italic",
              }}
            >
              "{req.organizerNotes}"
            </p>
          )}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="req-actions-bar">
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          {req.status === "submitted" && (
            <button
              type="button"
              className="quick-action-btn"
              onClick={() => onQuickAdvance(req)}
            >
              ✓ Confirm Slot
            </button>
          )}

          {req.status === "confirmed" && (
            <button
              type="button"
              className="quick-action-btn"
              onClick={() => onQuickAdvance(req)}
            >
              🚛 Assign Driver & Van
            </button>
          )}

          {req.status === "assigned" && (
            <button
              type="button"
              className="quick-action-btn"
              onClick={() => onQuickAdvance(req)}
            >
              🚀 Dispatch En Route
            </button>
          )}

          {req.status === "in_transit" && (
            <button
              type="button"
              className="quick-action-btn"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
              }}
              onClick={() => onQuickAdvance(req)}
            >
              ⚖️ Mark Collected
            </button>
          )}

          {req.status === "collected" && (
            <button
              type="button"
              className="quick-action-btn"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
              }}
              onClick={() => onQuickAdvance(req)}
            >
              🌱 Certify Recycled
            </button>
          )}
        </div>

        <button
          type="button"
          className="btn-manage-status"
          onClick={() => onOpenManage(req)}
        >
          Manage & Change Status
        </button>
      </div>
    </div>
  );
}
