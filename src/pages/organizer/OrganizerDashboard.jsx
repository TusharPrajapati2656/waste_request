// src/pages/organizer/OrganizerDashboard.jsx

import { useOrganizerDashboard } from "./hooks/useOrganizerDashboard";
import OrganizerBanner from "./components/OrganizerBanner";
import OrganizerKpiGrid from "./components/OrganizerKpiGrid";
import OrganizerControls from "./components/OrganizerControls";
import OrganizerRequestsList from "./components/OrganizerRequestsList";
import OrganizerManageModal from "./components/OrganizerManageModal";
import "./OrganizerDashboard.css";

export default function OrganizerDashboard() {
  const {
    filteredRequests,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    activeRequest,
    editStatus,
    setEditStatus,
    editDriver,
    setEditDriver,
    editDriverPhone,
    setEditDriverPhone,
    editWeight,
    setEditWeight,
    editNotes,
    setEditNotes,
    kpis,
    openManageModal,
    closeManageModal,
    handleSaveStatus,
    handleQuickAdvance,
    handleResetData,
  } = useOrganizerDashboard();

  return (
    <div className="organizer-dashboard">
      <div
        className="section-wrapper"
        style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}
      >
        <OrganizerBanner onResetData={handleResetData} />

        <OrganizerKpiGrid kpis={kpis} />

        <OrganizerControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          totalCount={kpis.totalCount}
          pendingCount={kpis.pendingCount}
        />

        <OrganizerRequestsList
          requests={filteredRequests}
          onQuickAdvance={handleQuickAdvance}
          onOpenManage={openManageModal}
        />
      </div>

      <OrganizerManageModal
        activeRequest={activeRequest}
        onClose={closeManageModal}
        onSubmit={handleSaveStatus}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        editDriver={editDriver}
        setEditDriver={setEditDriver}
        editDriverPhone={editDriverPhone}
        setEditDriverPhone={setEditDriverPhone}
        editWeight={editWeight}
        setEditWeight={setEditWeight}
        editNotes={editNotes}
        setEditNotes={setEditNotes}
      />
    </div>
  );
}
