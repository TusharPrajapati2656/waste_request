import { useState } from "react";
import { LuDownload, LuTrash2, LuUser, LuClock } from "react-icons/lu";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";

export default function AdminAuditView({ logs = [], onClearLogs }) {
  const [filterAction, setFilterAction] = useState("all");

  const filteredLogs = logs.filter((log) => {
    if (filterAction === "all") return true;
    return (log.action || "").toLowerCase().includes(filterAction.toLowerCase());
  });

  const handleExportAuditCsv = () => {
    const headers = ["ID", "Timestamp", "Action", "Operator", "Target", "Details", "Severity"];
    const rows = filteredLogs.map((l) => [
      l.id,
      `"${new Date(l.timestamp).toLocaleString()}"`,
      l.action,
      `"${l.operator}"`,
      l.target,
      `"${l.details.replace(/"/g, '""')}"`,
      l.severity,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `greencycle_audit_trail_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.8rem" }}>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-titles">
          <h1 className="admin-page-h1">System Audit & Compliance Activity Trail</h1>
          <p className="admin-page-desc">
            Immutable chronological record of administrative interventions, driver route assignments, and manifest updates.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={handleExportAuditCsv}
          >
            <LuDownload />
            <span>Export Audit Trail (CSV)</span>
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-danger"
            onClick={onClearLogs}
          >
            <LuTrash2 />
            <span>Clear Old Logs</span>
          </button>
        </div>
      </div>

      {/* Audit Table Card */}
      <div className="admin-card-container">
        <div className="admin-table-controls">
          <div className="admin-filters-bar">
            <span style={{ fontSize: "1.3rem", fontWeight: "700", color: "#334155" }}>
              Filter Action:
            </span>
            <CustomDropdown
              variant="filter"
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              options={[
                { value: "all", label: `All Events (${logs.length})` },
                { value: "status", label: "Status Changes" },
                { value: "driver", label: "Driver & Fleet" },
                { value: "booking", label: "Citizen Bookings" },
                { value: "login", label: "Staff Logins" },
              ]}
            />
          </div>

          <span style={{ fontSize: "1.3rem", color: "#64748b", fontWeight: "600" }}>
            Showing {filteredLogs.length} logged entries
          </span>
        </div>

        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>Action Type</th>
                <th>Operator</th>
                <th>Target Reference</th>
                <th>Event Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "4rem" }}>
                    <p style={{ margin: 0, fontSize: "1.5rem", color: "#64748b" }}>
                      No audit events recorded yet.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <strong
                        style={{
                          fontFamily: "monospace",
                          fontSize: "1.25rem",
                          color: "#64748b",
                        }}
                      >
                        {log.id}
                      </strong>
                    </td>
                    <td style={{ whiteSpace: "nowrap", color: "#64748b" }}>
                      <LuClock style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />
                      {new Date(log.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      • {new Date(log.timestamp).toLocaleDateString()}
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.3rem 0.8rem",
                          borderRadius: "0.6rem",
                          fontSize: "1.15rem",
                          fontWeight: "700",
                          background:
                            log.action.includes("STATUS") || log.action.includes("SUCCESS")
                              ? "#ecfdf5"
                              : log.action.includes("DRIVER")
                              ? "#eff6ff"
                              : "#f1f5f9",
                          color:
                            log.action.includes("STATUS") || log.action.includes("SUCCESS")
                              ? "#059669"
                              : log.action.includes("DRIVER")
                              ? "#1d4ed8"
                              : "#334155",
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <LuUser style={{ color: "#10b981" }} />
                        <span style={{ fontWeight: "600", color: "#0f172a" }}>
                          {log.operator}
                        </span>
                      </div>
                    </td>
                    <td>
                      <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>
                        {log.target}
                      </strong>
                    </td>
                    <td style={{ maxWidth: "34rem" }}>
                      <span style={{ fontSize: "1.3rem", color: "#334155", lineHeight: "1.4" }}>
                        {log.details}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
