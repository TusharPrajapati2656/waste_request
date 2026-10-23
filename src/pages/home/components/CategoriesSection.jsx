// src/pages/home/components/CategoriesSection.jsx

import React from "react";
import { LuArrowUpRight, LuSparkles } from "react-icons/lu";
import { wasteCategories } from "../data/homeData";
import "../style/CategoriesSection.css";

function CategoryCardItem({ cat }) {
  return (
    <div className={`category-card cat-card-${cat.id}`}>
      <div className="category-card-top-bar" aria-hidden="true" />
      <div className="category-header">
        <div className="category-icon" aria-hidden="true">
          {cat.icon}
        </div>
        <div className="category-header-text">
          <div className="category-live-pill">
            <span className="cat-pulse-dot" aria-hidden="true" />
            <span>Active Stream</span>
          </div>
          <h3>{cat.title}</h3>
        </div>
      </div>

      <p className="category-card-desc">{cat.description}</p>

      <div className="category-tags">
        {cat.tags.map((t) => (
          <span key={t} className="category-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="category-card-footer">
        <span className="category-badge-chip">
          <LuSparkles className="badge-sparkle-icon" aria-hidden="true" />
          <span>{cat.badge}</span>
        </span>
        <span className="category-arrow-icon" aria-hidden="true">
          <LuArrowUpRight />
        </span>
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  return (
    <section className="categories-section" id="categories">
      <div className="section-wrapper">
        <div className="section-header">
          <div className="broadcast-live-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>CONTINUOUS RECOVERY STREAM · WHAT WE COLLECT</span>
          </div>
          <h2 className="section-title">
            Comprehensive Waste Segregation & Recovery
          </h2>
          <p className="section-subtitle">
            Every material is responsibly sorted, recycled, or diverted in
            certified eco-facilities to protect urban ecosystems. Hover any card
            to pause stream.
          </p>
        </div>
      </div>

      {/* Infinite Broadcast Marquee Track */}
      <div
        className="categories-marquee-wrapper"
        aria-label="Continuous waste stream categories broadcast"
      >
        <div className="categories-marquee-track">
          {/* First loop instance */}
          {wasteCategories.map((cat, idx) => (
            <CategoryCardItem key={`cat-1-${cat.id}-${idx}`} cat={cat} />
          ))}
          {/* Second loop instance for seamless infinite scrolling */}
          {wasteCategories.map((cat, idx) => (
            <CategoryCardItem key={`cat-2-${cat.id}-${idx}`} cat={cat} />
          ))}
          {/* Third loop instance to guarantee full width coverage on ultra-wide screens */}
          {wasteCategories.map((cat, idx) => (
            <CategoryCardItem key={`cat-3-${cat.id}-${idx}`} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
