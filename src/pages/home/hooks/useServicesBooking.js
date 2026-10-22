// src/pages/home/hooks/useServicesBooking.js

import { useState } from "react";
import { servicesList, wasteDatabase } from "../data/homeData";

export function useServicesBooking() {
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

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedService(null);
      setBookingData({ name: "", phone: "", address: "", date: "", notes: "" });
    }, 2500);
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

  return {
    activeServiceTab,
    setActiveServiceTab,
    searchCheckerQuery,
    setSearchCheckerQuery,
    selectedService,
    setSelectedService,
    bookingSuccess,
    bookingData,
    setBookingData,
    handleBookingSubmit,
    filteredServices,
    filteredCheckerItems,
  };
}
