// src/pages/FAQ.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch,
  LuChevronDown,
  LuArrowRight,
} from "react-icons/lu";
import { FiHelpCircle } from "react-icons/fi";
import "./FAQ.css";

const faqData = [
  {
    id: 1,
    category: "scheduling",
    question: "How do I schedule a waste or recyclable pickup?",
    answer: "You can schedule a pickup directly through the GreenCycle portal on the Home or Services page. Choose your waste type (household recyclables, organic, bulk furniture, or electronics), choose an available date, and enter your address. You'll receive instant SMS confirmation with live tracking.",
  },
  {
    id: 2,
    category: "materials",
    question: "What items can be included in Household Recyclables?",
    answer: "We collect paper, clean cardboard, plastic bottles (PET, HDPE), aluminum cans, and glass jars. Please ensure all containers are rinsed of food residue and flattened whenever possible to save space.",
  },
  {
    id: 3,
    category: "materials",
    question: "How do I dispose of old electronics and batteries safely?",
    answer: "Batteries, old phones, laptops, and cables must not be thrown in general waste bins. You can book an E-Waste Pickup via our portal. For hazardous Li-ion batteries, ensure terminals are covered with tape to avoid short circuits.",
  },
  {
    id: 4,
    category: "pricing",
    question: "Are recyclable collections free?",
    answer: "Yes! Doorstep pickup for dry recyclables (paper, cardboard, plastics, glass) is completely free of charge. In fact, for sorted bulk dry recyclables over 15kg, you earn Green Credits redeemable for gift cards or community utility discounts.",
  },
  {
    id: 5,
    category: "scheduling",
    question: "What time will the collection vehicle arrive?",
    answer: "Our standard residential collection window is between 7:30 AM and 11:30 AM. On the morning of pickup, you will receive an automated alert with the driver's name, vehicle number, and an estimated 30-minute arrival window.",
  },
  {
    id: 6,
    category: "commercial",
    question: "Do you offer solutions for commercial buildings or societies?",
    answer: "Yes, we partner with apartment resident welfare associations (RWAs), IT parks, restaurants, and retail spaces. We install color-coded segregation bins, conduct staff waste audits, and issue monthly ESG compliance certificates.",
  },
  {
    id: 7,
    category: "pricing",
    question: "How does bulk furniture or mattress pickup work?",
    answer: "Bulk waste requires special handling and dedicated loaders. Flat-rate pricing starts at $45 depending on the item volume. Two trained loaders will enter and safely remove the items without damage to walls or hallways.",
  },
  {
    id: 8,
    category: "materials",
    question: "What happens to the waste after it is picked up?",
    answer: "GreenCycle operates on a strict Zero-Landfill philosophy. 100% of organic waste goes to aerobic municipal composting units. Recyclables are sorted by optical infrared and hand-sorters before being baled and supplied directly to certified re-processors.",
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState([1]); // First item open by default

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="faq-page">
      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero-content">
          <span className="hero-badge">
            <FiHelpCircle aria-hidden="true" />
            <span>Help Center & Knowledgebase</span>
          </span>
          <h1 className="hero-title" style={{ marginTop: "1.6rem" }}>
            Frequently Asked <span>Questions</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: "1.6rem auto 0" }}>
            Find immediate answers on collection timings, accepted materials, billing, and eco-standards.
          </p>

          <div className="faq-search-wrap">
            <LuSearch style={{ fontSize: "2.2rem", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search questions (e.g., batteries, schedule, bulk fee)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Accordion Section */}
      <section className="section-wrapper">
        <div className="service-tabs" role="tablist">
          <button
            className={`service-tab-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Questions
          </button>
          <button
            className={`service-tab-btn ${activeCategory === "scheduling" ? "active" : ""}`}
            onClick={() => setActiveCategory("scheduling")}
          >
            Pickup & Scheduling
          </button>
          <button
            className={`service-tab-btn ${activeCategory === "materials" ? "active" : ""}`}
            onClick={() => setActiveCategory("materials")}
          >
            Accepted Materials
          </button>
          <button
            className={`service-tab-btn ${activeCategory === "pricing" ? "active" : ""}`}
            onClick={() => setActiveCategory("pricing")}
          >
            Pricing & Credits
          </button>
          <button
            className={`service-tab-btn ${activeCategory === "commercial" ? "active" : ""}`}
            onClick={() => setActiveCategory("commercial")}
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
              <Link to="/contact" className="btn-primary" style={{ marginTop: "2rem" }}>
                Ask Our Support Team
              </Link>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-icon-arrow">
                      <LuChevronDown />
                    </span>
                  </button>
                  {isOpen && <div className="faq-answer">{faq.answer}</div>}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-wrapper">
        <div className="cta-banner">
          <span className="section-tag">Direct Support</span>
          <h2>Still Have Questions?</h2>
          <p>
            Our dedicated environmental support desk is available to assist you with any custom waste logistics.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">
              Contact Us Now <LuArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
