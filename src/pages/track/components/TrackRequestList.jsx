// src/pages/track/components/TrackRequestList.jsx

import { Link } from "react-router-dom";
import { LuPlus, LuRecycle } from "react-icons/lu";
import TrackRequestCard from "./TrackRequestCard";

export default function TrackRequestList({
  requests,
  searchTerm,
  expandedId,
  onToggleExpand,
  onCancelRequest,
}) {
  if (requests.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "6rem 2rem",
          background: "var(--surface)",
          borderRadius: "var(--radius-2xl)",
          border: "0.1rem solid var(--border)",
        }}
      >
        <LuRecycle
          style={{
            fontSize: "4.5rem",
            color: "var(--primary)",
            margin: "0 auto 1.5rem",
          }}
        />
        <h3 style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>
          No pickup requests found
        </h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          {searchTerm
            ? `No requests matching "${searchTerm}". Try checking your Request ID.`
            : "You haven't placed any pickup requests in this category yet."}
        </p>
        <Link to="/#services" className="btn-primary">
          <LuPlus /> Schedule Your First Pickup
        </Link>
      </div>
    );
  }

  return (
    <div className="tracker-card-list">
      {requests.map((req) => (
        <TrackRequestCard
          key={req.id}
          request={req}
          isExpanded={expandedId === req.id}
          onToggleExpand={onToggleExpand}
          onCancelRequest={onCancelRequest}
        />
      ))}
    </div>
  );
}
