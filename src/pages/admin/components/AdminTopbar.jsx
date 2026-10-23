// src/pages/admin/components/AdminTopbar.jsx

import { useState } from "react";
import {
  LuSearch,
  LuBell,
  LuLogOut,
  LuPlus,
  LuCircleCheck,
  LuTriangleAlert,
  LuTruck,
} from "react-icons/lu";

export default function AdminTopbar({
  currentTab,
  searchQuery,
  onSearchChange,
  onOpenNewRequestModal,
  user,
  onLogout,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const tabTitles = {
    overview: "Operations Overview",
    requests: "Pickup Request Manifests",
    fleet: "Fleet & Driver Logistics",
    categories: "Waste Categories & Pricing",
    audit: "System Audit Activity Trail",
    settings: "Hub Configurations",
  };

  const sampleNotifications = [
    {
      id: 1,
      title: "New E-Waste Request",
      desc: "Devendra Mehta requested certification manifest for Sector 18.",
      time: "10m ago",
      icon: <LuCircleCheck style={{ color: "#10b981" }} />,
    },
    {
      id: 2,
      title: "Driver En Route",
      desc: "Ramesh Kumar reached Sector 14 waypoint.",
      time: "24m ago",
      icon: <LuTruck style={{ color: "#0284c7" }} />,
    },
    {
      id: 3,
      title: "Route Capacity Alert",
      desc: "Sector 22 bulk truck at 85% volumetric load.",
      time: "1h ago",
      icon: <LuTriangleAlert style={{ color: "#d97706" }} />,
    },
  ];

  return (
    <header className="admin-topbar">
      {/* Left: Breadcrumbs & Live Pulse */}
      <div className="admin-topbar-left">
        <div className="admin-breadcrumbs">
          <span>Depot HQ</span>
          <span>/</span>
          <strong>{tabTitles[currentTab] || "Dashboard"}</strong>
        </div>

        <div className="admin-live-pulse" title="System operational in real-time">
          <span className="admin-pulse-dot" aria-hidden="true" />
          <span>Sector 14 Hub • LIVE</span>
        </div>
      </div>

      {/* Right: Search, Actions, Notifications & Profile */}
      <div className="admin-topbar-right">
        {/* Global Search */}
        <div className="admin-search-box">
          <LuSearch className="admin-search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search request ID, citizen, driver..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search admin records"
          />
        </div>

        {/* Quick New Request Button */}
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={onOpenNewRequestModal}
          style={{ padding: "0.85rem 1.6rem", fontSize: "1.3rem" }}
          title="Create manual pickup booking"
        >
          <LuPlus style={{ fontSize: "1.6rem" }} />
          <span>New Booking</span>
        </button>

        {/* Notifications Popover */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className="admin-topbar-action-btn"
            onClick={() => setShowNotifications((prev) => !prev)}
            title="Operational Notifications"
            aria-label="Operational Notifications"
          >
            <LuBell />
            <span className="admin-bell-badge" />
          </button>

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "4.8rem",
                width: "32rem",
                background: "#ffffff",
                border: "0.12rem solid var(--admin-border)",
                borderRadius: "var(--admin-radius-lg)",
                boxShadow: "var(--admin-shadow-lg)",
                padding: "1.6rem",
                zIndex: 200,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "1.2rem",
                  borderBottom: "0.1rem solid var(--admin-border)",
                  marginBottom: "1.2rem",
                }}
              >
                <strong style={{ fontSize: "1.4rem", color: "#0f172a" }}>
                  Hub Notifications
                </strong>
                <span
                  style={{
                    fontSize: "1.15rem",
                    color: "#059669",
                    fontWeight: "700",
                  }}
                >
                  3 New
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {sampleNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      padding: "0.8rem",
                      borderRadius: "0.8rem",
                      background: "#f8fafc",
                    }}
                  >
                    <span style={{ fontSize: "1.8rem", marginTop: "0.2rem" }}>
                      {notif.icon}
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      <strong style={{ fontSize: "1.25rem", color: "#0f172a" }}>
                        {notif.title}
                      </strong>
                      <span style={{ fontSize: "1.15rem", color: "#64748b" }}>
                        {notif.desc}
                      </span>
                      <span style={{ fontSize: "1.05rem", color: "#94a3b8" }}>
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className="admin-user-profile-menu"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            aria-label="Admin profile menu"
          >
            <div className="admin-user-avatar">
              {user?.avatar || "AD"}
            </div>
            <div className="admin-user-meta">
              <span className="admin-user-name">{user?.name || "Super Admin"}</span>
              <span className="admin-user-role">{user?.role || "Director"}</span>
            </div>
          </button>

          {showProfileMenu && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "4.8rem",
                width: "24rem",
                background: "#ffffff",
                border: "0.12rem solid var(--admin-border)",
                borderRadius: "var(--admin-radius-lg)",
                boxShadow: "var(--admin-shadow-lg)",
                padding: "1.4rem",
                zIndex: 200,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  paddingBottom: "1rem",
                  borderBottom: "0.1rem solid var(--admin-border)",
                }}
              >
                <div style={{ fontWeight: "800", fontSize: "1.4rem", color: "#0f172a" }}>
                  {user?.name}
                </div>
                <div style={{ fontSize: "1.2rem", color: "#64748b" }}>
                  {user?.email}
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    color: "#059669",
                    fontWeight: "700",
                    marginTop: "0.4rem",
                  }}
                >
                  {user?.hub}
                </div>
              </div>

              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={onLogout}
                style={{ width: "100%", justifyContent: "center", padding: "0.8rem" }}
              >
                <LuLogOut />
                <span>Logout Session</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
