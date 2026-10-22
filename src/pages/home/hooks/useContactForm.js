// src/pages/home/hooks/useContactForm.js

import { useState } from "react";

export function useContactForm() {
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name.trim() || !contactData.email.trim() || !contactData.phone.trim()) {
      setContactStatus("Please complete all required fields.");
      return;
    }
    setContactSubmitted(true);
    setContactStatus("Thank you! Our operations supervisor has received your inquiry and will reach out within 15 minutes.");
  };

  return {
    contactData,
    setContactData,
    contactSubmitted,
    setContactSubmitted,
    contactStatus,
    handleContactSubmit,
  };
}
