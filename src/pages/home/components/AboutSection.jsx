// src/pages/home/components/AboutSection.jsx

import { pillars } from "../data/homeData";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-wrapper"
      style={{ paddingTop: "2rem" }}
    >
      <div className="section-header">
        <span className="section-tag">About GreenCycle</span>
        <h2 className="section-title">
          Pioneering Zero-Waste Urban Ecosystems
        </h2>
        <p className="section-subtitle">
          GreenCycle was built on a simple premise: waste management should be
          as easy as ordering a ride, and as accountable as any modern utility.
        </p>
      </div>

      <div className="about-pillars">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="pillar-card">
            <div className="pillar-header">
              <div className="pillar-icon" aria-hidden="true">
                {pillar.icon}
              </div>
              <h3>{pillar.title}</h3>
            </div>
            <p>{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
