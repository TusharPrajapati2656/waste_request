// src/pages/TrackRequests.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuTruck,
  LuCalendar,
  LuPlus,
} from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

const initialRequests = [
  {
    id: "GC-84920",
    service: "Household Recyclables",
    date: "Today, Oct 22",
    slot: "9:00 AM - 11:30 AM",
    status: "Driver En Route",
    driver: "Ramesh K. (EV Van #12)",
    address: "B-402, Green Meadows, Sector 14",
    items: "3 bags cardboard & plastics",
    statusCode: "active",
  },
  {
    id: "GC-84712",
    service: "On-Demand Bulk Waste",
    date: "Tomorrow, Oct 23",
    slot: "2:00 PM - 4:00 PM",
    status: "Scheduled",
    driver: "Assigned (Arriving tomorrow)",
    address: "B-402, Green Meadows, Sector 14",
    items: "1 Queen Mattress, 1 Office Chair",
    statusCode: "scheduled",
  },
  {
    id: "GC-82104",
    service: "E-Waste Safe Disposal",
    date: "Oct 15, 2026",
    slot: "Completed",
    status: "Recycled & Certified",
    driver: "Eco-Hub 4 Facility",
    address: "B-402, Green Meadows, Sector 14",
    items: "2 Laptops, 4 Batteries, Cables",
    statusCode: "completed",
  },
];

export default function TrackRequests() {
  const [requests] = useState(initialRequests);
  const [searchId, setSearchId] = useState("");

  const filtered = searchId.trim()
    ? requests.filter((r) =>
        r.id.toLowerCase().includes(searchId.toLowerCase()) ||
        r.service.toLowerCase().includes(searchId.toLowerCase())
      )
    : requests;

  return (
    <div className="section-wrapper" style={{ paddingBlock: "5rem" }}>
      <div className="section-header" style={{ marginBottom: "3.5rem" }}>
        <span className="section-tag">Citizen Portal</span>
        <h1 className="section-title">Track Pickup Requests</h1>
        <p className="section-subtitle">
          Real-time status updates and digital recycling manifests for your active requests.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.6rem",
          flexWrap: "wrap",
          marginBottom: "3rem",
        }}
      >
        <input
          type="text"
          placeholder="Search by Request ID (e.g. GC-84920)..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            padding: "1.1rem 1.6rem",
            border: "0.15rem solid var(--border-strong)",
            borderRadius: "var(--radius-md)",
            fontSize: "1.45rem",
            minWidth: "28rem",
            outline: "none",
            background: "var(--surface)",
          }}
        />

        <Link to="/services" className="btn-primary">
          <LuPlus /> Request New Pickup
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {filtered.map((req) => (
          <div
            key={req.id}
            style={{
              background: "var(--surface)",
              border: "0.1rem solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: "2.8rem",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "800",
                    color: "var(--primary-dark)",
                    background: "var(--primary-light)",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {req.id}
                </span>
                <span style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--text-primary)" }}>
                  {req.service}
                </span>
              </div>

              <div style={{ fontSize: "1.35rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>
                📍 {req.address}
              </div>
              <div style={{ fontSize: "1.35rem", color: "var(--text-muted)" }}>
                📦 Items: <strong>{req.items}</strong> • Driver: {req.driver}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.8rem" }}>
              <span
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  background:
                    req.statusCode === "active"
                      ? "#ecfdf5"
                      : req.statusCode === "scheduled"
                      ? "#eff6ff"
                      : "#f3f4f6",
                  color:
                    req.statusCode === "active"
                      ? "var(--primary)"
                      : req.statusCode === "scheduled"
                      ? "#1d4ed8"
                      : "#4b5563",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                {req.statusCode === "active" && <LuTruck />}
                {req.statusCode === "scheduled" && <LuCalendar />}
                {req.statusCode === "completed" && <FiCheckCircle />}
                {req.status}
              </span>
              <span style={{ fontSize: "1.3rem", color: "var(--text-muted)" }}>
                {req.date} ({req.slot})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
