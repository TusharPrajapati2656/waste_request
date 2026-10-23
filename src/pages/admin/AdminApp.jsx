// src/pages/admin/AdminApp.jsx

import { useState, useEffect, useCallback } from "react";
import AdminLogin from "./AdminLogin";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import AdminRequestModal from "./components/AdminRequestModal";
import AdminDriverModal from "./components/AdminDriverModal";

import AdminOverviewView from "./views/AdminOverviewView";
import AdminRequestsView from "./views/AdminRequestsView";
import AdminFleetView from "./views/AdminFleetView";
import AdminCategoriesView from "./views/AdminCategoriesView";
import AdminAuditView from "./views/AdminAuditView";
import AdminSettingsView from "./views/AdminSettingsView";

import { adminAuthStore } from "./services/adminAuthStore";
import { adminFleetStore } from "./services/adminFleetStore";
import { adminAuditStore } from "./services/adminAuditStore";
import { adminSettingsStore } from "./services/adminSettingsStore";
import { requestStore } from "../../services/requestStore";

import "./AdminDashboard.css";

export default function AdminApp() {
  const [user, setUser] = useState(() => adminAuthStore.getUser());
  const [currentTab, setCurrentTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Data Stores State
  const [requests, setRequests] = useState(() => requestStore.getAll());
  const [drivers, setDrivers] = useState(() => adminFleetStore.getAll());
  const [auditLogs, setAuditLogs] = useState(() => adminAuditStore.getAll());
  const [settings, setSettings] = useState(() => adminSettingsStore.get());

  // Modal States
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Listen for storage / custom updates
  useEffect(() => {
    const handleRequestsUpdate = () => setRequests(requestStore.getAll());
    const handleFleetUpdate = () => setDrivers(adminFleetStore.getAll());
    const handleAuditUpdate = () => setAuditLogs(adminAuditStore.getAll());
    const handleSettingsUpdate = () => setSettings(adminSettingsStore.get());

    window.addEventListener("greencycle_requests_updated", handleRequestsUpdate);
    window.addEventListener("greencycle_fleet_updated", handleFleetUpdate);
    window.addEventListener("greencycle_audit_updated", handleAuditUpdate);
    window.addEventListener("greencycle_settings_updated", handleSettingsUpdate);
    window.addEventListener("storage", handleRequestsUpdate);

    return () => {
      window.removeEventListener("greencycle_requests_updated", handleRequestsUpdate);
      window.removeEventListener("greencycle_fleet_updated", handleFleetUpdate);
      window.removeEventListener("greencycle_audit_updated", handleAuditUpdate);
      window.removeEventListener("greencycle_settings_updated", handleSettingsUpdate);
      window.removeEventListener("storage", handleRequestsUpdate);
    };
  }, []);

  // If not authenticated, render Login
  if (!user) {
    return <AdminLogin onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />;
  }

  // Auth Handlers
  const handleLogout = () => {
    adminAuthStore.logout();
    setUser(null);
  };

  // Request Handlers
  const handleOpenNewRequest = () => {
    setEditingRequest(null);
    setRequestModalOpen(true);
  };

  const handleOpenEditRequest = (req) => {
    setEditingRequest(req);
    setRequestModalOpen(true);
  };

  const handleSaveRequest = (formData, requestId) => {
    if (requestId) {
      // Update existing request
      requestStore.updateStatus(requestId, formData.status, {
        driver: formData.driver,
        driverPhone: formData.driverPhone,
        organizerNotes: formData.organizerNotes,
        measuredWeight: formData.measuredWeight,
      });

      // Also update address / volume if changed
      const list = requestStore.getAll();
      const finalList = list.map((item) =>
        item.id === requestId
          ? {
              ...item,
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              address: formData.address,
              pincode: formData.pincode,
              category: formData.category,
              wasteType: formData.wasteType,
              volume: formData.volume,
              estimatedWeight: formData.estimatedWeight,
              date: formData.date,
              timeSlot: formData.timeSlot,
            }
          : item
      );
      requestStore.save(finalList);

      adminAuditStore.log(
        "UPDATE_REQUEST",
        requestId,
        `Updated request details & status to ${formData.status}. Driver: ${formData.driver}.`,
        user.name,
        "info"
      );

      showToast(`Request ${requestId} successfully updated!`);
    } else {
      // Create new manual booking
      const newReq = requestStore.create(formData);
      adminAuditStore.log(
        "CREATE_BOOKING",
        newReq.id,
        `Logged new manual citizen booking for ${formData.name} (${formData.wasteType}).`,
        user.name,
        "success"
      );
      showToast(`New pickup booking ${newReq.id} created!`);
    }

    setRequestModalOpen(false);
  };

  const handleDeleteRequest = (id) => {
    if (window.confirm(`Are you sure you want to permanently delete request ${id}?`)) {
      requestStore.delete(id);
      adminAuditStore.log(
        "DELETE_REQUEST",
        id,
        `Deleted request manifest ${id} from system records.`,
        user.name,
        "warning"
      );
      showToast(`Request ${id} deleted.`);
    }
  };

  const handleBulkDelete = (ids) => {
    if (window.confirm(`Delete ${ids.length} selected pickup requests?`)) {
      const currentList = requestStore.getAll();
      const updated = currentList.filter((r) => !ids.includes(r.id));
      requestStore.save(updated);
      adminAuditStore.log(
        "BULK_DELETE",
        `${ids.length} items`,
        `Bulk deleted requests: ${ids.join(", ")}`,
        user.name,
        "warning"
      );
      showToast(`${ids.length} requests deleted.`);
    }
  };

  const handleBulkStatusUpdate = (ids, newStatus) => {
    ids.forEach((id) => {
      requestStore.updateStatus(id, newStatus);
    });
    adminAuditStore.log(
      "BULK_STATUS",
      `${ids.length} items`,
      `Bulk updated status to ${newStatus} for: ${ids.join(", ")}`,
      user.name,
      "info"
    );
    showToast(`Updated ${ids.length} requests to ${newStatus}.`);
  };

  const handleQuickAdvance = (req) => {
    const flow = {
      submitted: "confirmed",
      confirmed: "assigned",
      assigned: "in_transit",
      in_transit: "collected",
      collected: "completed",
    };
    const nextStatus = flow[req.status];
    if (nextStatus) {
      requestStore.updateStatus(req.id, nextStatus);
      adminAuditStore.log(
        "QUICK_ADVANCE",
        req.id,
        `Advanced status from ${req.status} to ${nextStatus}.`,
        user.name,
        "info"
      );
      showToast(`Advanced ${req.id} to ${nextStatus}!`);
    }
  };

  // Driver Handlers
  const handleOpenAddDriver = () => {
    setEditingDriver(null);
    setDriverModalOpen(true);
  };

  const handleOpenEditDriver = (driver) => {
    setEditingDriver(driver);
    setDriverModalOpen(true);
  };

  const handleSaveDriver = (formData, driverId) => {
    if (driverId) {
      adminFleetStore.updateDriver(driverId, formData);
      adminAuditStore.log(
        "UPDATE_DRIVER",
        driverId,
        `Updated driver profile for ${formData.name}.`,
        user.name,
        "info"
      );
      showToast(`Driver ${formData.name} updated.`);
    } else {
      const newD = adminFleetStore.addDriver(formData);
      adminAuditStore.log(
        "ADD_DRIVER",
        newD.id,
        `Registered new driver ${formData.name} with vehicle ${formData.vehicleReg}.`,
        user.name,
        "success"
      );
      showToast(`Registered new driver ${formData.name}!`);
    }
    setDriverModalOpen(false);
  };

  const handleDeleteDriver = (id) => {
    if (window.confirm("Remove this driver from the fleet?")) {
      adminFleetStore.deleteDriver(id);
      adminAuditStore.log(
        "DELETE_DRIVER",
        id,
        `Removed driver ${id} from active fleet.`,
        user.name,
        "warning"
      );
      showToast("Driver removed from fleet.");
    }
  };

  const handleUpdateDriverStatus = (id, newStatus) => {
    adminFleetStore.updateDriver(id, { status: newStatus });
    adminAuditStore.log(
      "DRIVER_STATUS",
      id,
      `Changed driver duty status to ${newStatus}.`,
      user.name,
      "info"
    );
    showToast(`Driver status set to ${newStatus}.`);
  };

  // Categories Handler
  const handleUpdateCategory = (categoryId, updates) => {
    adminSettingsStore.updateCategory(categoryId, updates);
    adminAuditStore.log(
      "CATEGORY_RATE",
      categoryId,
      `Updated reward credits / specifications for ${categoryId}.`,
      user.name,
      "info"
    );
    showToast(`Updated pricing for ${categoryId}!`);
  };

  // Settings Handler
  const handleSaveSettings = (newSettings) => {
    adminSettingsStore.update(newSettings);
    adminAuditStore.log(
      "SETTINGS_UPDATE",
      "DEPOT_CONFIG",
      "Saved depot operational configurations & emergency broadcast settings.",
      user.name,
      "info"
    );
    showToast("Hub configuration saved successfully!");
  };

  const handleResetAllData = () => {
    if (
      window.confirm(
        "Warning: This will restore default demo requests, fleet drivers, and system configurations. Proceed?"
      )
    ) {
      requestStore.reset();
      adminFleetStore.reset();
      adminAuditStore.reset();
      adminSettingsStore.reset();
      showToast("Demo system data successfully restored.");
    }
  };

  const pendingRequestsCount = requests.filter(
    (r) => r.status === "submitted" || r.status === "confirmed"
  ).length;
  const activeDriversCount = drivers.filter((d) => d.status === "Available").length;

  return (
    <div className="admin-root">
      <div className="admin-layout">
        {/* Sidebar */}
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((p) => !p)}
          pendingRequestsCount={pendingRequestsCount}
          activeDriversCount={activeDriversCount}
        />

        {/* Main Content Area */}
        <div className="admin-main-area">
          <AdminTopbar
            currentTab={currentTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenNewRequestModal={handleOpenNewRequest}
            user={user}
            onLogout={handleLogout}
          />

          <main className="admin-page-content">
            {currentTab === "overview" && (
              <AdminOverviewView
                requests={requests}
                drivers={drivers}
                onOpenNewBooking={handleOpenNewRequest}
                onNavigateTab={setCurrentTab}
                onQuickAdvance={handleQuickAdvance}
                onEditRequest={handleOpenEditRequest}
              />
            )}

            {currentTab === "requests" && (
              <AdminRequestsView
                requests={requests}
                drivers={drivers}
                onOpenNewBooking={handleOpenNewRequest}
                onEditRequest={handleOpenEditRequest}
                onDeleteRequest={handleDeleteRequest}
                onQuickAdvance={handleQuickAdvance}
                onBulkDelete={handleBulkDelete}
                onBulkStatusUpdate={handleBulkStatusUpdate}
              />
            )}

            {currentTab === "fleet" && (
              <AdminFleetView
                drivers={drivers}
                onOpenAddDriver={handleOpenAddDriver}
                onEditDriver={handleOpenEditDriver}
                onDeleteDriver={handleDeleteDriver}
                onUpdateDriverStatus={handleUpdateDriverStatus}
              />
            )}

            {currentTab === "categories" && (
              <AdminCategoriesView
                categories={settings.categoriesConfig || []}
                onUpdateCategory={handleUpdateCategory}
              />
            )}

            {currentTab === "audit" && (
              <AdminAuditView
                logs={auditLogs}
                onClearLogs={() => {
                  adminAuditStore.clear();
                  showToast("Audit activity trail cleared.");
                }}
              />
            )}

            {currentTab === "settings" && (
              <AdminSettingsView
                settings={settings}
                onSaveSettings={handleSaveSettings}
                onResetAllData={handleResetAllData}
              />
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      <AdminRequestModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        onSubmit={handleSaveRequest}
        initialData={editingRequest}
        drivers={drivers}
        categories={settings.categoriesConfig || []}
      />

      <AdminDriverModal
        isOpen={driverModalOpen}
        onClose={() => setDriverModalOpen(false)}
        onSubmit={handleSaveDriver}
        initialData={editingDriver}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast-container">
          <div className="admin-toast">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
