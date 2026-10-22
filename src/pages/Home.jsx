// src/pages/Home.jsx

import { useState } from "react";
import {
  FiHome,
  FiTruck,
  FiAlertTriangle,
  FiSearch,
  FiCheckCircle,
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
  FiAlertCircle,
} from "react-icons/fi";
import {
  LuLeaf,
  LuRecycle,
  LuBuilding2,
  LuShieldCheck,
  LuSparkles,
  LuArrowRight,
  LuChevronDown,
  LuUsers,
} from "react-icons/lu";

import { footerContact } from "../common/Footer/FooterData";
import "./Home.css";
import "./Services.css";
import "./AboutUs.css";
import "./FAQ.css";
import "./ContactUs.css";

/* --- DATA COLLECTIONS --- */

const wasteCategories = [
  {
    id: "recyclables",
    title: "Household Recyclables",
    icon: <LuRecycle />,
    description: "Paper, corrugated cardboard, PET plastics, glass bottles, and aluminium beverage cans.",
    tags: ["Paper", "Plastic", "Glass", "Metals"],
  },
  {
    id: "organic",
    title: "Organic & Food Waste",
    icon: <LuLeaf />,
    description: "Kitchen food scraps, produce waste, garden trimmings, and natural compostable items.",
    tags: ["Compost", "Kitchen", "Green Waste"],
  },
  {
    id: "ewaste",
    title: "E-Waste & Electronics",
    icon: <LuSparkles />,
    description: "Old laptops, phones, cables, circuit boards, appliances, and batteries with certified data wipe.",
    tags: ["Computers", "Phones", "Batteries"],
  },
  {
    id: "bulk",
    title: "Bulky Items & Furniture",
    icon: <FiTruck />,
    description: "Mattresses, couches, wooden furniture, renovation debris, and oversized household gear.",
    tags: ["Mattresses", "Furniture", "Renovation"],
  },
  {
    id: "hazardous",
    title: "Special & Hazardous",
    icon: <FiAlertTriangle />,
    description: "Paints, motor oils, cleaning chemicals, expired medications, and fluorescent tubes.",
    tags: ["Chemicals", "Medical", "Safe Disposal"],
  },
  {
    id: "commercial",
    title: "Commercial & Business",
    icon: <LuShieldCheck />,
    description: "Scheduled recurring disposal, warehouse waste clearances, and certified compliance reports.",
    tags: ["Offices", "Retail", "Industrial"],
  },
];

const servicesList = [
  {
    id: "residential",
    category: "residential",
    title: "Residential Waste Pickup",
    badge: "Most Popular",
    icon: <FiHome />,
    price: "Free - $12/mo",
    turnaround: "Daily / On-demand",
    description: "Scheduled doorstep pickup for single-family homes, townhouses, and housing complexes.",
    features: [
      "Separate wet and dry segregation bags",
      "Real-time collection vehicle tracking",
      "Automated SMS/Email morning notifications",
      "Earn green eco-points for sorted recyclables",
    ],
  },
  {
    id: "commercial",
    category: "commercial",
    title: "Commercial & Business Collection",
    badge: "Enterprise",
    icon: <LuBuilding2 />,
    price: "Custom Quote",
    turnaround: "Flexible Schedules",
    description: "Complete waste management for restaurants, offices, retail spaces, and corporate parks.",
    features: [
      "Dedicated commercial wheelie bin provision",
      "Certified carbon offset & ESG compliance reports",
      "Confidential document destruction & baling",
      "Monthly consolidated tax invoicing",
    ],
  },
  {
    id: "recycling",
    category: "recyclables",
    title: "Dry Recyclable Waste Sorting",
    badge: "Eco-Hero",
    icon: <LuRecycle />,
    price: "Free with Cashback",
    turnaround: "Every Weekend",
    description: "Specialized recovery for clean cardboard, paper, glass, aluminum, and rigid plastics.",
    features: [
      "Digital weigh-scale doorstep verification",
      "Cashback or gift cards per kilogram sorted",
      "100% processed at ISO-14001 certified hubs",
      "Impact badge displayed on your citizen profile",
    ],
  },
  {
    id: "bulk",
    category: "bulk",
    title: "On-Demand Bulk & Furniture Disposal",
    badge: "Heavy Duty",
    icon: <FiTruck />,
    price: "$45 - $90 flat",
    turnaround: "Within 24-48 hours",
    description: "Full-service collection for mattresses, broken furniture, home renovations, and large appliances.",
    features: [
      "2 trained loaders included in every booking",
      "Staircase and basement removal available",
      "Salvageable items donated to local NGOs",
      "Safe dismantling & scrap metal separation",
    ],
  },
  {
    id: "hazardous",
    category: "hazardous",
    title: "Hazardous & Battery Safe Handling",
    badge: "EPA Certified",
    icon: <FiAlertTriangle />,
    price: "$25 base slot",
    turnaround: "Bi-weekly Saturdays",
    description: "Safe neutralization and specialized transport for chemicals, motor oils, e-waste, and batteries.",
    features: [
      "Spill-proof UN-certified containment containers",
      "Certified chain-of-custody documentation",
      "Zero-groundwater contamination guarantee",
      "Safe handling of paint thinners and mercury",
    ],
  },
];

const wasteDatabase = [
  { item: "Cardboard boxes", category: "Recyclables", accepted: true, tip: "Flatten and tie with string. Keep dry." },
  { item: "Plastic water bottles (PET)", category: "Recyclables", accepted: true, tip: "Empty liquid, rinse, and crush." },
  { item: "Vegetable peels & food scraps", category: "Organic", accepted: true, tip: "Dispose in green compostable bag." },
  { item: "Batteries (AA, AAA, Li-ion)", category: "Hazardous", accepted: true, tip: "Do NOT place in general trash. Tape terminals." },
  { item: "Glass bottles & jars", category: "Recyclables", accepted: true, tip: "Rinse clean. Remove metal lids." },
  { item: "Styrofoam / Thermocol", category: "Special Waste", accepted: false, tip: "Not accepted in curbside bin. Requires depot drop-off." },
  { item: "Broken CFL & fluorescent tubes", category: "Hazardous", accepted: true, tip: "Wrap safely in newspaper to prevent mercury vapor." },
  { item: "Old Mattresses", category: "Bulk Waste", accepted: true, tip: "Book an On-Demand Bulk Truck pickup." },
];

const faqData = [
  {
    id: 1,
    category: "scheduling",
    question: "How do I schedule a waste or recyclable pickup?",
    answer: "You can schedule a pickup directly using our booking form on this page. Choose your waste type (household recyclables, organic, bulk furniture, or electronics), choose an available date, and enter your address. You'll receive instant SMS confirmation with live tracking.",
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

const pillars = [
  {
    icon: <LuRecycle />,
    title: "Circular Economy First",
    description: "Every scrap collected is treated as a resource. We redirect up to 94% of collected materials into remanufacturing pipelines.",
  },
  {
    icon: <LuLeaf />,
    title: "Zero-Landfill Commitment",
    description: "Landfills emit dangerous methane and leachates. Our goal is to achieve zero unmanaged waste across participating regions.",
  },
  {
    icon: <LuShieldCheck />,
    title: "Verified Traceability",
    description: "From doorstep collection to recycling plants, waste batches are tracked via digital manifests so your footprint counts.",
  },
  {
    icon: <LuUsers />,
    title: "Community Dignity",
    description: "We provide safe, formalized, and well-compensated employment to over 450+ sanitation workers and collection drivers.",
  },
];

export default function Home() {
  /* --- HOME ESTIMATOR STATE --- */
  const [wasteType, setWasteType] = useState("recyclables");
  const [pincode, setPincode] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [estimateResult, setEstimateResult] = useState(null);

  /* --- SERVICES STATE --- */
  const [activeServiceTab, setActiveServiceTab] = useState("all");
  const [searchCheckerQuery, setSearchCheckerQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    notes: "",
  });

  /* --- FAQ STATE --- */
  const [activeFaqCategory, setActiveFaqCategory] = useState("all");
  const [faqSearchQuery, setFaqSearchQuery] = useState("");
  const [openFaqIds, setOpenFaqIds] = useState([1]);

  /* --- CONTACT STATE --- */
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "general",
    pincode: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactStatus, setContactStatus] = useState("");

  /* --- HANDLERS --- */
  const handleEstimate = (e) => {
    e.preventDefault();
    if (!pincode.trim() || !pickupDate) {
      alert("Please provide your pickup location (Pincode/Area) and preferred date.");
      return;
    }

    const prices = {
      recyclables: { base: "Free Pickup", credit: "Earn green points", turnaround: "Within 24h" },
      organic: { base: "$12 / bin", credit: "Zero-landfill certified", turnaround: "Every morning" },
      ewaste: { base: "$15 flat", credit: "Certificate of destruction", turnaround: "Scheduled slot" },
      bulk: { base: "$45 - $90", credit: "2 movers included", turnaround: "Within 48h" },
      hazardous: { base: "$35 base fee", credit: "EPA compliant handling", turnaround: "Special slot" },
      commercial: { base: "Custom Quote", credit: "Monthly invoicing", turnaround: "Daily/Weekly" },
    };

    setEstimateResult(prices[wasteType] || prices.recyclables);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedService(null);
      setBookingData({ name: "", phone: "", address: "", date: "", notes: "" });
    }, 2500);
  };

  const toggleFaq = (id) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name.trim() || !contactData.email.trim() || !contactData.phone.trim()) {
      setContactStatus("Please complete all required fields.");
      return;
    }
    setContactSubmitted(true);
    setContactStatus("Thank you! Our operations supervisor has received your inquiry and will reach out within 15 minutes.");
  };

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredServices =
    activeServiceTab === "all"
      ? servicesList
      : servicesList.filter((s) => s.category === activeServiceTab);

  const filteredCheckerItems = searchCheckerQuery.trim()
    ? wasteDatabase.filter(
        (w) =>
          w.item.toLowerCase().includes(searchCheckerQuery.toLowerCase()) ||
          w.category.toLowerCase().includes(searchCheckerQuery.toLowerCase())
      )
    : wasteDatabase.slice(0, 4);

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeFaqCategory === "all" || item.category === activeFaqCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      {/* ========================================================= */}
      {/* 1. HOME SECTION                                           */}
      {/* ========================================================= */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <LuLeaf aria-hidden="true" />
              <span>Smart Zero-Waste Portal</span>
            </div>

            <h1 className="hero-title">
              Effortless Waste Pickup & <span>Sustainable Recycling</span>
            </h1>

            <p className="hero-subtitle">
              Schedule on-demand doorstep pickups for household recyclables, bulky furniture, 
              organic waste, and electronics. Fast, transparent, and 100% eco-responsible.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => scrollToAnchor("services")}
              >
                Book a Pickup <LuArrowRight aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => scrollToAnchor("about")}
              >
                How It Works
              </button>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-number">48,500+</span>
                <span className="trust-label">Tons Recycled</span>
              </div>
              <div className="trust-item">
                <span className="trust-number">99.4%</span>
                <span className="trust-label">On-time Pickups</span>
              </div>
              <div className="trust-item">
                <span className="trust-number">35,000+</span>
                <span className="trust-label">Happy Citizens</span>
              </div>
            </div>
          </div>

          {/* Quick Schedule Estimator Card */}
          <div className="hero-card">
            <div className="card-header">
              <h3>Instant Pickup Estimate</h3>
              <p>Check slot availability and rate in your area</p>
            </div>

            <form onSubmit={handleEstimate} className="booking-form">
              <div className="form-group">
                <label htmlFor="waste-type">Waste Category</label>
                <select
                  id="waste-type"
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                >
                  <option value="recyclables">Household Recyclables (Plastic, Paper, Glass)</option>
                  <option value="organic">Organic / Compostable Waste</option>
                  <option value="ewaste">E-Waste & Electronics</option>
                  <option value="bulk">Bulky Items & Furniture</option>
                  <option value="hazardous">Special / Hazardous Waste</option>
                  <option value="commercial">Commercial & Retail Waste</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pincode">Area / Pincode</label>
                  <input
                    id="pincode"
                    type="text"
                    placeholder="e.g. 110001 or Sector 5"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pickup-date">Preferred Date</label>
                  <input
                    id="pickup-date"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-calculate">
                Calculate Estimate & Availability
              </button>

              {estimateResult && (
                <div className="booking-estimate" role="region" aria-live="polite">
                  <div className="estimate-header">
                    <span>Estimated Rate:</span>
                    <span>{estimateResult.base}</span>
                  </div>
                  <div className="estimate-details">
                    <div>Turnaround: <strong>{estimateResult.turnaround}</strong></div>
                    <div>Eco Benefit: <strong>{estimateResult.credit}</strong></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const s = servicesList.find((srv) => srv.category === wasteType) || servicesList[0];
                      setSelectedService(s);
                      setBookingData((prev) => ({
                        ...prev,
                        date: pickupDate,
                        address: pincode,
                      }));
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      marginTop: "1.2rem",
                      background: "transparent",
                      border: "none",
                      color: "var(--primary-dark)",
                      fontWeight: "700",
                      fontSize: "1.3rem",
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: 0,
                    }}
                  >
                    Confirm & Reserve This Slot <LuArrowRight />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">What We Collect</span>
          <h2 className="section-title">Comprehensive Waste Segregation & Recovery</h2>
          <p className="section-subtitle">
            Every material is responsibly sorted, recycled, or disposed of in certified facilities to protect local ecosystems.
          </p>
        </div>

        <div className="categories-grid">
          {wasteCategories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
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

      {/* How It Works */}
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

      {/* Impact Dashboard Banner */}
      <section className="section-wrapper">
        <div className="impact-banner">
          <div className="impact-item">
            <h4>48.5K+</h4>
            <p>Tons of Waste Diverted from Landfills</p>
          </div>
          <div className="impact-item">
            <h4>120K+</h4>
            <p>Trees Preserved via Recycled Paper</p>
          </div>
          <div className="impact-item">
            <h4>650K+</h4>
            <p>Liters of Water Conserved</p>
          </div>
          <div className="impact-item">
            <h4>100%</h4>
            <p>Compliance with Local Environmental Standards</p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SERVICES SECTION                                       */}
      {/* ========================================================= */}
      <section id="services" className="section-wrapper" style={{ paddingTop: "2rem" }}>
        <div className="section-header">
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">Tailored Waste Solutions for Homes & Businesses</h2>
          <p className="section-subtitle">
            Reliable, on-schedule collection services built with state-of-the-art segregation 
            standards and verified environmental compliance.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="service-tabs" role="tablist">
          <button
            className={`service-tab-btn ${activeServiceTab === "all" ? "active" : ""}`}
            onClick={() => setActiveServiceTab("all")}
          >
            All Services
          </button>
          <button
            className={`service-tab-btn ${activeServiceTab === "residential" ? "active" : ""}`}
            onClick={() => setActiveServiceTab("residential")}
          >
            Residential
          </button>
          <button
            className={`service-tab-btn ${activeServiceTab === "commercial" ? "active" : ""}`}
            onClick={() => setActiveServiceTab("commercial")}
          >
            Commercial
          </button>
          <button
            className={`service-tab-btn ${activeServiceTab === "recyclables" ? "active" : ""}`}
            onClick={() => setActiveServiceTab("recyclables")}
          >
            Recyclables
          </button>
          <button
            className={`service-tab-btn ${activeServiceTab === "bulk" ? "active" : ""}`}
            onClick={() => setActiveServiceTab("bulk")}
          >
            Bulk Waste
          </button>
          <button
            className={`service-tab-btn ${activeServiceTab === "hazardous" ? "active" : ""}`}
            onClick={() => setActiveServiceTab("hazardous")}
          >
            Hazardous
          </button>
        </div>

        {/* Services Cards */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <span className="service-badge">{service.badge}</span>
              <div className="service-card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <ul className="service-features">
                {service.features.map((feat) => (
                  <li key={feat}>
                    <FiCheckCircle aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="service-footer">
                <div className="service-price">
                  <span className="price-val">{service.price}</span>
                  <span className="price-sub">{service.turnaround}</span>
                </div>
                <button
                  type="button"
                  className="btn-book-service"
                  onClick={() => setSelectedService(service)}
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Waste Classification / Can I Recycle This? Widget */}
        <div className="checker-box" style={{ marginTop: "6rem" }}>
          <span className="section-tag">Instant Segregation Guide</span>
          <h2 className="section-title">Can I Recycle This?</h2>
          <p className="section-subtitle">
            Search any household material to check whether GreenCycle collects it and how to pack it safely.
          </p>

          <div className="checker-input-wrap">
            <FiSearch style={{ fontSize: "2rem", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search items like batteries, cardboard, styrofoam, paint..."
              value={searchCheckerQuery}
              onChange={(e) => setSearchCheckerQuery(e.target.value)}
            />
          </div>

          <div className="checker-results">
            {filteredCheckerItems.map((item) => (
              <div
                key={item.item}
                className={`checker-item ${item.accepted ? "" : "not-accepted"}`}
              >
                <div className="checker-info">
                  <h4>{item.item}</h4>
                  <p>Category: <strong>{item.category}</strong> • {item.tip}</p>
                </div>
                <span
                  className={`checker-status-badge ${
                    item.accepted ? "accepted" : "restricted"
                  }`}
                >
                  {item.accepted ? "Accepted" : "Depot Only"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. ABOUT SECTION                                          */}
      {/* ========================================================= */}
      <section id="about" className="section-wrapper" style={{ paddingTop: "2rem" }}>
        <div className="section-header">
          <span className="section-tag">About GreenCycle</span>
          <h2 className="section-title">Pioneering Zero-Waste Urban Ecosystems</h2>
          <p className="section-subtitle">
            GreenCycle was built on a simple premise: waste management should be as easy as ordering a ride, 
            and as accountable as any modern utility.
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

      {/* ========================================================= */}
      {/* 4. FAQ SECTION                                            */}
      {/* ========================================================= */}
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
                onClick={() => scrollToAnchor("contact")}
              >
                Ask Our Support Team
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
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

      {/* ========================================================= */}
      {/* 5. CONTACT US SECTION                                     */}
      {/* ========================================================= */}
      <section id="contact" className="section-wrapper" style={{ paddingTop: "2rem" }}>
        <div className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">We're Here to Help Keep Cities Clean</h2>
          <p className="section-subtitle">
            Have questions about collection routes, missed pickups, bulk quotes, or recycling audits? 
            Reach our team directly.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Info Panel */}
          <div className="contact-info-panel">
            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <FiPhone />
              </div>
              <div>
                <h3>Phone & Dispatch Helpline</h3>
                <p>Monday - Saturday: 7:00 AM - 8:00 PM</p>
                <a href={`tel:${footerContact.phone}`}>{footerContact.phone}</a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <FiMail />
              </div>
              <div>
                <h3>Email Inquiries</h3>
                <p>Typical response time under 15 minutes</p>
                <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <FiMapPin />
              </div>
              <div>
                <h3>Central Recovery & Depot Hub</h3>
                <p>Waste Segregation & Materials Transfer Station</p>
                <span>{footerContact.address}</span>
              </div>
            </div>

            <div className="emergency-notice">
              <FiAlertCircle style={{ fontSize: "2.4rem", color: "var(--error)", flexShrink: 0 }} />
              <div>
                <h4>Emergency or Hazardous Spill?</h4>
                <p>
                  For medical waste violations, chemical leaks, or roadside hazards, 
                  call our immediate 24/7 rapid dispatch line: <strong>1800-GREENCYCLE</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="contact-form-panel">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and an operations supervisor will contact you shortly.</p>

            {contactSubmitted ? (
              <div
                style={{
                  padding: "3.2rem",
                  background: "var(--primary-light)",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  color: "var(--primary-dark)",
                }}
              >
                <FiCheckCircle style={{ fontSize: "4.5rem", margin: "0 auto 1.4rem" }} />
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "2.2rem" }}>Message Dispatched!</h3>
                <p style={{ margin: 0, fontSize: "1.45rem", lineHeight: 1.6 }}>{contactStatus}</p>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ marginTop: "2rem" }}
                  onClick={() => setContactSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="landing-contact-name">Full Name</label>
                  <input
                    id="landing-contact-name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={contactData.name}
                    onChange={(e) =>
                      setContactData({ ...contactData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="landing-contact-email">Email Address</label>
                    <input
                      id="landing-contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={contactData.email}
                      onChange={(e) =>
                        setContactData({ ...contactData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="landing-contact-phone">Phone Number</label>
                    <input
                      id="landing-contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={contactData.phone}
                      onChange={(e) =>
                        setContactData({ ...contactData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="landing-contact-category">Inquiry Subject</label>
                    <select
                      id="landing-contact-category"
                      value={contactData.category}
                      onChange={(e) =>
                        setContactData({ ...contactData, category: e.target.value })
                      }
                    >
                      <option value="general">General Question</option>
                      <option value="recyclables">Household Recyclables Pickup</option>
                      <option value="bulk">Bulk Furniture / Debris Removal</option>
                      <option value="missed">Report Missed Collection</option>
                      <option value="commercial">Commercial / Society Partnership</option>
                      <option value="hazardous">Hazardous Waste Disposal</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="landing-contact-pin">Area / Pincode</label>
                    <input
                      id="landing-contact-pin"
                      type="text"
                      placeholder="e.g. Sector 12"
                      value={contactData.pincode}
                      onChange={(e) =>
                        setContactData({ ...contactData, pincode: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="landing-contact-message">Your Message</label>
                  <textarea
                    id="landing-contact-message"
                    required
                    placeholder="Describe your inquiry, waste volume, or location details..."
                    value={contactData.message}
                    onChange={(e) =>
                      setContactData({ ...contactData, message: e.target.value })
                    }
                  />
                </div>

                {contactStatus && !contactSubmitted && (
                  <p style={{ color: "var(--error)", margin: 0, fontSize: "1.35rem" }}>
                    {contactStatus}
                  </p>
                )}

                <button type="submit" className="btn-calculate">
                  Send Inquiry Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. BOTTOM CTA                                             */}
      {/* ========================================================= */}
      <section className="section-wrapper" style={{ marginTop: "2rem" }}>
        <div className="cta-banner">
          <span className="section-tag">Get Started Today</span>
          <h2>Join Over 35,000 Responsible Citizens</h2>
          <p>
            Schedule your first waste collection in under 60 seconds. Together, we can build zero-waste, greener communities.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => scrollToAnchor("services")}
            >
              Schedule Pickup Now <LuArrowRight aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => scrollToAnchor("contact")}
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BOOKING MODAL                                             */}
      {/* ========================================================= */}
      {selectedService && (
        <div
          className="service-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedService(null);
          }}
        >
          <div className="service-modal" role="dialog" aria-modal="true">
            <button
              className="auth-close"
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Close booking modal"
            >
              <FiX />
            </button>

            <span className="section-tag">Service Booking</span>
            <h2 style={{ margin: "0.8rem 0 0.4rem", fontSize: "2.2rem" }}>
              Request {selectedService.title}
            </h2>
            <p style={{ margin: "0 0 2rem", color: "var(--text-secondary)", fontSize: "1.4rem" }}>
              Estimated rate: <strong>{selectedService.price}</strong> • {selectedService.turnaround}
            </p>

            {bookingSuccess ? (
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  background: "var(--primary-light)",
                  borderRadius: "var(--radius-lg)",
                  color: "var(--primary-dark)",
                }}
              >
                <FiCheckCircle style={{ fontSize: "4rem", margin: "0 auto 1.2rem" }} />
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "2rem" }}>Pickup Request Confirmed!</h3>
                <p style={{ margin: 0, fontSize: "1.4rem" }}>
                  A confirmation SMS and tracking ID have been dispatched to {bookingData.phone || "your phone"}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="service-client-name">Your Full Name</label>
                  <input
                    id="service-client-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service-client-phone">Phone Number</label>
                    <input
                      id="service-client-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={bookingData.phone}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-client-date">Pickup Date</label>
                    <input
                      id="service-client-date"
                      type="date"
                      required
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service-client-address">Pickup Address & Landmark</label>
                  <input
                    id="service-client-address"
                    type="text"
                    required
                    placeholder="House / Flat No., Street, Area, Pincode"
                    value={bookingData.address}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, address: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service-client-notes">Special Instructions (Optional)</label>
                  <input
                    id="service-client-notes"
                    type="text"
                    placeholder="e.g. Ring bell, 2nd floor, elevator available"
                    value={bookingData.notes}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, notes: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="btn-calculate" style={{ marginTop: "1rem" }}>
                  Confirm Pickup Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
