// src/pages/home/components/CategoriesSection.jsx

import { wasteCategories } from "../data/homeData";

export default function CategoriesSection() {
  return (
    <section className="section-wrapper">
      <div className="section-header">
        <span className="section-tag">What We Collect</span>
        <h2 className="section-title">
          Comprehensive Waste Segregation & Recovery
        </h2>
        <p className="section-subtitle">
          Every material is responsibly sorted, recycled, or disposed of in
          certified facilities to protect local ecosystems.
        </p>
      </div>

      <div className="categories-grid">
        {wasteCategories.map((cat) => (
          <div key={cat.id} className="category-card">
            <div className="category-header">
              <div className="category-icon" aria-hidden="true">
                {cat.icon}
              </div>
              <h3>{cat.title}</h3>
            </div>
            <p>{cat.description}</p>
            <div className="category-tags">
              {cat.tags.map((t) => (
                <span key={t} className="category-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
