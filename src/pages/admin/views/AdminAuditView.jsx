// src/pages/admin/views/AdminAuditView.jsx

import { useState } from "react";
import "../AdminDashboard.css";
import {
  LuSearch,
  LuDownload,
  LuClock,
  LuUser,
  LuTrash2,
  LuRefreshCw,
  LuUsers,
  LuAward,
  LuUserPlus,
  LuTruck,
  LuLayers,
  LuFileText,
  LuCpu,
  LuFileSpreadsheet,
  LuChevronsUpDown,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import CustomDatePicker from "../../../common/Calendar/CustomDatePicker";

function formatLogTimestamp(ts) {
  const d = new Date(ts);
  if (isNaN(d.getTime())) return { time: "--:--", date: "--" };
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return { time, date };
}

function getActionBadge(action = "") {
  const act = action.toUpperCase();
  if (act.includes("BULK_DELETE") || act.includes("DELETE")) {
    return {
      label: action,
      icon: <LuTrash2 />,
      className: "admin-audit-badge red",
    };
  }
  if (act.includes("STATUS") || act.includes("UPDATE")) {
    return {
      label: action,
      icon: <LuRefreshCw />,
      className: "admin-audit-badge green",
    };
  }
  if (act.includes("DRIVER") || act.includes("ASSIGN")) {
    return {
      label: action,
      icon: <LuUsers />,
      className: "admin-audit-badge blue",
    };
  }
  if (
    act.includes("CERTIFICATE") ||
    act.includes("COMPLIANCE") ||
    act.includes("ISSUED")
  ) {
    return {
      label: action,
      icon: <LuAward />,
      className: "admin-audit-badge purple",
    };
  }
  if (
    act.includes("BOOKING") ||
    act.includes("CITIZEN") ||
    act.includes("CREATE")
  ) {
    return {
      label: action,
      icon: <LuUserPlus />,
      className: "admin-audit-badge amber",
    };
  }
  if (act.includes("FLEET")) {
    return {
      label: action,
      icon: <LuTruck />,
      className: "admin-audit-badge emerald",
    };
  }
  return {
    label: action,
    icon: <LuFileText />,
    className: "admin-audit-badge gray",
  };
}

function getOperatorAvatar(operator = "") {
  const op = String(operator).toLowerCase();
  if (op.includes("telematics") || op.includes("system")) {
    return {
      icon: <LuCpu />,
      className: "admin-operator-avatar amber",
    };
  }
  if (op.includes("compliance")) {
    return {
      icon: <LuUser />,
      className: "admin-operator-avatar purple",
    };
  }
  if (op.includes("dispatch") || op.includes("super admin")) {
    return {
      icon: <LuUser />,
      className: "admin-operator-avatar blue",
    };
  }
  return {
    icon: <LuUser />,
    className: "admin-operator-avatar green",
  };
}

function getTargetIcon(target = "") {
  const t = String(target).toLowerCase();
  if (t.includes("item")) return <LuLayers className="admin-target-icon" />;
  if (t.startsWith("drv")) return <LuTruck className="admin-target-icon" />;
  return <LuFileText className="admin-target-icon" />;
}

export default function AdminAuditView({ logs = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const filteredLogs = logs
    .filter((log) => {
      // Search query filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchId = (log.id || "").toLowerCase().includes(q);
        const matchAction = (log.action || "").toLowerCase().includes(q);
        const matchOp = (log.operator || "").toLowerCase().includes(q);
        const matchTarget = (log.target || "").toLowerCase().includes(q);
        const matchDetails = (log.details || "").toLowerCase().includes(q);
        if (
          !matchId &&
          !matchAction &&
          !matchOp &&
          !matchTarget &&
          !matchDetails
        ) {
          return false;
        }
      }

      // Date filter
      if (selectedDate) {
        const d = new Date(log.timestamp);
        if (isNaN(d.getTime())) return false;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const logDateStr = `${year}-${month}-${day}`;
        if (logDateStr !== selectedDate) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime() || 0;
      const timeB = new Date(b.timestamp).getTime() || 0;
      return sortAsc ? timeA - timeB : timeB - timeA;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE) || 1;
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const paginatedLogs = filteredLogs.slice(
    (validCurrentPage - 1) * ITEMS_PER_PAGE,
    validCurrentPage * ITEMS_PER_PAGE
  );

  const handleExportAuditCsv = () => {
    const headers = [
      "LOG ID",
      "Timestamp",
      "Action Type",
      "Operator",
      "Target Reference",
      "Event Description",
    ];
    const rows = filteredLogs.map((l) => [
      l.id,
      `"${new Date(l.timestamp).toLocaleString()}"`,
      l.action,
      `"${l.operator}"`,
      `"${l.target}"`,
      `"${(l.details || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `greencycle_audit_logs_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  return (
    <div className="admin-audit-container">
      {/* Table Card Container with Header Toolbar */}
      <div className="admin-audit-card">
        {/* Card Header matching reference UI */}
        <div className="admin-audit-header">
          <div className="admin-audit-header-left">
            <div className="admin-audit-header-icon" aria-hidden="true">
              <LuFileSpreadsheet />
            </div>
            <div className="admin-audit-header-titles">
              <h1 className="admin-audit-title">Activity Logs</h1>
              <p className="admin-audit-subtitle">
                Track all system activities and operational events in real time.
              </p>
            </div>
          </div>

          <div className="admin-audit-header-right">
            {/* Search Input */}
            <div className="admin-audit-search-box">
              <LuSearch className="admin-audit-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search logs, operator or reference..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Search activity logs"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="admin-audit-search-clear"
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Custom Calendar DatePicker with Right Inward Alignment */}
            <div className="admin-audit-date-picker-wrap">
              <CustomDatePicker
                value={selectedDate}
                onChange={(e, date) => {
                  setSelectedDate(date);
                  setCurrentPage(1);
                }}
                placeholder="Select date"
                variant="audit"
                align="right"
                singleMonth={true}
                title="Filter Logs by Date"
                ariaLabel="Filter Activity Logs by Date"
              />
            </div>

            {/* Export Button */}
            <button
              type="button"
              className="admin-audit-export-btn"
              onClick={handleExportAuditCsv}
              title="Export activity logs to CSV"
            >
              <LuDownload className="admin-audit-export-icon" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table Container with Horizontal Scrollbar & Optimized Cell Spacing */}
        <div className="admin-audit-table-scroll">
          <table className="admin-audit-table">
            <thead>
              <tr>
                <th style={{ width: "9%", minWidth: "8.5rem" }}>LOG ID</th>
                <th
                  style={{ width: "13%", minWidth: "12.5rem", cursor: "pointer", userSelect: "none" }}
                  onClick={() => setSortAsc((prev) => !prev)}
                  title="Click to sort by timestamp"
                >
                  <span className="admin-th-sort-wrap">
                    TIMESTAMP
                    <LuChevronsUpDown className="admin-th-sort-icon" />
                  </span>
                </th>
                <th style={{ width: "14%", minWidth: "13.5rem" }}>ACTION TYPE</th>
                <th style={{ width: "13%", minWidth: "13rem" }}>OPERATOR</th>
                <th style={{ width: "11%", minWidth: "10.5rem" }}>TARGET REFERENCE</th>
                <th style={{ width: "40%", minWidth: "22rem" }}>EVENT DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "4rem 2rem" }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "1.4rem",
                        color: "#64748b",
                        fontWeight: "600",
                      }}
                    >
                      No activity logs match the selected search or date criteria.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => {
                  const ts = formatLogTimestamp(log.timestamp);
                  const badge = getActionBadge(log.action);
                  const op = getOperatorAvatar(log.operator);
                  const targetIcon = getTargetIcon(log.target);

                  return (
                    <tr key={log.id} className="admin-audit-row">
                      {/* Log ID */}
                      <td>
                        <strong className="admin-audit-id">{log.id}</strong>
                      </td>

                      {/* Timestamp */}
                      <td>
                        <div className="admin-audit-time-wrap">
                          <div
                            className="admin-audit-clock-icon"
                            aria-hidden="true"
                          >
                            <LuClock />
                          </div>
                          <div className="admin-audit-time-stack">
                            <span className="admin-audit-time">{ts.time}</span>
                            <span className="admin-audit-date">{ts.date}</span>
                          </div>
                        </div>
                      </td>

                      {/* Action Type */}
                      <td>
                        <div className={badge.className}>
                          <span className="admin-badge-icon" aria-hidden="true">
                            {badge.icon}
                          </span>
                          <span>{badge.label}</span>
                        </div>
                      </td>

                      {/* Operator */}
                      <td>
                        <div className="admin-audit-operator-wrap">
                          <div
                            className={op.className}
                            aria-hidden="true"
                          >
                            {op.icon}
                          </div>
                          <span className="admin-audit-operator-name">
                            {log.operator}
                          </span>
                        </div>
                      </td>

                      {/* Target Reference */}
                      <td>
                        <div className="admin-audit-target-wrap">
                          <span
                            className="admin-audit-target-icon-wrap"
                            aria-hidden="true"
                          >
                            {targetIcon}
                          </span>
                          <strong className="admin-audit-target-text">
                            {log.target}
                          </strong>
                        </div>
                      </td>

                      {/* Event Description */}
                      <td>
                        <p className="admin-audit-desc" title={log.details}>
                          {log.details}
                        </p>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar (Limits to 10 logs per page) */}
        {filteredLogs.length > 0 && (
          <div className="admin-audit-pagination">
            <span className="admin-audit-pagination-info">
              Showing{" "}
              <strong>
                {(validCurrentPage - 1) * ITEMS_PER_PAGE + 1}-
                {Math.min(validCurrentPage * ITEMS_PER_PAGE, filteredLogs.length)}
              </strong>{" "}
              of <strong>{filteredLogs.length}</strong> activity logs
            </span>

            {totalPages > 1 && (
              <div className="admin-audit-pagination-controls">
                <button
                  type="button"
                  className="admin-audit-page-btn"
                  disabled={validCurrentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  title="Previous page"
                  aria-label="Previous page"
                >
                  <LuChevronLeft />
                </button>

                <div className="admin-audit-page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      if (totalPages <= 5) return true;
                      if (p === 1 || p === totalPages) return true;
                      return Math.abs(p - validCurrentPage) <= 1;
                    })
                    .map((p, idx, arr) => {
                      const prev = arr[idx - 1];
                      return (
                        <span key={p} style={{ display: "inline-flex", alignItems: "center" }}>
                          {prev && p - prev > 1 && (
                            <span className="admin-audit-page-ellipsis">…</span>
                          )}
                          <button
                            type="button"
                            className={`admin-audit-page-num ${validCurrentPage === p ? "active" : ""}`}
                            onClick={() => setCurrentPage(p)}
                          >
                            {p}
                          </button>
                        </span>
                      );
                    })}
                </div>

                <button
                  type="button"
                  className="admin-audit-page-btn"
                  disabled={validCurrentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  title="Next page"
                  aria-label="Next page"
                >
                  <LuChevronRight />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
