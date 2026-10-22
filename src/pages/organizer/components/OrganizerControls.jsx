// src/pages/organizer/components/OrganizerControls.jsx

import { FiSearch, FiX } from "react-icons/fi";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";
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
  const statusOptions = STATUS_FILTER_OPTIONS.map((opt) => ({
    value: opt.value,
    label:
      opt.value === "all"
        ? `${opt.label} (${totalCount})`
        : opt.value === "submitted"
          ? `${opt.label} (${pendingCount})`
          : opt.label,
  }));

  return (
    <div className="organizer-controls">
      <div className="search-box">
        <FiSearch style={{ color: "var(--text-muted)", fontSize: "1.8rem", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search by ID (e.g. GC-84920), Citizen Name, Phone, or Locality..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange("")}
            title="Clear search"
            aria-label="Clear search input"
          >
            <FiX />
          </button>
        )}
      </div>

      <div className="filter-group">
        <CustomDropdown
          variant="filter"
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          ariaLabel="Filter by Status"
          options={statusOptions}
        />

        <CustomDropdown
          variant="filter"
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          ariaLabel="Filter by Category"
          options={CATEGORY_FILTER_OPTIONS}
        />
      </div>
    </div>
  );
}
