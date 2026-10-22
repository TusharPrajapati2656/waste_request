// src/pages/organizer/hooks/useOrganizerDashboard.js

import { useState } from "react";
import { useWasteRequests } from "../../../services/requestStore";
import { PRESET_DRIVERS, STATUS_TRANSITIONS } from "../data/organizerData";

export function useOrganizerDashboard() {
  const { requests, updateStatus, resetRequests } = useWasteRequests();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Manage Request Modal State
  const [activeRequest, setActiveRequest] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editDriver, setEditDriver] = useState("");
  const [editDriverPhone, setEditDriverPhone] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // KPI calculations
  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === "submitted").length;
  const activeCount = requests.filter((r) =>
    ["confirmed", "assigned", "in_transit"].includes(r.status)
  ).length;
  const completedCount = requests.filter((r) =>
    ["collected", "completed"].includes(r.status)
  ).length;

  const totalDivertedKg = requests
    .filter((r) => r.measuredWeight)
    .reduce((acc, r) => acc + parseFloat(r.measuredWeight || "0"), 0);

  const openManageModal = (req) => {
    setActiveRequest(req);
    setEditStatus(req.status);
    setEditDriver(req.driver === "Unassigned" ? "" : req.driver);
    setEditDriverPhone(req.driverPhone || "");
    setEditWeight(req.measuredWeight || "");
    setEditNotes(req.organizerNotes || "");
  };

  const closeManageModal = () => {
    setActiveRequest(null);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!activeRequest) return;

    updateStatus(activeRequest.id, editStatus, {
      driver: editDriver || "Unassigned",
      driverPhone: editDriverPhone || null,
      measuredWeight: editWeight || null,
      organizerNotes: editNotes,
    });

    setActiveRequest(null);
  };

  const handleQuickAdvance = (req) => {
    const next = STATUS_TRANSITIONS[req.status];
    if (next) {
      const defaultDriver =
        req.driver === "Unassigned" ? PRESET_DRIVERS[0].name : req.driver;
      const defaultPhone = req.driverPhone || PRESET_DRIVERS[0].phone;
      updateStatus(req.id, next, {
        driver: defaultDriver,
        driverPhone: defaultPhone,
        measuredWeight:
          next === "collected" && !req.measuredWeight ? "12.0 kg" : req.measuredWeight,
      });
    }
  };

  const handleResetData = () => {
    if (window.confirm("Reset requests to default demo data?")) {
      resetRequests();
    }
  };

  const filteredRequests = requests.filter((r) => {
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || r.category === filterCategory;
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return {
    requests,
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
    kpis: {
      totalCount,
      pendingCount,
      activeCount,
      completedCount,
      totalDivertedKg,
    },
    openManageModal,
    closeManageModal,
    handleSaveStatus,
    handleQuickAdvance,
    handleResetData,
  };
}
