// src/pages/home/components/FaqSection.jsx

import { FiSearch } from "react-icons/fi";
import { LuChevronDown } from "react-icons/lu";

export default function FaqSection({ faq, onScrollTo }) {
  const {
    activeFaqCategory,
    setActiveFaqCategory,
    faqSearchQuery,
    setFaqSearchQuery,
    openFaqIds,
    toggleFaq,
    filteredFaqs,
  } = faq;

  return (
    <section id="faq" className="section-wrapper" style={{ paddingTop: "2rem" }}>
      <div className="section-header">
        <span className="section-tag">Knowledgebase</span>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Find immediate answers on collection timings, accepted materials, pricing, and eco-standards.
        </p>

        <div className="faq-search-wrap">
          <FiSearch style={{ fontSize: "2.2rem", color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search questions (e.g., batteries, schedule, bulk fee)..."
            value={faqSearchQuery}
            onChange={(e) => setFaqSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="service-tabs" role="tablist">
        <button
          className={`service-tab-btn ${activeFaqCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveFaqCategory("all")}
        >
          All Questions
        </button>
        <button
          className={`service-tab-btn ${activeFaqCategory === "scheduling" ? "active" : ""}`}
          onClick={() => setActiveFaqCategory("scheduling")}
        >
          Pickup & Scheduling
        </button>
        <button
          className={`service-tab-btn ${activeFaqCategory === "materials" ? "active" : ""}`}
          onClick={() => setActiveFaqCategory("materials")}
        >
          Accepted Materials
        </button>
        <button
          className={`service-tab-btn ${activeFaqCategory === "pricing" ? "active" : ""}`}
          onClick={() => setActiveFaqCategory("pricing")}
        >
          Pricing & Credits
        </button>
        <button
          className={`service-tab-btn ${activeFaqCategory === "commercial" ? "active" : ""}`}
          onClick={() => setActiveFaqCategory("commercial")}
        >
          Commercial
        </button>
      </div>

      <div className="faq-accordion-list">
        {filteredFaqs.length === 0 ? (
          <div
            style={{
              padding: "4rem",
              textAlign: "center",
              background: "var(--surface)",
              borderRadius: "var(--radius-xl)",
              border: "0.1rem solid var(--border)",
            }}
          >
            <h3>No matching answers found</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.8rem" }}>
              Try adjusting your search terms or contact our support team directly.
            </p>
            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: "2rem" }}
              onClick={() => onScrollTo("contact")}
            >
              Ask Our Support Team
            </button>
          </div>
        ) : (
          filteredFaqs.map((faqItem) => {
            const isOpen = openFaqIds.includes(faqItem.id);
            return (
              <div
                key={faqItem.id}
                className={`faq-item ${isOpen ? "is-open" : ""}`}
              >
                <button
                  className="faq-trigger"
                  type="button"
                  onClick={() => toggleFaq(faqItem.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question">{faqItem.question}</span>
                  <span className="faq-icon-arrow">
                    <LuChevronDown />
                  </span>
                </button>
                {isOpen && <div className="faq-answer">{faqItem.answer}</div>}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
