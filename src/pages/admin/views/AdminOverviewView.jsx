// src/pages/admin/views/AdminOverviewView.jsx

import {
  LuClipboardList,
  LuTruck,
  LuScale,
  LuLeaf,
  LuArrowUpRight,
  LuCircleCheck,
  LuClock,
  LuPlus,
  LuDownload,
  LuMapPin,
} from "react-icons/lu";

export default function AdminOverviewView({
  requests = [],
  drivers = [],
  onOpenNewBooking,
  onNavigateTab,
  onQuickAdvance,
  onEditRequest,
}) {
  // Compute real-time KPIs
  const totalCount = requests.length;
  const pendingCount = requests.filter(
    (r) => r.status === "submitted" || r.status === "confirmed"
  ).length;
  const activeDispatchedCount = requests.filter(
    (r) => r.status === "in_transit" || r.status === "assigned"
  ).length;

  // Estimated total weight in kg
  const totalWeightKg = requests.reduce((acc, r) => {
    const raw = r.measuredWeight || r.estimatedWeight || "0";
    const num = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;
    return acc + num;
  }, 0);

  const availableDrivers = drivers.filter((d) => d.status === "Available").length;

  const urgentQueue = requests
    .filter((r) => r.status === "submitted" || r.status === "confirmed")
    .slice(0, 4);

  const handleExportCsv = () => {
    const headers = ["ID", "Citizen", "Phone", "Category", "Status", "Driver", "Date", "Address"];
    const rows = requests.map((r) => [
      r.id,
      `"${r.name}"`,
      r.phone,
      r.wasteType,
      r.status,
      `"${r.driver}"`,
      r.date,
      `"${r.address}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `greencycle_manifest_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.2rem" }}>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-titles">
          <h1 className="admin-page-h1">Operations Telematics & Command Center</h1>
          <p className="admin-page-desc">
            Real-time status of door-to-door pickups, EV fleet dispatching & certified recycling manifests.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={handleExportCsv}
          >
            <LuDownload />
            <span>Export Daily Manifest</span>
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={onOpenNewBooking}
          >
            <LuPlus />
            <span>Log Pickup Booking</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box green">
              <LuClipboardList />
            </div>
            <span className="admin-kpi-trend up">
              <LuArrowUpRight /> +14.2% today
            </span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">{totalCount}</span>
            <span className="admin-kpi-label">Total Registered Bookings</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box blue">
              <LuTruck />
            </div>
            <span className="admin-kpi-trend up">
              {availableDrivers} drivers ready
            </span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">{activeDispatchedCount}</span>
            <span className="admin-kpi-label">Active Dispatches En Route</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box amber">
              <LuClock />
            </div>
            <span className="admin-kpi-trend neutral">
              Action Required
            </span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">{pendingCount}</span>
            <span className="admin-kpi-label">Awaiting Depot Approval</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box purple">
              <LuScale />
            </div>
            <span className="admin-kpi-trend up">
              <LuLeaf /> 98.4% diverted
            </span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">{totalWeightKg.toFixed(1)} kg</span>
            <span className="admin-kpi-label">Total Material Diverted</span>
          </div>
        </div>
      </div>

      {/* Middle Layout: Urgent Action Queue & Fleet Status */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(42rem, 1fr))", gap: "2.4rem" }}>
        {/* Urgent Attention Queue */}
        <div className="admin-card-container">
          <div
            style={{
              padding: "2rem 2.4rem",
              borderBottom: "0.1rem solid var(--admin-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.7rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                Urgent Dispatch Queue
              </h2>
              <span style={{ fontSize: "1.25rem", color: "#64748b" }}>
                Bookings needing immediate driver or slot confirmation
              </span>
            </div>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              style={{ padding: "0.6rem 1.2rem", fontSize: "1.2rem" }}
              onClick={() => onNavigateTab("requests")}
            >
              View All
            </button>
          </div>

          <div style={{ padding: "1.6rem 2.4rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {urgentQueue.length === 0 ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>
                <LuCircleCheck style={{ fontSize: "3rem", color: "#10b981", margin: "0 auto 1rem" }} />
                <p style={{ margin: 0, fontWeight: "600" }}>All bookings currently scheduled & assigned!</p>
              </div>
            ) : (
              urgentQueue.map((req) => (
                <div
                  key={req.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.4rem 1.8rem",
                    borderRadius: "var(--admin-radius-md)",
                    background: "#f8fafc",
                    border: "0.1rem solid var(--admin-border)",
                    gap: "1.4rem",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <strong style={{ fontSize: "1.45rem", color: "#0f172a" }}>{req.id}</strong>
                      <span className={`admin-chip chip-${req.status}`}>
                        {req.status === "submitted" ? "New Booking" : "Confirmed"}
                      </span>
                    </div>
                    <span style={{ fontSize: "1.3rem", color: "#334155", fontWeight: "600" }}>
                      {req.name} • {req.wasteType}
                    </span>
                    <span style={{ fontSize: "1.2rem", color: "#64748b", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                      <LuMapPin /> {req.address}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "0.8rem", flexShrink: 0 }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-primary"
                      style={{ padding: "0.7rem 1.4rem", fontSize: "1.25rem" }}
                      onClick={() => onQuickAdvance(req)}
                    >
                      {req.status === "submitted" ? "Confirm Slot" : "Assign Driver"}
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "0.7rem 1.2rem", fontSize: "1.25rem" }}
                      onClick={() => onEditRequest(req)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fleet Status Snapshot */}
        <div className="admin-card-container">
          <div
            style={{
              padding: "2rem 2.4rem",
              borderBottom: "0.1rem solid var(--admin-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.7rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                Depot Fleet Deployment
              </h2>
              <span style={{ fontSize: "1.25rem", color: "#64748b" }}>
                Active electric vans & cargo vehicles
              </span>
            </div>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              style={{ padding: "0.6rem 1.2rem", fontSize: "1.2rem" }}
              onClick={() => onNavigateTab("fleet")}
            >
              Manage Fleet
            </button>
          </div>

          <div style={{ padding: "1.6rem 2.4rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {drivers.slice(0, 4).map((drv) => (
              <div
                key={drv.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.2rem 1.6rem",
                  borderRadius: "var(--admin-radius-md)",
                  border: "0.1rem solid var(--admin-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "1rem",
                      background: drv.avatarColor,
                      color: "#ffffff",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: "800",
                      fontSize: "1.4rem",
                    }}
                  >
                    {drv.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong style={{ fontSize: "1.4rem", color: "#0f172a" }}>{drv.name}</strong>
                    <span style={{ fontSize: "1.2rem", color: "#64748b" }}>
                      {drv.vehicleReg}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
                  <span
                    style={{
                      padding: "0.3rem 0.9rem",
                      borderRadius: "9999px",
                      fontSize: "1.15rem",
                      fontWeight: "700",
                      background:
                        drv.status === "Available"
                          ? "#ecfdf5"
                          : drv.status === "En Route"
                          ? "#eff6ff"
                          : "#f1f5f9",
                      color:
                        drv.status === "Available"
                          ? "#059669"
                          : drv.status === "En Route"
                          ? "#1d4ed8"
                          : "#475569",
                    }}
                  >
                    {drv.status}
                  </span>
                  <span style={{ fontSize: "1.15rem", color: "#64748b" }}>
                    Battery: {drv.batteryLevel}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
