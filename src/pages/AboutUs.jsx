// src/pages/AboutUs.jsx

import { Link } from "react-router-dom";
import {
  LuLeaf,
  LuShieldCheck,
  LuRecycle,
  LuUsers,
  LuArrowRight,
  LuAward,
} from "react-icons/lu";
import "./AboutUs.css";

const pillars = [
  {
    icon: <LuRecycle />,
    title: "Circular Economy First",
    description: "Every scrap collected is treated as a potential resource. We redirect up to 94% of collected materials into re-manufacturing pipelines.",
  },
  {
    icon: <LuLeaf />,
    title: "Zero-Landfill Commitment",
    description: "Landfills emit dangerous methane and leachates. Our goal is to achieve zero unmanaged waste in all participating metropolitan regions.",
  },
  {
    icon: <LuShieldCheck />,
    title: "Verified Traceability",
    description: "From doorstep collection to recycling plants, waste batches are tracked via digital manifests so you know your footprint actually counts.",
  },
  {
    icon: <LuUsers />,
    title: "Community Dignity",
    description: "We provide safe, formalized, and well-compensated employment to over 450+ sanitation workers and collection drivers.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "Inception & Pilot Fleet",
    description: "Founded with 4 electric collection vans serving 500 households in pilot green neighborhoods.",
  },
  {
    year: "2023",
    title: "Municipal Partnership & App Launch",
    description: "Expanded to 12 city zones with smart IoT route optimization, cutting collection response times by 65%.",
  },
  {
    year: "2025",
    title: "Industrial & E-Waste Processing Facility",
    description: "Inaugurated our first mechanized dry-waste recovery and certified electronic shredding facility.",
  },
  {
    year: "2026 & Beyond",
    title: "Nationwide Zero-Waste Vision",
    description: "Empowering 35,000+ homes and 400+ commercial clients with on-demand zero-waste solutions.",
  },
];

const leaders = [
  {
    name: "Dr. Ananya Sharma",
    role: "Co-Founder & Chief Sustainability Officer",
    initials: "AS",
    bio: "Ph.D. in Environmental Engineering with 14+ years in circular waste systems and urban decarbonization.",
  },
  {
    name: "Vikram Malhotra",
    role: "Head of Logistics & Operations",
    initials: "VM",
    bio: "Former supply-chain director specializing in green fleet routing and hyper-local doorstep logistics.",
  },
  {
    name: "Meera Patel",
    role: "Community & Recycling Relations",
    initials: "MP",
    bio: "Advocate for sanitation worker welfare and grassroots citizen waste segregation education.",
  },
];

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="hero-badge">
            <LuAward aria-hidden="true" />
            <span>Our Mission & Story</span>
          </span>
          <h1 className="hero-title" style={{ marginTop: "1.6rem" }}>
            Revolutionizing How Cities <span>Manage & Recycle Waste</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: "1.6rem auto 0" }}>
            GreenCycle was built on a simple premise: waste management should be as easy as ordering a ride, 
            and as accountable as any modern utility.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">Our Core Values</span>
          <h2 className="section-title">Built on Four Uncompromising Pillars</h2>
          <p className="section-subtitle">
            How we ensure sustainable, transparent, and humane waste recovery at scale.
          </p>
        </div>

        <div className="about-pillars">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="pillar-card">
              <div className="pillar-icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">Our Journey</span>
          <h2 className="section-title">Milestones in Sustainable Waste</h2>
          <p className="section-subtitle">
            Growing from a humble neighborhood initiative into a technology-driven waste management utility.
          </p>
        </div>

        <div className="timeline-list">
          {timeline.map((item) => (
            <div key={item.year} className="timeline-item">
              <div className="timeline-bullet" />
              <div className="timeline-card">
                <div className="timeline-year">{item.year}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">Leadership Team</span>
          <h2 className="section-title">Driven by Environmental Passion</h2>
          <p className="section-subtitle">
            Engineers, environmentalists, and operators dedicated to making our cities cleaner.
          </p>
        </div>

        <div className="team-grid">
          {leaders.map((person) => (
            <div key={person.name} className="team-card">
              <div className="team-avatar">{person.initials}</div>
              <h3>{person.name}</h3>
              <p className="team-role">{person.role}</p>
              <p className="team-bio">{person.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-wrapper">
        <div className="cta-banner">
          <span className="section-tag">Get Involved</span>
          <h2>Partner with Us for a Cleaner Future</h2>
          <p>
            Whether you are a resident, an apartment association, or a commercial enterprise, 
            GreenCycle can tailor a clean waste disposal solution for you.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">
              Speak with Our Team <LuArrowRight aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn-secondary">
              Browse Available Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
