// src/pages/organizer/components/OrganizerManageModal.jsx

import { FiX } from "react-icons/fi";
import { PRESET_DRIVERS } from "../data/organizerData";

export default function OrganizerManageModal({
  activeRequest,
  onClose,
  onSubmit,
  editStatus,
  setEditStatus,
  editDriver,
  setEditDriver,
  editDriverPhone,
  setEditDriverPhone,
  editWeight,
  setEditWeight,
  editNotes,
  setEditNotes,
}) {
  if (!activeRequest) return null;

  return (
    <div
      className="organizer-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="organizer-modal" role="dialog" aria-modal="true">
        <button
          className="auth-close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FiX />
        </button>

        <span className="section-tag">Dispatcher Control</span>
        <h2 style={{ margin: "0.8rem 0 0.4rem", fontSize: "2.2rem" }}>
          Manage Request: {activeRequest.id}
        </h2>
        <p
          style={{
            margin: "0 0 2rem",
            color: "var(--text-secondary)",
            fontSize: "1.4rem",
          }}
        >
          Citizen: <strong>{activeRequest.name}</strong> • {activeRequest.wasteType}
        </p>

        <form onSubmit={onSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="edit-status">Update Lifecycle Status *</label>
            <select
              id="edit-status"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              required
            >
              <option value="submitted">1. Request Submitted (Pending review)</option>
              <option value="confirmed">2. Confirmed (Approved slot)</option>
              <option value="assigned">3. Driver Assigned</option>
              <option value="in_transit">4. Out for Collection (En route)</option>
              <option value="collected">5. Collected & Weighed at Doorstep</option>
              <option value="completed">6. Recycled & Certified (Closed)</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preset-driver">Assign Collection Crew / Vehicle</label>
            <select
              id="preset-driver"
              onChange={(e) => {
                const found = PRESET_DRIVERS.find((d) => d.name === e.target.value);
                if (found) {
                  setEditDriver(found.name);
                  setEditDriverPhone(found.phone);
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>
                -- Select verified driver --
              </option>
              {PRESET_DRIVERS.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.phone})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="driver-name-custom">Driver Name & Vehicle</label>
              <input
                id="driver-name-custom"
                type="text"
                placeholder="e.g. Ramesh Kumar (EV Van #12)"
                value={editDriver}
                onChange={(e) => setEditDriver(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="driver-phone-custom">Driver Contact</label>
              <input
                id="driver-phone-custom"
                type="tel"
                placeholder="+91 98111 22334"
                value={editDriverPhone}
                onChange={(e) => setEditDriverPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="measured-weight">Actual Measured Weight (kg)</label>
            <input
              id="measured-weight"
              type="text"
              placeholder="e.g. 14.5 kg"
              value={editWeight}
              onChange={(e) => setEditWeight(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="organizer-notes">Dispatch Remarks & Manifest Notes</label>
            <textarea
              id="organizer-notes"
              placeholder="e.g. Recyclables dry and sorted. Dispatched to Sector 18 sorting conveyor."
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              style={{
                padding: "1.1rem 1.4rem",
                border: "0.15rem solid var(--border-strong)",
                borderRadius: "var(--radius-md)",
                fontSize: "1.4rem",
                minHeight: "8rem",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "1.2rem", marginTop: "1rem" }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Save & Update Status
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
