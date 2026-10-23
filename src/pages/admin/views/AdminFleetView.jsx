// src/pages/admin/views/AdminFleetView.jsx

import { useState } from "react";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";
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
  LuLeaf,
  LuListChecks,
  LuZap,
  LuChevronRight,
} from "react-icons/lu";

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Duty Statuses" },
  { value: "Available", label: "Available" },
  { value: "En Route", label: "En Route" },
  { value: "On Break", label: "On Break" },
  { value: "Off Duty", label: "Off Duty" },
];

const ZONE_FILTER_OPTIONS = [
  { value: "all", label: "All Operational Zones" },
  { value: "Sector 14 Central", label: "Sector 14 Central" },
  { value: "Sector 22 North", label: "Sector 22 North" },
  { value: "Sector 18 Cyber Hub", label: "Sector 18 Cyber Hub" },
  { value: "Sector 9 South", label: "Sector 9 South" },
  { value: "Industrial Area East", label: "Industrial Area East" },
];

const DRIVER_STATUS_OPTIONS = [
  { value: "Available", label: "Available" },
  { value: "En Route", label: "En Route" },
  { value: "On Break", label: "On Break" },
  { value: "Off Duty", label: "Off Duty" },
];

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
        style={{
          padding: "1.6rem 2.4rem",
          overflow: "visible",
          position: "relative",
          zIndex: 50,
        }}
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
          <div style={{ minWidth: "18rem" }}>
            <CustomDropdown
              options={STATUS_FILTER_OPTIONS}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              variant="filter"
              ariaLabel="Filter by Duty Status"
            />
          </div>

          <div style={{ minWidth: "22rem" }}>
            <CustomDropdown
              options={ZONE_FILTER_OPTIONS}
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
              variant="filter"
              ariaLabel="Filter by Operational Zone"
            />
          </div>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="admin-fleet-grid">
        {filteredDrivers.map((driver) => {
          const statusClassMap = {
            Available: "available",
            "En Route": "en-route",
            "On Break": "on-break",
            "Off Duty": "off-duty",
          };
          const statusClass = statusClassMap[driver.status] || "available";

          const totalPickups = Number(driver.todayPickups) || 6;
          const completedPickups = Number(driver.completedPickups) || 4;
          const percent = Math.min(
            100,
            Math.round((completedPickups / totalPickups) * 100)
          );
          const donutRadius = 11;
          const donutCircum = 2 * Math.PI * donutRadius;
          const donutOffset = donutCircum * (1 - percent / 100);

          const batteryLevel = driver.batteryLevel ?? 78;

          return (
            <div key={driver.id} className="admin-driver-card">
              {/* Top Row: Avatar, Name & Location, Status Pill */}
              <div className="admin-driver-top">
                <div className="admin-driver-top-left">
                  <div
                    className="admin-driver-avatar"
                    style={{ background: driver.avatarColor || "#0e834d" }}
                  >
                    {driver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="admin-driver-info">
                    <h3 className="admin-driver-name">{driver.name}</h3>
                    <span className="admin-driver-zone">
                      <LuMapPin className="admin-driver-zone-icon" />
                      {driver.zone}
                    </span>
                  </div>
                </div>

                <div className={`admin-driver-status-pill ${statusClass}`}>
                  <span className="admin-driver-status-dot" aria-hidden="true" />
                  <span>{driver.status}</span>
                  <LuChevronRight style={{ fontSize: "1.4rem", strokeWidth: 2.5 }} />
                </div>
              </div>

              {/* Middle Row 1: 3 Mini-Cards (Assigned Vehicle, Vehicle Type, Phone Hotline) */}
              <div className="admin-driver-metrics-row-1">
                <div className="admin-driver-metric-box mint">
                  <div className="admin-driver-metric-icon truck">
                    <LuTruck />
                  </div>
                  <div className="admin-driver-metric-text">
                    <span className="admin-driver-metric-label">
                      ASSIGNED VEHICLE
                    </span>
                    <strong className="admin-driver-metric-val">
                      {driver.vehicleReg || "EV Van #12 - DL 1V 4021"}
                    </strong>
                  </div>
                </div>

                <div className="admin-driver-metric-box blue">
                  <div className="admin-driver-metric-icon leaf">
                    <LuLeaf />
                  </div>
                  <div className="admin-driver-metric-text">
                    <span className="admin-driver-metric-label">
                      VEHICLE TYPE
                    </span>
                    <strong className="admin-driver-metric-val">
                      {driver.vehicleType || "Electric Van"}
                    </strong>
                  </div>
                </div>

                <div className="admin-driver-metric-box mint">
                  <div className="admin-driver-metric-icon phone">
                    <LuPhone />
                  </div>
                  <div className="admin-driver-metric-text">
                    <span className="admin-driver-metric-label">
                      PHONE HOTLINE
                    </span>
                    <strong className="admin-driver-metric-val">
                      {driver.phone || "+91 98111 22334"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Middle Row 2: 2 Mini-Cards (Today's Pickups & EV Battery Level) */}
              <div className="admin-driver-metrics-row-2">
                {/* Pickups Mini-Card */}
                <div className="admin-driver-pickups-card">
                  <div className="admin-driver-pickups-left">
                    <div className="admin-driver-pickups-icon">
                      <LuListChecks />
                    </div>
                    <div className="admin-driver-pickups-val-group">
                      <span className="admin-driver-pickups-label">
                        TODAY'S PICKUPS
                      </span>
                      <strong className="admin-driver-pickups-val">
                        {completedPickups} / {totalPickups}{" "}
                        <span className="admin-driver-pickups-sub">Done</span>
                      </strong>
                    </div>
                  </div>

                  <div className="admin-driver-donut-wrap">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      className="admin-driver-donut-svg"
                    >
                      <circle
                        cx="14"
                        cy="14"
                        r={donutRadius}
                        fill="none"
                        stroke="#dcf2e5"
                        strokeWidth="3.2"
                      />
                      <circle
                        cx="14"
                        cy="14"
                        r={donutRadius}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.2"
                        strokeDasharray={donutCircum}
                        strokeDashoffset={donutOffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="admin-driver-donut-pct">{percent}%</span>
                  </div>
                </div>

                {/* Battery Mini-Card */}
                <div className="admin-driver-battery-card">
                  <div className="admin-driver-battery-icon">
                    <LuZap />
                  </div>
                  <div className="admin-driver-battery-body">
                    <span className="admin-driver-battery-label">
                      EV BATTERY LEVEL
                    </span>
                    <div className="admin-driver-battery-bar-wrap">
                      <div className="admin-driver-battery-track">
                        <div
                          className="admin-driver-battery-fill-bar"
                          style={{
                            width: `${batteryLevel}%`,
                            background: batteryLevel > 30 ? "#10b981" : "#ef4444",
                          }}
                        />
                      </div>
                      <span
                        className="admin-driver-battery-pct"
                        style={{
                          color: batteryLevel > 30 ? "#059669" : "#dc2626",
                        }}
                      >
                        {batteryLevel}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="admin-driver-footer">
                {/* Status Toggle Quick Selector with Pin Icon */}
                <div className="admin-driver-status-select-wrap">
                  <CustomDropdown
                    options={DRIVER_STATUS_OPTIONS}
                    value={driver.status}
                    onChange={(e) =>
                      onUpdateDriverStatus(driver.id, e.target.value)
                    }
                    icon={
                      <span className="admin-driver-dropdown-pin-icon" aria-hidden="true">
                        <LuMapPin />
                      </span>
                    }
                    size="sm"
                    variant="filter"
                    className="admin-driver-custom-dropdown"
                    ariaLabel={`Duty status for ${driver.name}`}
                  />
                </div>

                <div className="admin-driver-action-buttons">
                  <button
                    type="button"
                    className="admin-driver-action-btn edit"
                    title="Edit driver profile"
                    onClick={() => onEditDriver(driver)}
                  >
                    <LuPencil />
                  </button>
                  <button
                    type="button"
                    className="admin-driver-action-btn delete"
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
