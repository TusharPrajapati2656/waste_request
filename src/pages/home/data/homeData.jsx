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
  LuTrash2,
  LuFileText,
  LuReceipt,
  LuCrown,
  LuScale,
  LuCoins,
  LuGift,
  LuFileCheck,
  LuClock,
  LuAward,
  LuTruck,
  LuCalendar,
  LuSmartphone,
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
    id: "commercial",
    category: "commercial",
    title: "Commercial & Business Collection",
    badge: "Enterprise",
    badgeIcon: <LuCrown />,
    icon: <LuBuilding2 />,
    price: "Custom Quote",
    turnaround: "Flexible Schedules",
    description: "Complete waste management for restaurants, offices, retail spaces and corporate parks.",
    features: [
      { text: "Dedicated commercial wheelie bin provision", icon: <LuTrash2 /> },
      { text: "Certified carbon offset & ESG reports", icon: <LuLeaf /> },
      { text: "Confidential document destruction & baling", icon: <LuFileText /> },
      { text: "Monthly consolidated tax invoicing", icon: <LuReceipt /> },
    ],
  },
  {
    id: "residential",
    category: "residential",
    title: "Residential Waste Pickup",
    badge: "Most Popular",
    badgeIcon: <LuSparkles />,
    icon: <FiHome />,
    price: "Free - $12/mo",
    turnaround: "Daily / On-demand",
    description: "Scheduled doorstep pickup for single-family homes, townhouses, and housing complexes.",
    features: [
      { text: "Dedicated segregation bin & bag provision", icon: <LuTrash2 /> },
      { text: "Certified eco-friendly carbon offset reports", icon: <LuLeaf /> },
      { text: "Morning automated arrival alerts & tracking", icon: <LuClock /> },
      { text: "Earn green eco-points for sorted recyclables", icon: <LuAward /> },
    ],
  },
  {
    id: "recycling",
    category: "recyclables",
    title: "Dry Recyclable Waste Sorting",
    badge: "Eco-Hero",
    badgeIcon: <LuLeaf />,
    icon: <LuRecycle />,
    price: "Free with Cashback",
    turnaround: "Every Weekend",
    description: "Specialized recovery for clean cardboard, paper, glass, aluminum, and rigid plastics.",
    features: [
      { text: "Digital weigh-scale doorstep verification", icon: <LuScale /> },
      { text: "Certified ISO-14001 carbon diversion reports", icon: <LuLeaf /> },
      { text: "Instant cashback vouchers per kilogram sorted", icon: <LuCoins /> },
      { text: "Official municipal recycling certificate", icon: <LuAward /> },
    ],
  },
  {
    id: "bulk",
    category: "bulk",
    title: "On-Demand Bulk & Furniture Disposal",
    badge: "Heavy Duty",
    badgeIcon: <LuTruck />,
    icon: <FiTruck />,
    price: "$45 - $90 flat",
    turnaround: "Within 24-48 hours",
    description: "Full-service collection for mattresses, broken furniture, home renovations, and large appliances.",
    features: [
      { text: "2 trained loaders included with every truck", icon: <LuUsers /> },
      { text: "Staircase, driveway and basement removal", icon: <LuBuilding2 /> },
      { text: "Reusable furniture donated to vetted NGOs", icon: <LuGift /> },
      { text: "Zero-landfill dismantling & metal baling", icon: <LuRecycle /> },
    ],
  },
  {
    id: "hazardous",
    category: "hazardous",
    title: "Hazardous & Battery Safe Handling",
    badge: "EPA Certified",
    badgeIcon: <LuShieldCheck />,
    icon: <FiAlertTriangle />,
    price: "$25 base slot",
    turnaround: "Bi-weekly Saturdays",
    description: "Safe neutralization and specialized transport for chemicals, motor oils, e-waste, and batteries.",
    features: [
      { text: "Spill-proof UN-certified wheelie drums", icon: <LuTrash2 /> },
      { text: "Zero-groundwater contamination guarantee", icon: <LuLeaf /> },
      { text: "Certified chain-of-custody compliance manifest", icon: <LuFileCheck /> },
      { text: "Safe handling of paint thinners & batteries", icon: <LuShieldCheck /> },
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
    icon: <LuCalendar />,
    question: "How do I schedule a waste or recyclable pickup?",
    answer: "You can schedule a pickup directly using our booking form on this page. Choose your waste type (household recyclables, organic, bulk furniture, or electronics), choose an available date, and enter your address. You'll receive instant SMS confirmation with live tracking.",
  },
  {
    id: 2,
    category: "materials",
    icon: <LuRecycle />,
    question: "What items can be included in Household Recyclables?",
    answer: "We collect paper, clean cardboard, plastic bottles (PET, HDPE), aluminum cans, and glass jars. Please ensure all containers are rinsed of food residue and flattened whenever possible to save space.",
  },
  {
    id: 3,
    category: "materials",
    icon: <LuSmartphone />,
    question: "How do I dispose of old electronics and batteries safely?",
    answer: "Batteries, old phones, laptops, and cables must not be thrown in general waste bins. You can book an E-Waste Pickup via our portal. For hazardous Li-ion batteries, ensure terminals are covered with tape to avoid short circuits.",
  },
  {
    id: 4,
    category: "pricing",
    icon: <LuCoins />,
    question: "Are recyclable collections free?",
    answer: "Yes! Doorstep pickup for dry recyclables (paper, cardboard, plastics, glass) is completely free of charge. In fact, for sorted bulk dry recyclables over 15kg, you earn Green Credits redeemable for gift cards or community utility discounts.",
  },
  {
    id: 5,
    category: "scheduling",
    icon: <LuClock />,
    question: "What time will the collection vehicle arrive?",
    answer: "Our standard residential collection window is between 7:30 AM and 11:30 AM. On the morning of pickup, you will receive an automated alert with the driver's name, vehicle number, and an estimated 30-minute arrival window.",
  },
  {
    id: 6,
    category: "commercial",
    icon: <LuBuilding2 />,
    question: "Do you offer solutions for commercial buildings or societies?",
    answer: "Yes, we partner with apartment resident welfare associations (RWAs), IT parks, restaurants, and retail spaces. We install color-coded segregation bins, conduct staff waste audits, and issue monthly ESG compliance certificates.",
  },
  {
    id: 7,
    category: "pricing",
    icon: <LuTruck />,
    question: "How does bulk furniture or mattress pickup work?",
    answer: "Bulk waste requires special handling and dedicated loaders. Flat-rate pricing starts at $45 depending on the item volume. Two trained loaders will enter and safely remove the items without damage to walls or hallways.",
  },
  {
    id: 8,
    category: "materials",
    icon: <LuLeaf />,
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
