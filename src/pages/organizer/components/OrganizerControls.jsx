// src/pages/organizer/components/OrganizerControls.jsx

import { FiSearch } from "react-icons/fi";
import {
  STATUS_FILTER_OPTIONS,
  CATEGORY_FILTER_OPTIONS,
} from "../data/organizerData";

export default function OrganizerControls({
  searchQuery,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterCategory,
  onCategoryChange,
  totalCount,
  pendingCount,
}) {
  return (
    <div className="organizer-controls">
      <div className="search-box">
        <FiSearch style={{ color: "var(--text-muted)", fontSize: "1.8rem" }} />
        <input
          type="text"
          placeholder="Search by ID (e.g. GC-84920), Citizen Name, Phone, or Locality..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by Status"
        >
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.value === "all"
                ? `${opt.label} (${totalCount})`
                : opt.value === "submitted"
                ? `${opt.label} (${pendingCount})`
                : opt.label}
            </option>
          ))}
        </select>

        <select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by Category"
        >
          {CATEGORY_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
