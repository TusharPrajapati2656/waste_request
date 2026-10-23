// src/pages/admin/views/AdminSettingsView.jsx

import { useState } from "react";
import {
  LuSave,
  LuRefreshCw,
  LuBuilding,
  LuBuilding2,
  LuMapPin,
  LuUser,
  LuClock,
  LuPhone,
  LuSiren,
  LuRadio,
  LuMessageSquare,
  LuSparkles,
  LuTriangleAlert,
  LuOctagonAlert,
  LuInfo,
  LuLeaf,
  LuCircleCheck,
} from "react-icons/lu";

/**
 * High-fidelity SVG vector illustration of the recovery depot warehouse,
 * green eco collection truck, parcel boxes, and landscape matching the mockup.
 */
function DepotWarehouseIllustration() {
  return (
    <svg
      viewBox="0 0 280 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="admin-depot-illustration"
      aria-hidden="true"
    >
      {/* Ground line */}
      <line
        x1="12"
        y1="96"
        x2="268"
        y2="96"
        stroke="#86efac"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Background Trees & Foliage */}
      <g>
        {/* Left tree cluster */}
        <ellipse cx="26" cy="72" rx="14" ry="19" fill="#22c55e" opacity="0.9" />
        <ellipse cx="38" cy="79" rx="11" ry="14" fill="#15803d" />
        <rect x="24" y="85" width="4.5" height="11" rx="1" fill="#78350f" />

        {/* Right tree cluster */}
        <ellipse cx="262" cy="69" rx="13" ry="18" fill="#22c55e" opacity="0.95" />
        <ellipse cx="250" cy="76" rx="10" ry="14" fill="#15803d" />
        <rect x="260" y="82" width="4.5" height="14" rx="1" fill="#78350f" />

        {/* Grass accents */}
        <path
          d="M14 96 L16 90 L18 96 M19 96 L21 88 L23 96"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M232 96 L234 91 L236 96 M237 96 L239 88 L241 96"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* Warehouse Depot Building */}
      <g id="warehouse-building">
        {/* Main Wall */}
        <rect x="90" y="44" width="144" height="52" fill="#dbe4ed" rx="1" />
        {/* Gable Triangle */}
        <polygon points="90,44 162,15 234,44" fill="#cbd5e1" />

        {/* Circular Attic Louver / Vent */}
        <circle cx="162" cy="33" r="6" fill="#94a3b8" />
        <circle cx="162" cy="33" r="4.2" fill="#f8fafc" />
        <line x1="162" y1="29" x2="162" y2="37" stroke="#94a3b8" strokeWidth="1" />
        <line x1="158" y1="33" x2="166" y2="33" stroke="#94a3b8" strokeWidth="1" />

        {/* Pitched Green Roof */}
        <polygon points="86,45 162,13 238,45 235,49 162,18 89,49" fill="#107548" />
        <line x1="88" y1="46" x2="162" y2="15" stroke="#15803d" strokeWidth="2.5" />
        <line x1="162" y1="15" x2="236" y2="46" stroke="#15803d" strokeWidth="2.5" />

        {/* Roll-up Shutter Garage Door */}
        <rect x="150" y="52" width="44" height="44" rx="2" fill="#334155" />
        <line x1="150" y1="58" x2="194" y2="58" stroke="#475569" strokeWidth="1.5" />
        <line x1="150" y1="64" x2="194" y2="64" stroke="#475569" strokeWidth="1.5" />
        <line x1="150" y1="70" x2="194" y2="70" stroke="#475569" strokeWidth="1.5" />
        <line x1="150" y1="76" x2="194" y2="76" stroke="#475569" strokeWidth="1.5" />
        <line x1="150" y1="82" x2="194" y2="82" stroke="#475569" strokeWidth="1.5" />
        <line x1="150" y1="88" x2="194" y2="88" stroke="#475569" strokeWidth="1.5" />
        {/* Shutter handle */}
        <rect x="168" y="91" width="8" height="2" rx="0.5" fill="#94a3b8" />

        {/* Side Office Window */}
        <rect x="104" y="56" width="14" height="20" rx="1.5" fill="#bae6fd" stroke="#64748b" strokeWidth="1.2" />
        <line x1="111" y1="56" x2="111" y2="76" stroke="#64748b" strokeWidth="1" />
        <line x1="104" y1="66" x2="118" y2="66" stroke="#64748b" strokeWidth="1" />
      </g>

      {/* Stacked Cargo / Cardboard Boxes */}
      <g id="cargo-boxes">
        {/* Bottom crate 1 */}
        <rect x="198" y="79" width="15" height="17" rx="1.5" fill="#d97706" stroke="#b45309" strokeWidth="0.8" />
        <line x1="205.5" y1="79" x2="205.5" y2="96" stroke="#b45309" strokeWidth="0.8" />
        {/* Bottom crate 2 */}
        <rect x="215" y="75" width="17" height="21" rx="1.5" fill="#f59e0b" stroke="#d97706" strokeWidth="0.8" />
        <line x1="223.5" y1="75" x2="223.5" y2="96" stroke="#d97706" strokeWidth="0.8" />
        {/* Top stacked box */}
        <rect x="202" y="66" width="14" height="13" rx="1.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        <line x1="209" y1="66" x2="209" y2="79" stroke="#d97706" strokeWidth="0.8" />
      </g>

      {/* Green Electric Recycling Truck */}
      <g id="recycling-truck">
        {/* Cargo Container */}
        <rect x="46" y="62" width="44" height="28" rx="2.5" fill="#10b981" />
        {/* Subtle highlight line */}
        <line x1="46" y1="65" x2="90" y2="65" stroke="#34d399" strokeWidth="1" />

        {/* White Recycling Logo */}
        <g transform="translate(68, 76)">
          <path d="M-3,-6 L0,-1 L-6,-1 Z" fill="#ffffff" />
          <path d="M5,-2 L4,4 L0,0 Z" fill="#ffffff" />
          <path d="M-2,6 L-6,2 L-2,0 Z" fill="#ffffff" />
          <circle cx="0" cy="0" r="4.2" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="5 2.5" fill="none" />
        </g>

        {/* Truck Driver Cab */}
        <path d="M46,72 L35,72 L28,80 L28,90 L46,90 Z" fill="#059669" />
        {/* Windshield */}
        <polygon points="43,74 36,74 31,80 43,80" fill="#0f172a" />
        {/* Headlight & Bumper */}
        <rect x="26" y="85" width="3" height="4" rx="1" fill="#fef08a" />
        <rect x="25" y="88" width="5" height="2.5" rx="0.5" fill="#475569" />

        {/* Wheels */}
        <circle cx="36" cy="94" r="5.2" fill="#1e293b" />
        <circle cx="36" cy="94" r="2.2" fill="#94a3b8" />
        <circle cx="54" cy="94" r="5.2" fill="#1e293b" />
        <circle cx="54" cy="94" r="2.2" fill="#94a3b8" />
        <circle cx="78" cy="94" r="5.2" fill="#1e293b" />
        <circle cx="78" cy="94" r="2.2" fill="#94a3b8" />
      </g>
    </svg>
  );
}

const PRESET_NOTICES = [
  {
    label: "🌧️ Monsoon Rain Delay",
    type: "warning",
    text: "Heavy rainfall alert across Sector 14 routes. Dispatches may experience 20-30 minute delays.",
  },
  {
    label: "🚧 Sector 14 Road Works",
    type: "danger",
    text: "Civil road maintenance on Sector 14 main avenue. Fleet rerouted through Outer Ring Road bypass.",
  },
  {
    label: "⚡ Peak Collection Surge",
    type: "warning",
    text: "High collection volume in progress today. Estimated driver arrival windows adjusted by +30 mins.",
  },
  {
    label: "🔋 Fleet EV Charging Shift",
    type: "info",
    text: "Scheduled depot battery replenishment window 02:00 PM - 03:30 PM. All drop-offs open as normal.",
  },
  {
    label: "✅ Normal Ops Restored",
    type: "success",
    text: "All collection corridors clear. Vehicles running on standard timetables.",
  },
];

const NOTICE_TYPE_META = {
  warning: {
    title: "Weather & Route Delay Alert",
    icon: <LuTriangleAlert />,
    chipClass: "warning",
    badgeLabel: "Weather Advisory",
  },
  danger: {
    title: "Critical Route & Traffic Emergency",
    icon: <LuOctagonAlert />,
    chipClass: "danger",
    badgeLabel: "Emergency Halt",
  },
  info: {
    title: "Hub Depot Operational Notice",
    icon: <LuInfo />,
    chipClass: "info",
    badgeLabel: "Depot Update",
  },
  success: {
    title: "Service Resumption & Green Milestone",
    icon: <LuLeaf />,
    chipClass: "success",
    badgeLabel: "Normal Ops",
  },
};

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
    emergencyNotice: settings.emergencyNotice || {
      enabled: false,
      text: "Heavy rainfall alert across Sector 14 routes. Dispatches may experience 20-30 minute delays.",
      type: "warning",
    },
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleNoticeChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      emergencyNotice: {
        ...prev.emergencyNotice,
        [field]: val,
      },
    }));
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      emergencyNotice: {
        ...prev.emergencyNotice,
        text: preset.text,
        type: preset.type,
      },
    }));
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setHasChanges(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const currentNoticeType = formData.emergencyNotice.type || "warning";
  const activeMeta = NOTICE_TYPE_META[currentNoticeType] || NOTICE_TYPE_META.warning;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.8rem" }}>
      {/* Top Header */}
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
            title="Reset system to default demo data"
          >
            <LuRefreshCw />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.6rem" }}>
        {/* ===================================================================
            Card 1: Depot Identity & Operating Hours (Exact Match to Mockup)
            =================================================================== */}
        <div className="admin-hub-card">
          {/* Card Header with Depot Graphic */}
          <div className="admin-hub-header">
            <div className="admin-hub-header-left">
              <div className="admin-hub-badge-icon">
                <LuBuilding2 />
              </div>
              <div className="admin-hub-title-group">
                <h2 className="admin-hub-title">Depot Identity & Operating Hours</h2>
                <p className="admin-hub-subtitle">
                  Operational identifiers displayed on manifests and inspection reports.
                </p>
              </div>
            </div>

            <div className="admin-hub-header-graphic">
              <DepotWarehouseIllustration />
            </div>
          </div>

          {/* 6-Field 2-Column Grid */}
          <div className="admin-hub-grid">
            {/* Field 1: Regional Hub Name */}
            <div className="admin-hub-field-card">
              <div className="admin-hub-field-icon pin">
                <LuMapPin />
              </div>
              <div className="admin-hub-field-info">
                <label className="admin-hub-field-label" htmlFor="hubName">
                  REGIONAL HUB NAME
                </label>
                <input
                  id="hubName"
                  name="hubName"
                  type="text"
                  className="admin-hub-field-input"
                  value={formData.hubName}
                  onChange={handleChange}
                  placeholder="GreenCycle Regional Recovery Depot - Sector 14"
                  required
                />
              </div>
            </div>

            {/* Field 2: Depot Facility Code */}
            <div className="admin-hub-field-card">
              <div className="admin-hub-field-icon building">
                <LuBuilding />
              </div>
              <div className="admin-hub-field-info">
                <label className="admin-hub-field-label" htmlFor="hubCode">
                  DEPOT FACILITY CODE
                </label>
                <input
                  id="hubCode"
                  name="hubCode"
                  type="text"
                  className="admin-hub-field-input"
                  value={formData.hubCode}
                  onChange={handleChange}
                  placeholder="DEL-NCR-014"
                  required
                />
              </div>
            </div>

            {/* Field 3: Head Operations Director */}
            <div className="admin-hub-field-card">
              <div className="admin-hub-field-icon user">
                <LuUser />
              </div>
              <div className="admin-hub-field-info">
                <label className="admin-hub-field-label" htmlFor="headOperator">
                  HEAD OPERATIONS DIRECTOR
                </label>
                <input
                  id="headOperator"
                  name="headOperator"
                  type="text"
                  className="admin-hub-field-input"
                  value={formData.headOperator}
                  onChange={handleChange}
                  placeholder="Tushar Kumar (Regional Lead)"
                  required
                />
              </div>
            </div>

            {/* Field 4: Operating Schedule Window + "Open Today" Pill */}
            <div className="admin-hub-field-card">
              <div className="admin-hub-field-icon clock">
                <LuClock />
              </div>
              <div className="admin-hub-field-info">
                <label className="admin-hub-field-label" htmlFor="operatingHours">
                  OPERATING SCHEDULE WINDOW
                </label>
                <input
                  id="operatingHours"
                  name="operatingHours"
                  type="text"
                  className="admin-hub-field-input"
                  value={formData.operatingHours}
                  onChange={handleChange}
                  placeholder="07:30 AM - 07:00 PM (Mon - Sun)"
                  required
                />
              </div>
              <div className="admin-hub-status-pill open" title="Depot is operational today">
                <span className="admin-hub-status-dot" aria-hidden="true" />
                <span>Open Today</span>
              </div>
            </div>

            {/* Field 5: Central Dispatch Hotline */}
            <div className="admin-hub-field-card">
              <div className="admin-hub-field-icon phone">
                <LuPhone />
              </div>
              <div className="admin-hub-field-info">
                <label className="admin-hub-field-label" htmlFor="dispatchHotline">
                  CENTRAL DISPATCH HOTLINE
                </label>
                <input
                  id="dispatchHotline"
                  name="dispatchHotline"
                  type="text"
                  className="admin-hub-field-input"
                  value={formData.dispatchHotline}
                  onChange={handleChange}
                  placeholder="+91 11 4988 2200"
                  required
                />
              </div>
            </div>

            {/* Field 6: Emergency Telematics Phone */}
            <div className="admin-hub-field-card">
              <div className="admin-hub-field-icon siren">
                <LuSiren />
              </div>
              <div className="admin-hub-field-info">
                <label className="admin-hub-field-label" htmlFor="emergencyPhone">
                  EMERGENCY TELEMATICS PHONE
                </label>
                <input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="text"
                  className="admin-hub-field-input"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="+91 99999 00112"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            Card 2: Upgraded Emergency Public Broadcast & Textarea Section
            =================================================================== */}
        <div className="admin-hub-card">
          {/* Card Header with Interactive Toggle Switch */}
          <div className="admin-hub-header">
            <div className="admin-hub-header-left">
              <div className="admin-hub-badge-icon broadcast">
                <LuRadio />
              </div>
              <div className="admin-hub-title-group">
                <h2 className="admin-hub-title">Emergency Public Broadcast Alert</h2>
                <p className="admin-hub-subtitle">
                  Displays a high-visibility real-time banner on the public citizen booking portal and tracking interface.
                </p>
              </div>
            </div>

            {/* Right: Live Status Badge & Toggle Switch */}
            <div className="admin-broadcast-header-right">
              <div
                className={`admin-broadcast-status-badge ${
                  formData.emergencyNotice.enabled ? "live" : "offline"
                }`}
              >
                {formData.emergencyNotice.enabled && (
                  <span className="admin-hub-status-dot" aria-hidden="true" />
                )}
                <span>
                  {formData.emergencyNotice.enabled ? "Live on Citizen Portal" : "Broadcast Offline"}
                </span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={formData.emergencyNotice.enabled}
                className={`admin-toggle-switch ${formData.emergencyNotice.enabled ? "checked" : ""}`}
                onClick={() => handleNoticeChange("enabled", !formData.emergencyNotice.enabled)}
                title={formData.emergencyNotice.enabled ? "Disable notice" : "Enable notice"}
              >
                <span className="admin-toggle-slider" />
              </button>
            </div>
          </div>

          {/* Upgraded Framed Textarea Container */}
          <div className="admin-textarea-frame">
            <div className="admin-textarea-header">
              <div className="admin-textarea-label-wrap">
                <LuMessageSquare style={{ color: "#10b981", fontSize: "1.6rem" }} />
                <span>Broadcast Notice Message Payload</span>
              </div>
              <span className="admin-textarea-char-count">
                {formData.emergencyNotice.text.length} / 250 characters
              </span>
            </div>

            <textarea
              className="admin-textarea-input"
              rows={3}
              maxLength={250}
              value={formData.emergencyNotice.text}
              onChange={(e) => handleNoticeChange("text", e.target.value)}
              placeholder="e.g. Heavy rainfall alert across Sector 14 routes. Dispatches may experience 20-30 minute delays."
            />

            {/* Quick Templates Toolbar */}
            <div className="admin-textarea-presets">
              <span className="admin-presets-title">
                <LuSparkles style={{ color: "#f59e0b" }} />
                Quick Presets:
              </span>
              {PRESET_NOTICES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="admin-preset-btn"
                  onClick={() => handleApplyPreset(preset)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Citizen Portal Preview */}
          <div className="admin-preview-section">
            <div className="admin-preview-section-title">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
                <LuSparkles style={{ color: "#10b981" }} />
                Citizen Portal Live Banner Preview
              </span>
              <span style={{ fontSize: "1.15rem", color: "#64748b" }}>
                Status: {formData.emergencyNotice.enabled ? "Active for citizens" : "Hidden"}
              </span>
            </div>

            {formData.emergencyNotice.enabled ? (
              <div className={`admin-portal-banner ${currentNoticeType}`}>
                <div className="admin-portal-banner-icon">
                  {activeMeta.icon}
                </div>
                <div className="admin-portal-banner-text">
                  <span className="admin-portal-banner-title">{activeMeta.title}</span>
                  <p className="admin-portal-banner-body">
                    {formData.emergencyNotice.text || "No notice message entered."}
                  </p>
                </div>
                <span className="admin-portal-banner-badge">{activeMeta.badgeLabel}</span>
              </div>
            ) : (
              <div className="admin-portal-banner-dormant">
                Notice is currently disabled and not shown to citizens. Toggle the switch above to activate this broadcast.
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================
            Bottom Action Bar: Save & Reset
            =================================================================== */}
        <div className="admin-hub-save-bar">
          <div className={`admin-save-bar-status ${saveSuccess ? "saved" : ""}`}>
            {saveSuccess ? (
              <>
                <LuCircleCheck style={{ fontSize: "1.8rem" }} />
                <span>Hub configuration and broadcast alert saved successfully!</span>
              </>
            ) : hasChanges ? (
              <span style={{ color: "#d97706" }}>
                ● Unsaved changes pending. Click "Save Hub Configuration" to apply.
              </span>
            ) : (
              <span>Synced with regional recovery depot local storage</span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              style={{ padding: "1.2rem 2.8rem", fontSize: "1.45rem", gap: "0.9rem" }}
            >
              <LuSave style={{ fontSize: "1.7rem" }} />
              <span>Save Hub Configuration</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
