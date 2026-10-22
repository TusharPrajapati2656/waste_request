// src/pages/Legal.jsx

export default function Legal({ type }) {
  const isPrivacy = type === "privacy";

  return (
    <div className="section-wrapper" style={{ paddingBlock: "6rem", textAlign: "left" }}>
      <div className="section-header" style={{ margin: "0 0 4rem", textAlign: "left" }}>
        <span className="section-tag">Compliance & Trust</span>
        <h1 className="section-title">
          {isPrivacy ? "Privacy Policy" : "Terms of Service"}
        </h1>
        <p className="section-subtitle">
          Last updated: October 2026 • GreenCycle Environmental Services
        </p>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "0.1rem solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.4rem",
          lineHeight: "1.7",
          fontSize: "1.5rem",
          color: "var(--text-secondary)",
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "var(--text-primary)", margin: 0 }}>
          1. {isPrivacy ? "Collection of Waste Location Data" : "Service Agreement Overview"}
        </h2>
        <p style={{ margin: 0 }}>
          {isPrivacy
            ? "When you register or request on-demand waste collection through GreenCycle, we collect your pickup address, contact number, and waste manifest descriptions solely for dispatching collection vehicles and generating municipal recycling audit logs."
            : "By using GreenCycle's web portal or mobile services, you agree to ensure that materials placed for curbside or doorstep pickup comply with state waste segregation norms and contain no forbidden hazardous contaminants."}
        </p>

        <h2 style={{ fontSize: "2rem", color: "var(--text-primary)", margin: 0 }}>
          2. {isPrivacy ? "Traceability and Recyclable Manifests" : "Driver Safety and Access Norms"}
        </h2>
        <p style={{ margin: 0 }}>
          {isPrivacy
            ? "GreenCycle provides anonymized recycling aggregation data to municipal city planners to measure carbon offsets. We do not sell or monetize personal contact information to third parties."
            : "Collection crews reserve the right to decline unsorted toxic waste or unsafe sharp objects that pose hazards to sanitation operators. In such events, instructions for compliant repacking will be provided."}
        </p>

        <h2 style={{ fontSize: "2rem", color: "var(--text-primary)", margin: 0 }}>
          3. Contact for Data Protection & Grievances
        </h2>
        <p style={{ margin: 0 }}>
          For inquiries regarding your citizen account or compliance certificates, please contact:{" "}
          <strong style={{ color: "var(--primary)" }}>compliance@greencycle.example</strong>.
        </p>
      </div>
    </div>
  );
}
