// src/services/requestStore.js

import { useState, useEffect } from "react";

const STORAGE_KEY = "greencycle_waste_requests_v1";

export const STATUS_MAP = {
  submitted: {
    label: "Request Submitted",
    color: "#d97706",
    bg: "#fef3c7",
    step: 1,
    desc: "Request logged and awaiting depot confirmation.",
  },
  confirmed: {
    label: "Confirmed",
    color: "#2563eb",
    bg: "#eff6ff",
    step: 2,
    desc: "Pickup slot approved by local depot.",
  },
  assigned: {
    label: "Driver Assigned",
    color: "#7c3aed",
    bg: "#f5f3ff",
    step: 3,
    desc: "Collection vehicle and crew allocated.",
  },
  in_transit: {
    label: "Out for Collection",
    color: "#0891b2",
    bg: "#ecfeff",
    step: 4,
    desc: "Electric van is en route to your doorstep.",
  },
  collected: {
    label: "Collected & Weighed",
    color: "#16794b",
    bg: "#eaf6ee",
    step: 5,
    desc: "Waste successfully collected and weighed at doorstep.",
  },
  completed: {
    label: "Recycled & Certified",
    color: "#105f39",
    bg: "#dcfce7",
    step: 6,
    desc: "Diverted to recycling facility. Manifest certificate generated.",
  },
  cancelled: {
    label: "Cancelled",
    color: "#dc2626",
    bg: "#fee2e2",
    step: 0,
    desc: "Request has been cancelled.",
  },
};

export const INITIAL_REQUESTS = [
  {
    id: "GC-84920",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    email: "aarav.sharma@example.com",
    address: "Flat 402, Green Meadows Tower A, Sector 14",
    pincode: "110001",
    landmark: "Opposite Community Park",
    wasteType: "Household Recyclables",
    category: "recyclables",
    approxQuantity: "12",
    quantityUnit: "kg",
    volume: "3 bags cardboard & crushed plastic bottles",
    estimatedWeight: "12 kg",
    date: "2026-10-22",
    timeSlot: "Morning (8:00 AM - 11:30 AM)",
    notes: "Please call upon arrival. Elevator is working.",
    status: "in_transit",
    driver: "Ramesh Kumar (EV Van #12 - DL 1V 4021)",
    driverPhone: "+91 98111 22334",
    measuredWeight: null,
    organizerNotes: "Vehicle dispatched at 8:45 AM. 2nd stop on Sector 14 route.",
    createdAt: "2026-10-21T18:30:00.000Z",
    timeline: [
      { status: "submitted", time: "Oct 21, 07:00 PM", note: "Booking submitted online" },
      { status: "confirmed", time: "Oct 21, 08:15 PM", note: "Approved by Sector 14 Hub" },
      { status: "assigned", time: "Oct 22, 07:30 AM", note: "Ramesh Kumar assigned" },
      { status: "in_transit", time: "Oct 22, 08:45 AM", note: "Van en route" },
    ],
  },
  {
    id: "GC-84712",
    name: "Sunita Verma",
    phone: "+91 98222 33445",
    email: "sunita.v@example.com",
    address: "Villa 18, Palm Grove Enclave, Sector 22",
    pincode: "110022",
    landmark: "Near Mother Dairy booth",
    wasteType: "On-Demand Bulk Waste",
    category: "bulk",
    approxQuantity: "45",
    quantityUnit: "kg",
    volume: "1 Queen Size Mattress, 1 Wooden Coffee Table",
    estimatedWeight: "45 kg",
    date: "2026-10-23",
    timeSlot: "Afternoon (1:00 PM - 4:00 PM)",
    notes: "Ground floor access, direct driveway entry.",
    status: "confirmed",
    driver: "Unassigned",
    driverPhone: null,
    measuredWeight: null,
    organizerNotes: "Needs 2-person crew for heavy mattress loading.",
    createdAt: "2026-10-21T14:10:00.000Z",
    timeline: [
      { status: "submitted", time: "Oct 21, 02:10 PM", note: "Bulk booking requested" },
      { status: "confirmed", time: "Oct 21, 03:00 PM", note: "Scheduled for Oct 23 afternoon" },
    ],
  },
  {
    id: "GC-83905",
    name: "Devendra Mehta",
    phone: "+91 97111 55667",
    email: "dev.mehta@techcorp.example",
    address: "Unit 304, Cyber Heights, Sector 18",
    pincode: "110018",
    landmark: "Tower 2 Service Gate",
    wasteType: "E-Waste & Electronics",
    category: "ewaste",
    approxQuantity: "15",
    quantityUnit: "kg",
    volume: "4 Broken Laptops, 8 Lithium Batteries, Mixed Cables",
    estimatedWeight: "15 kg",
    date: "2026-10-20",
    timeSlot: "Morning (8:00 AM - 11:30 AM)",
    notes: "Requires formal data-destruction certificate for audit.",
    status: "completed",
    driver: "Anil Rawat (E-Waste Specialist Van #04)",
    driverPhone: "+91 99888 77665",
    measuredWeight: "14.2 kg",
    organizerNotes: "Processed at Okhla Certified E-Hub. Certificate #EW-2026-904 issued.",
    createdAt: "2026-10-19T10:00:00.000Z",
    timeline: [
      { status: "submitted", time: "Oct 19, 10:00 AM", note: "E-waste request logged" },
      { status: "confirmed", time: "Oct 19, 11:30 AM", note: "Special handling scheduled" },
      { status: "assigned", time: "Oct 20, 08:00 AM", note: "Anil Rawat assigned" },
      { status: "in_transit", time: "Oct 20, 09:15 AM", note: "Vehicle en route" },
      { status: "collected", time: "Oct 20, 10:20 AM", note: "Weighed: 14.2 kg" },
      { status: "completed", time: "Oct 20, 02:45 PM", note: "Recycled & Certificate Issued" },
    ],
  },
  {
    id: "GC-85102",
    name: "Pooja Banerjee",
    phone: "+91 98444 11223",
    email: "pooja.b@example.com",
    address: "Apartment 12B, Sky High Heights, Sector 9",
    pincode: "110009",
    landmark: "Near Sector 9 Metro Gate 2",
    wasteType: "Organic / Kitchen Waste",
    category: "organic",
    approxQuantity: "8",
    quantityUnit: "kg",
    volume: "2 Compostable Bins Food Scraps",
    estimatedWeight: "8 kg",
    date: "2026-10-22",
    timeSlot: "Morning (8:00 AM - 11:30 AM)",
    notes: "Green bins kept outside main entrance door.",
    status: "submitted",
    driver: "Unassigned",
    driverPhone: null,
    measuredWeight: null,
    organizerNotes: "Awaiting morning dispatch allocation.",
    createdAt: "2026-10-22T06:00:00.000Z",
    timeline: [
      { status: "submitted", time: "Oct 22, 06:00 AM", note: "Request submitted" },
    ],
  },
];

export const requestStore = {
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
        return INITIAL_REQUESTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_REQUESTS;
    }
  },

  getById: (id) => {
    const list = requestStore.getAll();
    return list.find((r) => r.id.toLowerCase() === id.trim().toLowerCase()) || null;
  },

  create: (data) => {
    const list = requestStore.getAll();
    const id = `GC-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) + ", " + now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const qtyUnit = data.quantityUnit || "kg";
    const approxQty = data.approxQuantity || "";
    const estWeight = data.estimatedWeight || (approxQty ? `${approxQty} ${qtyUnit}` : "Not specified");

    const newRequest = {
      id,
      name: data.name,
      phone: data.phone,
      email: data.email || "",
      address: data.address,
      pincode: data.pincode || "",
      landmark: data.landmark || "",
      wasteType: data.wasteType || "Household Recyclables",
      category: data.category || "recyclables",
      approxQuantity: approxQty,
      quantityUnit: qtyUnit,
      volume: data.volume || (approxQty ? `${approxQty} ${qtyUnit} sorted waste` : "Standard bin / bag"),
      estimatedWeight: estWeight,
      date: data.date,
      timeSlot: data.timeSlot || "Morning (8:00 AM - 11:30 AM)",
      notes: data.notes || "",
      status: "submitted",
      driver: "Unassigned",
      driverPhone: null,
      measuredWeight: null,
      organizerNotes: "New request awaiting organizer review.",
      createdAt: now.toISOString(),
      timeline: [
        {
          status: "submitted",
          time: timeFormatted,
          note: "Request logged by citizen via portal",
        },
      ],
    };

    const updated = [newRequest, ...list];
    requestStore.save(updated);
    return newRequest;
  },

  updateStatus: (id, newStatus, { driver, driverPhone, organizerNotes, measuredWeight } = {}) => {
    const list = requestStore.getAll();
    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) + ", " + now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updated = list.map((item) => {
      if (item.id === id) {
        const statusConfig = STATUS_MAP[newStatus] || { label: newStatus, desc: "" };
        const newTimeline = [
          ...item.timeline,
          {
            status: newStatus,
            time: timeFormatted,
            note: organizerNotes || statusConfig.desc || `Status changed to ${statusConfig.label}`,
          },
        ];

        return {
          ...item,
          status: newStatus,
          driver: driver !== undefined ? driver : item.driver,
          driverPhone: driverPhone !== undefined ? driverPhone : item.driverPhone,
          organizerNotes: organizerNotes !== undefined ? organizerNotes : item.organizerNotes,
          measuredWeight: measuredWeight !== undefined ? measuredWeight : item.measuredWeight,
          timeline: newTimeline,
        };
      }
      return item;
    });

    requestStore.save(updated);
    return updated.find((r) => r.id === id);
  },

  delete: (id) => {
    const list = requestStore.getAll();
    const updated = list.filter((r) => r.id !== id);
    requestStore.save(updated);
  },

  reset: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
    requestStore.emitUpdate(INITIAL_REQUESTS);
    return INITIAL_REQUESTS;
  },

  save: (requests) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
      requestStore.emitUpdate(requests);
    } catch (e) {
      console.error("Failed to save requests", e);
    }
  },

  emitUpdate: (requests) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("greencycle_requests_updated", { detail: requests })
      );
    }
  },
};

export function useWasteRequests() {
  const [requests, setRequests] = useState(() => requestStore.getAll());

  useEffect(() => {
    const handleUpdate = () => {
      setRequests(requestStore.getAll());
    };

    window.addEventListener("greencycle_requests_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("greencycle_requests_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    requests,
    createRequest: requestStore.create,
    updateStatus: requestStore.updateStatus,
    deleteRequest: requestStore.delete,
    resetRequests: requestStore.reset,
    getById: requestStore.getById,
  };
}
