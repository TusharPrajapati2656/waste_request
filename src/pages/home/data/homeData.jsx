// src/pages/home/data/homeData.jsx

import { FiHome, FiTruck, FiAlertTriangle } from "react-icons/fi";
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
  LuPackage,
  LuCupSoda,
  LuApple,
  LuBatteryCharging,
  LuWine,
  LuLayers,
  LuLightbulb,
  LuBed,
} from "react-icons/lu";

export const wasteCategories = [
  {
    id: "recyclables",
    title: "Household Recyclables",
    icon: <LuRecycle />,
    description:
      "Paper, corrugated cardboard, PET plastics, glass bottles, and aluminium beverage cans.",
    tags: ["Paper", "Plastic", "Glass", "Metals"],
    badge: "92%+ Landfill Diverted",
  },
  {
    id: "organic",
    title: "Organic & Food Waste",
    icon: <LuLeaf />,
    description:
      "Kitchen food scraps, produce waste, garden trimmings, and natural compostable items.",
    tags: ["Compost", "Kitchen", "Green Waste"],
    badge: "Aerobic Soil Compost",
  },
  {
    id: "ewaste",
    title: "E-Waste & Electronics",
    icon: <LuSparkles />,
    description:
      "Old laptops, phones, cables, circuit boards, appliances, and batteries with certified data wipe.",
    tags: ["Computers", "Phones", "Batteries"],
    badge: "Certified Data Wipe",
  },
  {
    id: "bulk",
    title: "Bulky Items & Furniture",
    icon: <FiTruck />,
    description:
      "Mattresses, couches, wooden furniture, renovation debris, and oversized household gear.",
    tags: ["Mattresses", "Furniture", "Renovation"],
    badge: "2 Loaders Included",
  },
  {
    id: "hazardous",
    title: "Special & Hazardous",
    icon: <FiAlertTriangle />,
    description:
      "Paints, motor oils, cleaning chemicals, expired medications, and fluorescent tubes.",
    tags: ["Chemicals", "Medical", "Safe Disposal"],
    badge: "EPA Compliant Safe",
  },
  {
    id: "commercial",
    title: "Commercial & Business",
    icon: <LuShieldCheck />,
    description:
      "Scheduled recurring disposal, warehouse waste clearances, and certified compliance reports.",
    tags: ["Offices", "Retail", "Industrial"],
    badge: "Monthly ESG Audits",
  },
];

export const servicesList = [
  {
    id: "commercial",
    category: "commercial",
    title: "Commercial Collection",
    titlePart1: "Commercial",
    titlePart2: "Collection",
    badge: "Enterprise",
    badgeIcon: <LuCrown />,
    icon: <LuBuilding2 />,
    price: "Custom quote",
    turnaround: "Flexible pickup times",
    description: "Reliable waste pickup for businesses.",
    features: [
      {
        text: "Scheduled bin collection",
        icon: <LuTrash2 />,
      },
      { text: "ESG & disposal reports", icon: <LuLeaf /> },
      {
        text: "Confidential document destruction & baling",
        icon: <LuFileText />,
      },
      { text: "Monthly consolidated tax invoicing", icon: <LuReceipt /> },
    ],
  },
  {
    id: "residential",
    category: "residential",
    title: "Residential Pickup",
    titlePart1: "Residential",
    titlePart2: "Pickup",
    badge: "Most Popular",
    badgeIcon: <LuSparkles />,
    icon: <FiHome />,
    price: "Free - $12/mo",
    turnaround: "Daily / On-demand",
    description: "Scheduled doorstep pickup for homes & townhouses.",
    features: [
      { text: "Dedicated segregation bin provision", icon: <LuTrash2 /> },
      {
        text: "Certified eco-friendly carbon reports",
        icon: <LuLeaf />,
      },
      {
        text: "Morning automated arrival alerts & tracking",
        icon: <LuClock />,
      },
      {
        text: "Earn green eco-points for sorted waste",
        icon: <LuAward />,
      },
    ],
  },
  {
    id: "recycling",
    category: "recyclables",
    title: "Recyclable Sorting",
    titlePart1: "Recyclable",
    titlePart2: "Sorting",
    badge: "Eco-Hero",
    badgeIcon: <LuLeaf />,
    icon: <LuRecycle />,
    price: "Free with Cashback",
    turnaround: "Every Weekend",
    description: "Specialized recovery for clean dry recyclables.",
    features: [
      { text: "Digital weigh-scale doorstep verification", icon: <LuScale /> },
      {
        text: "Instant cashback vouchers per kilogram",
        icon: <LuCoins />,
      },
      {
        text: "Certified ISO-14001 carbon diversion reports",
        icon: <LuLeaf />,
      },
      { text: "Official municipal recycling certificate", icon: <LuAward /> },
    ],
  },
  {
    id: "bulk",
    category: "bulk",
    title: "Bulk Disposal",
    titlePart1: "Bulk",
    titlePart2: "Disposal",
    badge: "Heavy Duty",
    badgeIcon: <LuTruck />,
    icon: <FiTruck />,
    price: "$45 - $90 flat",
    turnaround: "Within 24-48 hours",
    description: "Full-service collection for bulky furniture & gear.",
    features: [
      {
        text: "2 trained loaders included with every truck",
        icon: <LuUsers />,
      },
      {
        text: "Zero-landfill dismantling & donation",
        icon: <LuRecycle />,
      },
      {
        text: "Staircase, driveway and basement removal",
        icon: <LuBuilding2 />,
      },
      { text: "Reusable furniture donated to vetted NGOs", icon: <LuGift /> },
    ],
  },
  {
    id: "hazardous",
    category: "hazardous",
    title: "Hazardous Handling",
    titlePart1: "Hazardous",
    titlePart2: "Handling",
    badge: "EPA Certified",
    badgeIcon: <LuShieldCheck />,
    icon: <FiAlertTriangle />,
    price: "$25 base slot",
    turnaround: "Bi-weekly Saturdays",
    description: "Safe certified handling for chemicals & e-waste.",
    features: [
      { text: "Spill-proof UN-certified wheelie drums", icon: <LuTrash2 /> },
      {
        text: "Certified chain-of-custody compliance manifest",
        icon: <LuFileCheck />,
      },
      { text: "Zero-groundwater contamination guarantee", icon: <LuLeaf /> },
      {
        text: "Safe handling of paint thinners & batteries",
        icon: <LuShieldCheck />,
      },
    ],
  },
];

export const wasteDatabase = [
  {
    item: "Cardboard boxes",
    category: "Recyclables",
    accepted: true,
    tip: "Flatten and tie with string. Keep dry.",
    icon: <LuPackage />,
  },
  {
    item: "Plastic water bottles (PET)",
    category: "Recyclables",
    accepted: true,
    tip: "Empty liquid, rinse, and crush.",
    icon: <LuCupSoda />,
  },
  {
    item: "Vegetable peels & food scraps",
    category: "Organic",
    accepted: true,
    tip: "Dispose in green compostable bag.",
    icon: <LuApple />,
  },
  {
    item: "Batteries (AA, AAA, Li-ion)",
    category: "Hazardous",
    accepted: true,
    tip: "Do NOT place in general trash. Tape terminals.",
    icon: <LuBatteryCharging />,
  },
  {
    item: "Glass bottles & jars",
    category: "Recyclables",
    accepted: true,
    tip: "Rinse clean. Remove metal lids.",
    icon: <LuWine />,
  },
  {
    item: "Styrofoam / Thermocol",
    category: "Special Waste",
    accepted: false,
    tip: "Not accepted in curbside bin. Requires depot drop-off.",
    icon: <LuLayers />,
  },
  {
    item: "Broken CFL & fluorescent tubes",
    category: "Hazardous",
    accepted: true,
    tip: "Wrap safely in newspaper to prevent mercury vapor.",
    icon: <LuLightbulb />,
  },
  {
    item: "Old Mattresses",
    category: "Bulk Waste",
    accepted: true,
    tip: "Book an On-Demand Bulk Truck pickup.",
    icon: <LuBed />,
  },
];

export const faqData = [
  {
    id: 1,
    category: "scheduling",
    icon: <LuCalendar />,
    question: "How do I schedule a waste or recyclable pickup?",
    answer:
      "You can schedule a pickup directly using our booking form on this page. Choose your waste type (household recyclables, organic, bulk furniture, or electronics), choose an available date, and enter your address. You'll receive instant SMS confirmation with live tracking.",
  },
  {
    id: 2,
    category: "materials",
    icon: <LuRecycle />,
    question: "What items can be included in Household Recyclables?",
    answer:
      "We collect paper, clean cardboard, plastic bottles (PET, HDPE), aluminum cans, and glass jars. Please ensure all containers are rinsed of food residue and flattened whenever possible to save space.",
  },
  {
    id: 3,
    category: "materials",
    icon: <LuSmartphone />,
    question: "How do I dispose of old electronics and batteries safely?",
    answer:
      "Batteries, old phones, laptops, and cables must not be thrown in general waste bins. You can book an E-Waste Pickup via our portal. For hazardous Li-ion batteries, ensure terminals are covered with tape to avoid short circuits.",
  },
  {
    id: 4,
    category: "pricing",
    icon: <LuCoins />,
    question: "Are recyclable collections free?",
    answer:
      "Yes! Doorstep pickup for dry recyclables (paper, cardboard, plastics, glass) is completely free of charge. In fact, for sorted bulk dry recyclables over 15kg, you earn Green Credits redeemable for gift cards or community utility discounts.",
  },
  {
    id: 5,
    category: "scheduling",
    icon: <LuClock />,
    question: "What time will the collection vehicle arrive?",
    answer:
      "Our standard residential collection window is between 7:30 AM and 11:30 AM. On the morning of pickup, you will receive an automated alert with the driver's name, vehicle number, and an estimated 30-minute arrival window.",
  },
  {
    id: 6,
    category: "commercial",
    icon: <LuBuilding2 />,
    question: "Do you offer solutions for commercial buildings or societies?",
    answer:
      "Yes, we partner with apartment resident welfare associations (RWAs), IT parks, restaurants, and retail spaces. We install color-coded segregation bins, conduct staff waste audits, and issue monthly ESG compliance certificates.",
  },
  {
    id: 7,
    category: "pricing",
    icon: <LuTruck />,
    question: "How does bulk furniture or mattress pickup work?",
    answer:
      "Bulk waste requires special handling and dedicated loaders. Flat-rate pricing starts at $45 depending on the item volume. Two trained loaders will enter and safely remove the items without damage to walls or hallways.",
  },
  {
    id: 8,
    category: "materials",
    icon: <LuLeaf />,
    question: "What happens to the waste after it is picked up?",
    answer:
      "GreenCycle operates on a strict Zero-Landfill philosophy. 100% of organic waste goes to aerobic municipal composting units. Recyclables are sorted by optical infrared and hand-sorters before being baled and supplied directly to certified re-processors.",
  },
];

export const pillars = [
  {
    icon: <LuRecycle />,
    title: "Circular Economy First",
    titlePart1: "Circular Economy",
    titlePart2: "First",
    percentage: 94,
    statLabel: "Materials",
    statSubtext: "Reused & Remanufactured",
    description:
      "Every scrap collected is treated as a resource and up to 94% of materials are redirected to remanufacturing pipelines.",
  },
  {
    icon: <LuLeaf />,
    title: "Zero-Landfill Commitment",
    titlePart1: "Zero-Landfill",
    titlePart2: "Commitment",
    percentage: 100,
    statLabel: "Diversion",
    statSubtext: "From Municipal Dumps",
    description:
      "Our zero unmanaged waste standard prevents dangerous methane emissions and protects local groundwater tables.",
  },
  {
    icon: <LuShieldCheck />,
    title: "Verified Traceability",
    titlePart1: "Verified",
    titlePart2: "Traceability",
    percentage: 99,
    statLabel: "Manifests",
    statSubtext: "End-to-End Logged",
    description:
      "Digital manifests log every pickup from your doorstep through certified sorting hubs and green re-processors.",
  },
  {
    icon: <LuUsers />,
    title: "Community Dignity",
    titlePart1: "Community",
    titlePart2: "Dignity",
    percentage: 100,
    statLabel: "Fair Wages",
    statSubtext: "Formalized Workers",
    description:
      "Providing safe equipment, health insurance, and formalized living wages to 450+ sanitation workers.",
  },
];

export const estimateRates = {
  recyclables: {
    base: "Free Pickup",
    credit: "Earn green points",
    turnaround: "Within 24h",
  },
  organic: {
    base: "$12 / bin",
    credit: "Zero-landfill certified",
    turnaround: "Every morning",
  },
  ewaste: {
    base: "$15 flat",
    credit: "Certificate of destruction",
    turnaround: "Scheduled slot",
  },
  bulk: {
    base: "$45 - $90",
    credit: "2 movers included",
    turnaround: "Within 48h",
  },
  hazardous: {
    base: "$35 base fee",
    credit: "EPA compliant handling",
    turnaround: "Special slot",
  },
  commercial: {
    base: "Custom Quote",
    credit: "Monthly invoicing",
    turnaround: "Daily/Weekly",
  },
};

export const processSteps = [
  {
    step: 1,
    title: "Book Your Window",
    description:
      "Select your waste category and choose a pickup date & time that suits your schedule. Upload photos if you have bulk items.",
  },
  {
    step: 2,
    title: "Doorstep Collection",
    description:
      "Our background-verified drivers arrive with electric collection vans, weigh the waste digitally, and give you an instant receipt.",
  },
  {
    step: 3,
    title: "Certified Recycling",
    description:
      "Materials are transported to local recycling and composting plants, diverting 90%+ waste away from polluting landfills.",
  },
];
