// src/pages/organizer/components/OrganizerRequestsList.jsx

import { LuLayers } from "react-icons/lu";
import OrganizerRequestCard from "./OrganizerRequestCard";

export default function OrganizerRequestsList({
  requests,
  onQuickAdvance,
  onOpenManage,
}) {
  if (requests.length === 0) {
    return (
      <div
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          background: "var(--surface)",
          borderRadius: "var(--radius-xl)",
          border: "0.1rem solid var(--border)",
        }}
      >
        <LuLayers
          style={{
            fontSize: "4rem",
            color: "var(--text-muted)",
            margin: "0 auto 1.2rem",
          }}
        />
        <h3 style={{ margin: "0 0 0.8rem", fontSize: "2rem" }}>
          No matching requests found
        </h3>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          Try adjusting your search query or reset the filters.
        </p>
      </div>
    );
  }

  return (
    <div className="organizer-requests-list">
      {requests.map((req) => (
        <OrganizerRequestCard
          key={req.id}
          request={req}
          onQuickAdvance={onQuickAdvance}
          onOpenManage={onOpenManage}
        />
      ))}
    </div>
  );
}
