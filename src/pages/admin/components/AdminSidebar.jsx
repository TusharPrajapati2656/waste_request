// src/pages/admin/components/AdminSidebar.jsx

import { Link } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuTruck,
  LuLayers,
  LuHistory,
  LuSettings,
  LuArrowLeft,
  LuChevronLeft,
  LuChevronRight,
  LuLeaf,
} from "react-icons/lu";

export default function AdminSidebar({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  pendingRequestsCount,
  activeDriversCount,
}) {
  const navItems = [
    {
      id: "overview",
      label: "Operations Overview",
      icon: <LuLayoutDashboard className="admin-nav-icon" />,
    },
    {
      id: "requests",
      label: "Pickups & Requests",
      icon: <LuClipboardList className="admin-nav-icon" />,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null,
    },
    {
      id: "fleet",
      label: "Fleet & Logistics",
      icon: <LuTruck className="admin-nav-icon" />,
      badge: activeDriversCount > 0 ? activeDriversCount : null,
    },
    {
      id: "categories",
      label: "Categories & Rates",
      icon: <LuLayers className="admin-nav-icon" />,
    },
    {
      id: "audit",
      label: "Audit Activity Log",
      icon: <LuHistory className="admin-nav-icon" />,
    },
    {
      id: "settings",
      label: "Hub Configuration",
      icon: <LuSettings className="admin-nav-icon" />,
    },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Brand Header */}
      <div className="admin-sidebar-brand">
        <Link to="/admin" className="admin-brand-content" title="GreenCycle Operations HQ">
          <div className="admin-brand-badge" aria-hidden="true">
            <LuLeaf />
          </div>
          {!collapsed && (
            <div className="admin-brand-text">
              <span className="admin-brand-name">
                Green<span>Cycle</span>
              </span>
              <span className="admin-brand-tagline">Admin Operations HQ</span>
            </div>
          )}
        </Link>

        <button
          type="button"
          className="admin-sidebar-collapse-btn"
          onClick={onToggleCollapse}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="admin-sidebar-nav" aria-label="Admin Navigation">
        {!collapsed && <span className="admin-nav-section-title">Depot Management</span>}

        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`admin-nav-item ${isActive ? "active" : ""}`}
              onClick={() => onSelectTab(item.id)}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="admin-nav-count-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Return Link */}
      <div className="admin-sidebar-footer">
        <Link to="/" className="admin-quick-exit-btn" title="Exit to Citizen Portal">
          <LuArrowLeft className="admin-nav-icon" />
          {!collapsed && <span>Return to Citizen Portal</span>}
        </Link>
      </div>
    </aside>
  );
}
