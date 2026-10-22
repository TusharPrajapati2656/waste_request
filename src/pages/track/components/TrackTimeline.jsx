// src/pages/track/components/TrackTimeline.jsx

export default function TrackTimeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="tracker-timeline-box">
      <div className="tracker-timeline-header">
        <h4 className="tracker-timeline-title">Milestone Audit Trail</h4>
        <span className="tracker-timeline-badge">
          {timeline.length} {timeline.length === 1 ? "Milestone" : "Milestones"}
        </span>
      </div>

      <div className={`tracker-timeline-row items-${timeline.length}`}>
        {timeline.map((event, idx) => {
          const isLast = idx === timeline.length - 1;
          return (
            <div
              key={idx}
              className={`tracker-timeline-col ${isLast ? "is-latest" : ""}`}
            >
              <div className="tracker-timeline-node-line">
                <div className="tracker-timeline-dot" aria-hidden="true" />
                {!isLast && (
                  <div
                    className="tracker-timeline-connector"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="tracker-timeline-content">
                <span className="tracker-timeline-time">{event.time}</span>
                <span className="tracker-timeline-note">{event.note}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
