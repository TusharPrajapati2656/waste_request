// src/pages/home/components/ProcessSection.jsx

export default function ProcessSection() {
  return (
    <section className="section-wrapper">
      <div className="section-header">
        <span className="section-tag">Simple Process</span>
        <h2 className="section-title">How GreenCycle Works in 3 Steps</h2>
        <p className="section-subtitle">
          From booking your pickup to seeing your environmental impact score, we make waste management frictionless.
        </p>
      </div>

      <div className="process-grid">
        <div className="process-step">
          <span className="step-badge">1</span>
          <h3>1. Book Your Window</h3>
          <p>
            Select your waste category and choose a pickup date & time that suits your schedule. Upload photos if you have bulk items.
          </p>
        </div>

        <div className="process-step">
          <span className="step-badge">2</span>
          <h3>2. Doorstep Collection</h3>
          <p>
            Our background-verified drivers arrive with electric collection vans, weigh the waste digitally, and give you an instant receipt.
          </p>
        </div>

        <div className="process-step">
          <span className="step-badge">3</span>
          <h3>3. Certified Recycling</h3>
          <p>
            Materials are transported to local recycling and composting plants, diverting 90%+ waste away from polluting landfills.
          </p>
        </div>
      </div>
    </section>
  );
}
