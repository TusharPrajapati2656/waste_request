// src/pages/track/hooks/useTrackRequests.js

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useWasteRequests } from "../../../services/requestStore";

export function useTrackRequests() {
  const { requests, updateStatus } = useWasteRequests();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id") || "";

  const [searchTerm, setSearchTerm] = useState(queryId);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedId, setExpandedId] = useState(queryId ? queryId.toUpperCase() : null);

  const toggleExpandedId = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCancelRequest = (id) => {
    if (window.confirm("Are you sure you want to cancel this pickup request?")) {
      updateStatus(id, "cancelled", {
        organizerNotes: "Cancelled by citizen.",
      });
    }
  };

  const counts = {
    all: requests.length,
    active: requests.filter((r) =>
      ["confirmed", "assigned", "in_transit"].includes(r.status)
    ).length,
    pending: requests.filter((r) => r.status === "submitted").length,
    completed: requests.filter((r) =>
      ["collected", "completed"].includes(r.status)
    ).length,
    cancelled: requests.filter((r) => r.status === "cancelled").length,
  };

  const filteredRequests = requests.filter((req) => {
    // Tab filtering
    if (activeTab === "active") {
      if (!["confirmed", "assigned", "in_transit"].includes(req.status)) return false;
    } else if (activeTab === "pending") {
      if (req.status !== "submitted") return false;
    } else if (activeTab === "completed") {
      if (!["collected", "completed"].includes(req.status)) return false;
    } else if (activeTab === "cancelled") {
      if (req.status !== "cancelled") return false;
    }

    // Search query filtering
    if (!searchTerm.trim()) return true;
    const q = searchTerm.trim().toLowerCase();
    return (
      req.id.toLowerCase().includes(q) ||
      req.name.toLowerCase().includes(q) ||
      req.wasteType.toLowerCase().includes(q) ||
      req.address.toLowerCase().includes(q) ||
      req.phone.includes(q)
    );
  });

  return {
    requests,
    filteredRequests,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    expandedId,
    toggleExpandedId,
    handleCancelRequest,
    counts,
  };
}
