// src/pages/track/data/trackData.js

export const STEP_STAGES = [
  { key: "submitted", num: 1, label: "Submitted" },
  { key: "confirmed", num: 2, label: "Confirmed" },
  { key: "assigned", num: 3, label: "Assigned" },
  { key: "in_transit", num: 4, label: "En Route" },
  { key: "collected", num: 5, label: "Collected" },
  { key: "completed", num: 6, label: "Recycled" },
];

export const FILTER_TABS = [
  { key: "all", label: "All Requests" },
  { key: "active", label: "Active & En Route" },
  { key: "pending", label: "Pending Review" },
  { key: "completed", label: "Completed & Recycled" },
  { key: "cancelled", label: "Cancelled" },
];
