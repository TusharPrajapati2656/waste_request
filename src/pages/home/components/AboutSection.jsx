// src/pages/home/components/AboutSection.jsx

import { pillars } from "../data/homeData";
import "../style/AboutSection.css";

function ProgressRing({ percentage }) {
  const radius = 23;
  const stroke = 4.8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="pillar-progress-ring-wrap" aria-hidden="true">
      <svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="pillar-progress-svg"
      >
        <circle
          stroke="#dcfce7"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#16a34a"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="pillar-progress-circle"
        />
      </svg>
      <span className="pillar-progress-text">{percentage}%</span>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">About GreenCycle</span>
          <h2 className="section-title">
            Pioneering Zero-Waste Urban Ecosystems
          </h2>
          <p className="section-subtitle">
            GreenCycle was built on a simple premise: waste management should be
            as easy as ordering a ride, and as accountable as any modern
            utility.
          </p>
        </div>

        <div className="about-pillars">
          {pillars.map((pillar) => {
            const titleWords = (pillar.title || "").split(" ");
            const part1 = pillar.titlePart1 || titleWords[0] || "";
            const part2 =
              pillar.titlePart2 || titleWords.slice(1).join(" ") || "";

            return (
              <div key={pillar.title} className="pillar-card">
                {/* Top Row: Mint Icon + Split 2-tone Title */}
                <div className="pillar-header">
                  <div className="pillar-icon" aria-hidden="true">
                    {pillar.icon}
                  </div>
                  <h3 className="pillar-title">
                    <span className="title-dark">{part1}</span>
                    <span className="title-green">{part2}</span>
                  </h3>
                </div>

                {/* Description */}
                <p className="pillar-desc">{pillar.description}</p>

                {/* Bottom Metric Pill Widget */}
                <div className="pillar-metric-pill">
                  <ProgressRing percentage={pillar.percentage || 94} />
                  <div className="pillar-metric-divider" aria-hidden="true" />
                  <div className="pillar-metric-info">
                    <span className="pillar-metric-label">
                      {pillar.statLabel}
                    </span>
                    <span className="pillar-metric-sub">
                      {pillar.statSubtext}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

