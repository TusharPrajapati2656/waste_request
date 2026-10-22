// src/pages/home/Home.jsx

import { useEstimator } from "./hooks/useEstimator";
import { useServicesBooking } from "./hooks/useServicesBooking";
import { useFaq } from "./hooks/useFaq";
import { useContactForm } from "./hooks/useContactForm";

import HeroSection from "./components/HeroSection";
import CategoriesSection from "./components/CategoriesSection";
import ProcessSection from "./components/ProcessSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import CtaSection from "./components/CtaSection";

import { servicesList } from "./data/homeData";
import "./Home.css";

export default function Home() {
  const estimator = useEstimator();
  const servicesBooking = useServicesBooking();
  const faq = useFaq();
  const contact = useContactForm();

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBookingFromEstimate = (
    wasteType,
    pickupDate,
    pincode,
    approxQuantity,
    quantityUnit,
    timeSlot
  ) => {
    const matchedService =
      servicesList.find((srv) => srv.category === wasteType) || servicesList[0];
    servicesBooking.setSelectedService(matchedService);
    servicesBooking.setBookingData((prev) => ({
      ...prev,
      date: pickupDate || prev.date,
      pincode: pincode || prev.pincode,
      address: prev.address || (pincode ? `Area Pincode: ${pincode}` : ""),
      approxQuantity: approxQuantity || prev.approxQuantity || "10",
      quantityUnit: quantityUnit || prev.quantityUnit || "kg",
      timeSlot: timeSlot || prev.timeSlot || "Morning (8:00 AM - 11:30 AM)",
      volume: approxQuantity
        ? `${approxQuantity} ${quantityUnit || "kg"}`
        : prev.volume,
    }));
  };

  return (
    <div className="home-page">
      <HeroSection
        estimator={estimator}
        onOpenBooking={handleOpenBookingFromEstimate}
        onScrollTo={scrollToAnchor}
      />
      <CategoriesSection />
      <ProcessSection />
      <ServicesSection servicesBooking={servicesBooking} />
      <AboutSection />
      <FaqSection faq={faq} onScrollTo={scrollToAnchor} />
      <ContactSection contact={contact} />
      <CtaSection onScrollTo={scrollToAnchor} />
    </div>
  );
}
