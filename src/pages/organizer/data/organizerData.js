// src/pages/organizer/data/organizerData.js

export const PRESET_DRIVERS = [
  { name: "Ramesh Kumar (EV Van #12)", phone: "+91 98111 22334" },
  { name: "Anil Rawat (E-Van #04)", phone: "+91 99888 77665" },
  { name: "Vikram Singh (Heavy Truck #08)", phone: "+91 97222 33441" },
  { name: "Suresh Patil (Loader Van #02)", phone: "+91 98333 44556" },
];

export const STATUS_TRANSITIONS = {
  submitted: "confirmed",
  confirmed: "assigned",
  assigned: "in_transit",
  in_transit: "collected",
  collected: "completed",
};

export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "submitted", label: "Submitted" },
  { value: "confirmed", label: "Confirmed" },
  { value: "assigned", label: "Driver Assigned" },
  { value: "in_transit", label: "Out for Collection" },
  { value: "collected", label: "Collected & Weighed" },
  { value: "completed", label: "Completed & Certified" },
  { value: "cancelled", label: "Cancelled" },
];

export const CATEGORY_FILTER_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "recyclables", label: "Household Recyclables" },
  { value: "organic", label: "Organic / Kitchen Waste" },
  { value: "bulk", label: "Bulk Waste & Furniture" },
  { value: "ewaste", label: "E-Waste & Electronics" },
  { value: "hazardous", label: "Hazardous / Special" },
];
