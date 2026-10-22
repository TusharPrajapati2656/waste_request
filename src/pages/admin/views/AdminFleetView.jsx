// src/pages/admin/views/AdminFleetView.jsx

import { useState } from "react";
import {
  LuTruck,
  LuPlus,
  LuBatteryCharging,
  LuStar,
  LuPencil,
  LuTrash2,
  LuCircleCheck,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";

export default function AdminFleetView({
  drivers = [],
  onOpenAddDriver,
  onEditDriver,
  onDeleteDriver,
  onUpdateDriverStatus,
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterZone, setFilterZone] = useState("all");

  const filteredDrivers = drivers.filter((d) => {
    if (filterStatus !== "all" && d.status !== filterStatus) return false;
    if (filterZone !== "all" && d.zone !== filterZone) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.8rem" }}>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-titles">
          <h1 className="admin-page-h1">
            Fleet Logistics & Electric Vehicle Tracking
          </h1>
          <p className="admin-page-desc">
            Real-time management of driver allocations, battery telematics, and
            zero-emission collection routes.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={onOpenAddDriver}
          >
            <LuPlus />
            <span>Add Driver / Vehicle</span>
          </button>
        </div>
      </div>

      {/* Fleet Telematics Overview */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box green">
              <LuTruck />
            </div>
            <span className="admin-kpi-trend up">100% Electric</span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">{drivers.length}</span>
            <span className="admin-kpi-label">Active Fleet Vehicles</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box blue">
              <LuCircleCheck />
            </div>
            <span className="admin-kpi-trend up">Ready for dispatch</span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">
              {drivers.filter((d) => d.status === "Available").length}
            </span>
            <span className="admin-kpi-label">Available Drivers</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box amber">
              <LuBatteryCharging />
            </div>
            <span className="admin-kpi-trend up">Avg 84% charge</span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">
              {drivers.filter((d) => d.status === "En Route").length}
            </span>
            <span className="admin-kpi-label">Vehicles En Route</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box purple">
              <LuStar />
            </div>
            <span className="admin-kpi-trend up">High Satisfaction</span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">4.85 ★</span>
            <span className="admin-kpi-label">Citizen Driver Rating</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        className="admin-card-container"
        style={{ padding: "1.6rem 2.4rem" }}
      >
        <div
          style={{
            display: "flex",
            gap: "1.6rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "1.3rem", fontWeight: "700", color: "#334155" }}
          >
            Filter Drivers:
          </span>
          <select
            className="admin-filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Duty Statuses</option>
            <option value="Available">Available</option>
            <option value="En Route">En Route</option>
            <option value="On Break">On Break</option>
            <option value="Off Duty">Off Duty</option>
          </select>

          <select
            className="admin-filter-select"
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
          >
            <option value="all">All Operational Zones</option>
            <option value="Sector 14 Central">Sector 14 Central</option>
            <option value="Sector 22 North">Sector 22 North</option>
            <option value="Sector 18 Cyber Hub">Sector 18 Cyber Hub</option>
            <option value="Sector 9 South">Sector 9 South</option>
            <option value="Industrial Area East">Industrial Area East</option>
          </select>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="admin-fleet-grid">
        {filteredDrivers.map((driver) => {
          const statusColors = {
            Available: { bg: "#ecfdf5", color: "#059669" },
            "En Route": { bg: "#eff6ff", color: "#1d4ed8" },
            "On Break": { bg: "#fffbeb", color: "#d97706" },
            "Off Duty": { bg: "#f1f5f9", color: "#475569" },
          };
          const cfg = statusColors[driver.status] || {
            bg: "#f1f5f9",
            color: "#475569",
          };

          return (
            <div key={driver.id} className="admin-driver-card">
              {/* Top row */}
              <div className="admin-driver-top">
                <div
                  className="admin-driver-avatar"
                  style={{ background: driver.avatarColor }}
                >
                  {driver.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="admin-driver-info">
                  <h3 className="admin-driver-name">{driver.name}</h3>
                  <span className="admin-driver-zone">
                    <LuMapPin style={{ marginRight: "0.4rem" }} />
                    {driver.zone}
                  </span>
                </div>
                <span
                  className="admin-driver-status-badge"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {driver.status}
                </span>
              </div>

              {/* Details List */}
              <div className="admin-driver-details-list">
                <div className="admin-driver-detail-row">
                  <span className="admin-driver-detail-label">
                    Assigned Vehicle
                  </span>
                  <span className="admin-driver-detail-val">
                    {driver.vehicleReg}
                  </span>
                </div>
                <div className="admin-driver-detail-row">
                  <span className="admin-driver-detail-label">
                    Vehicle Type
                  </span>
                  <span
                    className="admin-driver-detail-val"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {driver.vehicleType}
                  </span>
                </div>
                <div className="admin-driver-detail-row">
                  <span className="admin-driver-detail-label">
                    Phone Hotline
                  </span>
                  <span className="admin-driver-detail-val">
                    <LuPhone
                      style={{ marginRight: "0.4rem", color: "#10b981" }}
                    />
                    {driver.phone}
                  </span>
                </div>
                <div className="admin-driver-detail-row">
                  <span className="admin-driver-detail-label">
                    Today's Pickups
                  </span>
                  <span className="admin-driver-detail-val">
                    {driver.completedPickups} / {driver.todayPickups} Completed
                  </span>
                </div>
                <div style={{ marginTop: "0.6rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.15rem",
                    }}
                  >
                    <span style={{ color: "#64748b" }}>EV Battery Level</span>
                    <strong
                      style={{
                        color: driver.batteryLevel > 30 ? "#059669" : "#dc2626",
                      }}
                    >
                      {driver.batteryLevel}%
                    </strong>
                  </div>
                  <div className="admin-battery-bar">
                    <div
                      className="admin-battery-fill"
                      style={{
                        width: `${driver.batteryLevel}%`,
                        backgroundColor:
                          driver.batteryLevel > 30 ? "#10b981" : "#ef4444",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "1rem",
                  borderTop: "0.1rem solid var(--admin-border)",
                }}
              >
                {/* Status Toggle Quick Selector */}
                <select
                  value={driver.status}
                  onChange={(e) =>
                    onUpdateDriverStatus(driver.id, e.target.value)
                  }
                  className="admin-form-select"
                  style={{
                    width: "auto",
                    padding: "0.6rem 1rem",
                    fontSize: "1.25rem",
                  }}
                >
                  <option value="Available">Available</option>
                  <option value="En Route">En Route</option>
                  <option value="On Break">On Break</option>
                  <option value="Off Duty">Off Duty</option>
                </select>

                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <button
                    type="button"
                    className="admin-icon-btn"
                    title="Edit driver"
                    onClick={() => onEditDriver(driver)}
                  >
                    <LuPencil />
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn delete"
                    title="Remove driver"
                    onClick={() => onDeleteDriver(driver.id)}
                  >
                    <LuTrash2 />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
