// src/pages/admin/views/AdminSettingsView.jsx

import { useState } from "react";
import { LuSave, LuRefreshCw } from "react-icons/lu";

export default function AdminSettingsView({
  settings = {},
  onSaveSettings,
  onResetAllData,
}) {
  const [formData, setFormData] = useState({
    hubName: settings.hubName || "GreenCycle Regional Recovery Depot - Sector 14",
    hubCode: settings.hubCode || "DEL-NCR-014",
    headOperator: settings.headOperator || "Tushar Kumar (Regional Lead)",
    dispatchHotline: settings.dispatchHotline || "+91 11 4988 2200",
    emergencyPhone: settings.emergencyPhone || "+91 99999 00112",
    operatingHours: settings.operatingHours || "07:30 AM - 07:00 PM (Mon - Sun)",
    autoAssignDrivers: settings.autoAssignDrivers ?? true,
    co2OffsetRatePerKg: settings.co2OffsetRatePerKg || 1.84,
    emergencyNotice: settings.emergencyNotice || {
      enabled: false,
      text: "Heavy rainfall alert across Sector 14 routes. Dispatches may experience 20-30 minute delays.",
      type: "warning",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNoticeChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      emergencyNotice: {
        ...prev.emergencyNotice,
        [field]: val,
      },
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.8rem" }}>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-titles">
          <h1 className="admin-page-h1">Hub Depot Configuration & System Settings</h1>
          <p className="admin-page-desc">
            Manage regional depot identity, dispatch hotlines, emergency citizen broadcast alerts, and system resets.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-danger"
            onClick={onResetAllData}
          >
            <LuRefreshCw />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
        {/* Hub Identity Card */}
        <div className="admin-card-container" style={{ padding: "2.8rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.6rem" }}>
            Depot Identity & Operating Hours
          </h2>
          <p style={{ fontSize: "1.35rem", color: "#64748b", margin: "0 0 2rem" }}>
            Operational identifiers displayed on manifests and inspection reports
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            <div className="admin-form-grid-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Regional Hub Name</label>
                <input
                  type="text"
                  name="hubName"
                  className="admin-form-input"
                  value={formData.hubName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Depot Facility Code</label>
                <input
                  type="text"
                  name="hubCode"
                  className="admin-form-input"
                  value={formData.hubCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="admin-form-grid-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Head Operations Director</label>
                <input
                  type="text"
                  name="headOperator"
                  className="admin-form-input"
                  value={formData.headOperator}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Operating Schedule Window</label>
                <input
                  type="text"
                  name="operatingHours"
                  className="admin-form-input"
                  value={formData.operatingHours}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="admin-form-grid-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Central Dispatch Hotline</label>
                <input
                  type="text"
                  name="dispatchHotline"
                  className="admin-form-input"
                  value={formData.dispatchHotline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Emergency Telematics Phone</label>
                <input
                  type="text"
                  name="emergencyPhone"
                  className="admin-form-input"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Citizen Broadcast Notice */}
        <div className="admin-card-container" style={{ padding: "2.8rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.4rem" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.6rem" }}>
                Emergency Public Broadcast Alert
              </h2>
              <p style={{ fontSize: "1.35rem", color: "#64748b", margin: 0 }}>
                Displays a prominent banner on public citizen booking portal during weather emergencies or route closures.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <input
                type="checkbox"
                id="emergency-enabled"
                checked={formData.emergencyNotice.enabled}
                onChange={(e) => handleNoticeChange("enabled", e.target.checked)}
                style={{ width: "1.8rem", height: "1.8rem" }}
              />
              <label htmlFor="emergency-enabled" style={{ fontSize: "1.4rem", fontWeight: "700" }}>
                Enable Live Notice
              </label>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Broadcast Notice Message</label>
            <textarea
              className="admin-form-textarea"
              rows="3"
              value={formData.emergencyNotice.text}
              onChange={(e) => handleNoticeChange("text", e.target.value)}
              placeholder="e.g. Heavy rainfall alert across Sector 14 routes. Dispatches may experience 20-30 minute delays."
            />
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: "1.2rem 2.8rem" }}>
            <LuSave />
            <span>Save Hub Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
