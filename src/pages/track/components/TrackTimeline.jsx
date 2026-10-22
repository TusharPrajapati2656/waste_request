// src/pages/track/components/TrackTimeline.jsx

export default function TrackTimeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="tracker-timeline-box">
      <h4
        style={{
          margin: "0 0 1.2rem",
          fontSize: "1.45rem",
          color: "var(--text-primary)",
        }}
      >
        Milestone Audit Trail
      </h4>
      <div>
        {timeline.map((event, idx) => (
          <div key={idx} className="tracker-timeline-item">
            <div className="tracker-timeline-dot" />
            <div className="tracker-timeline-content">
              <span className="tracker-timeline-time">{event.time}</span>
              <span className="tracker-timeline-note">{event.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
