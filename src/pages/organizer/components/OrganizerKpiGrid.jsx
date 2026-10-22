// src/pages/organizer/components/OrganizerKpiGrid.jsx

export default function OrganizerKpiGrid({ kpis }) {
  const {
    totalCount,
    pendingCount,
    activeCount,
    completedCount,
    totalDivertedKg,
  } = kpis;

  return (
    <div className="organizer-kpi-grid">
      <div className="kpi-card">
        <span className="kpi-label">Total Requests</span>
        <span className="kpi-value">{totalCount}</span>
        <span className="kpi-sub">Across all city sectors</span>
      </div>

      <div className="kpi-card kpi-pending">
        <span className="kpi-label">Awaiting Confirmation</span>
        <span className="kpi-value">{pendingCount}</span>
        <span className="kpi-sub">Needs depot review</span>
      </div>

      <div className="kpi-card kpi-active">
        <span className="kpi-label">Active / Dispatched</span>
        <span className="kpi-value">{activeCount}</span>
        <span className="kpi-sub">Vehicles on collection routes</span>
      </div>

      <div className="kpi-card kpi-completed">
        <span className="kpi-label">Completed & Certified</span>
        <span className="kpi-value">{completedCount}</span>
        <span className="kpi-sub">Processed at recycling plants</span>
      </div>

      <div className="kpi-card">
        <span className="kpi-label">Diverted Waste</span>
        <span className="kpi-value">{totalDivertedKg.toFixed(1)} kg</span>
        <span className="kpi-sub">Audited scale receipts</span>
      </div>
    </div>
  );
}
