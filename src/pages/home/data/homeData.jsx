// src/pages/home/data/homeData.jsx

import {
  FiHome,
  FiTruck,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  LuLeaf,
  LuRecycle,
  LuBuilding2,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";

export const wasteCategories = [
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

export const servicesList = [
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

export const wasteDatabase = [
  { item: "Cardboard boxes", category: "Recyclables", accepted: true, tip: "Flatten and tie with string. Keep dry." },
  { item: "Plastic water bottles (PET)", category: "Recyclables", accepted: true, tip: "Empty liquid, rinse, and crush." },
  { item: "Vegetable peels & food scraps", category: "Organic", accepted: true, tip: "Dispose in green compostable bag." },
  { item: "Batteries (AA, AAA, Li-ion)", category: "Hazardous", accepted: true, tip: "Do NOT place in general trash. Tape terminals." },
  { item: "Glass bottles & jars", category: "Recyclables", accepted: true, tip: "Rinse clean. Remove metal lids." },
  { item: "Styrofoam / Thermocol", category: "Special Waste", accepted: false, tip: "Not accepted in curbside bin. Requires depot drop-off." },
  { item: "Broken CFL & fluorescent tubes", category: "Hazardous", accepted: true, tip: "Wrap safely in newspaper to prevent mercury vapor." },
  { item: "Old Mattresses", category: "Bulk Waste", accepted: true, tip: "Book an On-Demand Bulk Truck pickup." },
];

export const faqData = [
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

export const pillars = [
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

export const estimateRates = {
  recyclables: { base: "Free Pickup", credit: "Earn green points", turnaround: "Within 24h" },
  organic: { base: "$12 / bin", credit: "Zero-landfill certified", turnaround: "Every morning" },
  ewaste: { base: "$15 flat", credit: "Certificate of destruction", turnaround: "Scheduled slot" },
  bulk: { base: "$45 - $90", credit: "2 movers included", turnaround: "Within 48h" },
  hazardous: { base: "$35 base fee", credit: "EPA compliant handling", turnaround: "Special slot" },
  commercial: { base: "Custom Quote", credit: "Monthly invoicing", turnaround: "Daily/Weekly" },
};
