// src/pages/admin/views/AdminRequestsView.jsx

import { useState, useMemo } from "react";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";
import {
  LuPlus,
  LuDownload,
  LuTrash2,
  LuPencil,
  LuArrowRight,
  LuSearch,
  LuCircleCheck,
  LuTruck,
  LuScale,
  LuClock,
} from "react-icons/lu";

const categoryFilterOptions = [
  { value: "all", label: "All Categories" },
  { value: "recyclables", label: "Household Recyclables" },
  { value: "organic", label: "Organic / Kitchen Waste" },
  { value: "ewaste", label: "E-Waste & Electronics" },
  { value: "bulk", label: "On-Demand Bulk Waste" },
  { value: "hazardous", label: "Hazardous & Chemicals" },
  { value: "commercial", label: "Commercial Manifests" },
];

export default function AdminRequestsView({
  requests = [],
  onOpenNewBooking,
  onEditRequest,
  onDeleteRequest,
  onQuickAdvance,
  onBulkDelete,
  onBulkStatusUpdate,
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter & Search
  const filtered = useMemo(() => {
    return requests.filter((req) => {
      if (filterStatus !== "all" && req.status !== filterStatus) return false;
      if (filterCategory !== "all" && req.category !== filterCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchId = (req.id || "").toLowerCase().includes(q);
      const matchName = (req.name || "").toLowerCase().includes(q);
      const matchPhone = (req.phone || "").toLowerCase().includes(q);
      const matchAddress = (req.address || "").toLowerCase().includes(q);
      const matchDriver = (req.driver || "").toLowerCase().includes(q);
      const matchWaste = (req.wasteType || "").toLowerCase().includes(q);

      return matchId || matchName || matchPhone || matchAddress || matchDriver || matchWaste;
    });
  }, [requests, filterStatus, filterCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginated.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExportSelected = () => {
    const listToExport = selectedIds.length > 0
      ? requests.filter((r) => selectedIds.includes(r.id))
      : filtered;

    const headers = ["ID", "Citizen", "Phone", "Email", "Category", "Status", "Driver", "Date", "Address"];
    const rows = listToExport.map((r) => [
      r.id,
      `"${r.name}"`,
      r.phone,
      r.email || "",
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
    link.setAttribute("download", `greencycle_requests_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-titles">
          <h1 className="admin-page-h1">Pickup Manifests & Service Bookings</h1>
          <p className="admin-page-desc">
            Complete management of scheduled household, commercial, bulk, and hazardous waste requests.
          </p>
        </div>

        <div className="admin-header-actions">
          {selectedIds.length > 0 && (
            <>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => onBulkDelete(selectedIds)}
              >
                <LuTrash2 />
                <span>Delete ({selectedIds.length})</span>
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => onBulkStatusUpdate(selectedIds, "completed")}
              >
                <LuCircleCheck />
                <span>Mark Completed ({selectedIds.length})</span>
              </button>
            </>
          )}

          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={handleExportSelected}
          >
            <LuDownload />
            <span>{selectedIds.length > 0 ? `Export Selected (${selectedIds.length})` : "Export All"}</span>
          </button>

          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={onOpenNewBooking}
          >
            <LuPlus />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card-container">
        {/* Table Filters & Search Bar */}
        <div className="admin-table-controls">
          <div className="admin-filters-bar">
            {/* Search */}
            <div style={{ position: "relative", minWidth: "24rem" }}>
              <LuSearch
                style={{
                  position: "absolute",
                  left: "1.2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                  fontSize: "1.5rem",
                }}
              />
              <input
                type="text"
                placeholder="Search citizen, ID, phone..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="admin-form-input"
                style={{ padding: "0.85rem 1.2rem 0.85rem 3.4rem", fontSize: "1.3rem" }}
              />
            </div>

            {/* Status Filter */}
            <div style={{ minWidth: "18rem" }}>
              <CustomDropdown
                options={[
                  { value: "all", label: `All Statuses (${requests.length})` },
                  { value: "submitted", label: "Submitted" },
                  { value: "confirmed", label: "Confirmed" },
                  { value: "assigned", label: "Assigned" },
                  { value: "in_transit", label: "Out for Collection" },
                  { value: "collected", label: "Collected" },
                  { value: "completed", label: "Completed & Certified" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                variant="filter"
                ariaLabel="Filter by Status"
              />
            </div>

            {/* Category Filter */}
            <div style={{ minWidth: "20rem" }}>
              <CustomDropdown
                options={categoryFilterOptions}
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
                variant="filter"
                ariaLabel="Filter by Category"
              />
            </div>
          </div>

          <div style={{ fontSize: "1.3rem", color: "#64748b", fontWeight: "600" }}>
            Showing {filtered.length} requests
          </div>
        </div>

        {/* Table Content */}
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "4rem", textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={
                      paginated.length > 0 &&
                      selectedIds.length === paginated.length
                    }
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
                <th>Request ID</th>
                <th>Citizen Details</th>
                <th>Waste Category & Manifest</th>
                <th>Scheduled Slot</th>
                <th>Status</th>
                <th>Assigned Logistics</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "4rem" }}>
                    <p style={{ margin: 0, fontSize: "1.5rem", color: "#64748b" }}>
                      No pickup requests match your filter criteria.
                    </p>
                  </td>
                </tr>
              ) : (
                paginated.map((req) => {
                  const isSelected = selectedIds.includes(req.id);
                  return (
                    <tr key={req.id} className={isSelected ? "admin-table-row-selected" : ""}>
                      <td style={{ textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(req.id)}
                          aria-label={`Select ${req.id}`}
                        />
                      </td>

                      {/* Request ID */}
                      <td>
                        <strong
                          style={{
                            fontFamily: "monospace",
                            fontSize: "1.4rem",
                            color: "#0f172a",
                            background: "#eaf7ee",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "0.6rem",
                            border: "0.1rem solid #ccebd7",
                          }}
                        >
                          {req.id}
                        </strong>
                      </td>

                      {/* Citizen */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <strong style={{ color: "#0f172a", fontSize: "1.4rem" }}>
                            {req.name}
                          </strong>
                          <span style={{ fontSize: "1.2rem", color: "#64748b" }}>
                            {req.phone}
                          </span>
                          <span
                            style={{
                              fontSize: "1.15rem",
                              color: "#94a3b8",
                              maxWidth: "18rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {req.address} {req.pincode ? `(PIN: ${req.pincode})` : ""}
                          </span>
                        </div>
                      </td>

                      {/* Waste Manifest */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: "700", color: "#0f172a" }}>
                            {req.wasteType}
                          </span>
                          <span style={{ fontSize: "1.2rem", color: "#475569" }}>
                            📦 {req.volume}
                          </span>
                          <span style={{ fontSize: "1.15rem", color: "#059669", fontWeight: "600" }}>
                            ⚖️ Est: {req.estimatedWeight}
                            {req.measuredWeight && ` (Verified: ${req.measuredWeight})`}
                          </span>
                        </div>
                      </td>

                      {/* Schedule */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <strong style={{ color: "#0f172a" }}>{req.date}</strong>
                          <span style={{ fontSize: "1.2rem", color: "#64748b" }}>
                            {req.timeSlot}
                          </span>
                          <span style={{ fontSize: "1.15rem", color: "#94a3b8" }}>
                            Pincode: {req.pincode}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`admin-chip chip-${req.status}`}>
                          {req.status === "submitted" && <LuClock />}
                          {req.status === "confirmed" && <LuCircleCheck />}
                          {req.status === "assigned" && <LuTruck />}
                          {req.status === "in_transit" && <LuTruck />}
                          {req.status === "collected" && <LuScale />}
                          {req.status === "completed" && <LuCircleCheck />}
                          <span>{req.status.replace("_", " ").toUpperCase()}</span>
                        </span>
                      </td>

                      {/* Logistics */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: "700", color: "#0f172a" }}>
                            {req.driver || "Unassigned"}
                          </span>
                          {req.driverPhone && (
                            <span style={{ fontSize: "1.2rem", color: "#64748b" }}>
                              {req.driverPhone}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Row Actions */}
                      <td style={{ textAlign: "right" }}>
                        <div className="admin-row-actions" style={{ justifyContent: "flex-end" }}>
                          {req.status !== "completed" && req.status !== "cancelled" && (
                            <button
                              type="button"
                              className="admin-icon-btn"
                              title="Advance status to next stage"
                              onClick={() => onQuickAdvance(req)}
                            >
                              <LuArrowRight style={{ color: "#10b981" }} />
                            </button>
                          )}
                          <button
                            type="button"
                            className="admin-icon-btn"
                            title="Edit details"
                            onClick={() => onEditRequest(req)}
                          >
                            <LuPencil />
                          </button>
                          <button
                            type="button"
                            className="admin-icon-btn delete"
                            title="Delete request"
                            onClick={() => onDeleteRequest(req.id)}
                          >
                            <LuTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="admin-table-pagination">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="admin-pagination-pages">
            <button
              type="button"
              className="admin-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                className={`admin-page-btn ${currentPage === pg ? "active" : ""}`}
                onClick={() => setCurrentPage(pg)}
              >
                {pg}
              </button>
            ))}
            <button
              type="button"
              className="admin-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
