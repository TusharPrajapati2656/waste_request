// src/pages/home/components/FaqSection.jsx

import { FiSearch } from "react-icons/fi";
import { LuChevronDown, LuChevronUp, LuCircleHelp } from "react-icons/lu";
import "../style/FaqSection.css";

export default function FaqSection({ faq, onScrollTo }) {
  const {
    activeFaqCategory,
    setActiveFaqCategory,
    faqSearchQuery,
    setFaqSearchQuery,
    openFaqIds,
    toggleFaq,
    isFaqExpanded,
    toggleFaqExpand,
    filteredFaqs,
  } = faq;

  const displayedFaqs =
    isFaqExpanded || filteredFaqs.length <= 4
      ? filteredFaqs
      : filteredFaqs.slice(0, 4);

  const handleToggleExpand = () => {
    if (isFaqExpanded) {
      const el = document.getElementById("faq");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    toggleFaqExpand();
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <div className="faq-header-center">
          <span className="section-tag">Knowledge Base & FAQ</span>

          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about waste collection.
          </p>

          {/* Pill Search Bar */}
          <div className="faq-search-wrap">
            <FiSearch className="faq-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search questions (e.g., batteries, schedule, bulk fee)..."
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              aria-label="Search questions"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="faq-pills-row" role="tablist">
          <button
            type="button"
            className={`faq-pill-btn ${activeFaqCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveFaqCategory("all")}
          >
            All Questions
          </button>
          <button
            type="button"
            className={`faq-pill-btn ${activeFaqCategory === "scheduling" ? "active" : ""}`}
            onClick={() => setActiveFaqCategory("scheduling")}
          >
            Pickup & Scheduling
          </button>
          <button
            type="button"
            className={`faq-pill-btn ${activeFaqCategory === "materials" ? "active" : ""}`}
            onClick={() => setActiveFaqCategory("materials")}
          >
            Accepted Materials
          </button>
          <button
            type="button"
            className={`faq-pill-btn ${activeFaqCategory === "pricing" ? "active" : ""}`}
            onClick={() => setActiveFaqCategory("pricing")}
          >
            Pricing & Credits
          </button>
          <button
            type="button"
            className={`faq-pill-btn ${activeFaqCategory === "commercial" ? "active" : ""}`}
            onClick={() => setActiveFaqCategory("commercial")}
          >
            Commercial
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div
          className={`faq-accordion-list ${!isFaqExpanded && filteredFaqs.length > 4 ? "is-capped" : ""}`}
        >
          {filteredFaqs.length === 0 ? (
            <div className="faq-empty-state">
              <LuCircleHelp
                style={{
                  fontSize: "4.5rem",
                  color: "var(--primary)",
                  margin: "0 auto 1.2rem",
                }}
              />
              <h3>No matching answers found</h3>
              <p>
                Try adjusting your search terms or contact our support team
                directly.
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
            displayedFaqs.map((faqItem) => {
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
                    <div className="faq-trigger-left">
                      <span className="faq-item-icon" aria-hidden="true">
                        {faqItem.icon || <LuCircleHelp />}
                      </span>
                      <span className="faq-question">{faqItem.question}</span>
                    </div>

                    <span
                      className={`faq-chevron-circle ${isOpen ? "open" : ""}`}
                      aria-hidden="true"
                    >
                      {isOpen ? <LuChevronUp /> : <LuChevronDown />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-wrap">
                      <div className="faq-answer-divider" aria-hidden="true" />
                      <p className="faq-answer-text">{faqItem.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* View More / Show Less Toggle Button */}
        {filteredFaqs.length > 4 && (
          <div className="faq-expand-wrapper">
            <button
              type="button"
              className={`faq-expand-btn ${isFaqExpanded ? "is-expanded" : ""}`}
              onClick={handleToggleExpand}
              aria-expanded={isFaqExpanded}
            >
              <span>
                {isFaqExpanded
                  ? "Show Fewer Questions"
                  : `View All Questions (${filteredFaqs.length})`}
              </span>
              <span className="faq-expand-icon-circle">
                {isFaqExpanded ? <LuChevronUp /> : <LuChevronDown />}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
