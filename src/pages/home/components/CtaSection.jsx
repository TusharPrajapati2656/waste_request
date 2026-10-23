// src/pages/home/components/CtaSection.jsx

import { LuArrowRight } from "react-icons/lu";
import "../style/CtaSection.css";

export default function CtaSection({ onScrollTo }) {
  return (
    <section className="cta-section">
      <div className="section-wrapper">
        <div className="cta-banner">
          <span className="section-tag">Get Started Today</span>
          <h2>Join Over 35,000 Responsible Citizens</h2>
          <p>
            Schedule your first waste collection in under 60 seconds. Together,
            we can build zero-waste, greener communities.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => onScrollTo("services")}
            >
              Schedule Pickup Now <LuArrowRight aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onScrollTo("contact")}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
