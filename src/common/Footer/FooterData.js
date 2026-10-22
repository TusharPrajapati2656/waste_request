/* src/components/Footer/FooterData.js */

export const footerNavigation = [
  { label: "Home", path: "#home", id: "home" },
  { label: "Our Services", path: "#services", id: "services" },
  { label: "Frequently Asked Questions", path: "#faq", id: "faq" },
  { label: "About Us", path: "#about", id: "about" },
  { label: "Contact Us", path: "#contact", id: "contact" },
];

export const footerServices = [
  { label: "Residential Waste Pickup", path: "#services", id: "services" },
  { label: "Commercial Waste Collection", path: "#services", id: "services" },
  { label: "Recyclable Waste Sorting", path: "#services", id: "services" },
  { label: "Bulk Waste Pickup", path: "#services", id: "services" },
  { label: "Track Pickup Requests", path: "/my-requests" },
  { label: "Organizer Dispatch Hub", path: "/organizer" },
];

export const footerContact = {
  email: "support@greencycle.example",
  phone: "+91 00000 00000",
  address: "GreenCycle Eco-Park, Sector 18, Clean City Hub",
};

export const footerSocialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/",
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/",
  },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Admin Operations Portal", path: "/admin" },
];
