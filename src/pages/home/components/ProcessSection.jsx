// src/pages/home/components/ProcessSection.jsx

import React from "react";
import { LuChevronRight } from "react-icons/lu";
import { processSteps } from "../data/homeData";
import processStep1 from "../../../assets/image/process_step_1.png";
import processStep2 from "../../../assets/image/process_step_2.png";
import processStep3 from "../../../assets/image/process_step_3.png";
import "../style/ProcessSection.css";

const stepImages = [processStep1, processStep2, processStep3];

export default function ProcessSection() {
  return (
    <section className="process-section" id="process">
      {/* Decorative ambient leaf accents */}
      <div className="process-bg-leaf leaf-top-right" aria-hidden="true" />
      <div className="process-bg-leaf leaf-top-left" aria-hidden="true" />

      <div className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title">How GreenCycle Works in 3 Steps</h2>
          <p className="section-subtitle">
            From booking your pickup to seeing your environmental impact score,
            we make waste management frictionless.
          </p>
        </div>

        <div className="process-flow">
          {processSteps.map((step, idx) => (
            <React.Fragment key={step.step}>
              <div className="process-card-item">
                <div className="process-visual-container">
                  <img
                    src={stepImages[idx]}
                    alt={step.title}
                    className="process-step-img"
                    loading="lazy"
                  />
                </div>
                <div className="process-card-content">
                  <h3 className="process-card-title">{step.title}</h3>
                  <p className="process-card-desc">{step.description}</p>
                </div>
              </div>

              {idx < processSteps.length - 1 && (
                <div className="process-connector" aria-hidden="true">
                  <div className="connector-line start-line" />
                  <div className="connector-pill">
                    <LuChevronRight className="connector-icon" />
                  </div>
                  <div className="connector-line end-line" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
