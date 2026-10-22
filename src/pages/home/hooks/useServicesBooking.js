// src/pages/home/hooks/useServicesBooking.js

import { useState } from "react";
import { servicesList, wasteDatabase } from "../data/homeData";
import { requestStore } from "../../../services/requestStore";

export function useServicesBooking() {
  const [activeServiceTab, setActiveServiceTab] = useState("all");
  const [searchCheckerQuery, setSearchCheckerQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdRequestId, setCreatedRequestId] = useState("");
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    date: "",
    timeSlot: "Morning (8:00 AM - 11:30 AM)",
    approxQuantity: "",
    quantityUnit: "kg",
    volume: "2-3 bags / items",
    notes: "",
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const created = requestStore.create({
      name: bookingData.name,
      phone: bookingData.phone,
      email: bookingData.email,
      address: bookingData.address,
      pincode: bookingData.pincode,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      wasteType: selectedService ? selectedService.title : "Household Recyclables",
      category: selectedService ? selectedService.category : "recyclables",
      approxQuantity: bookingData.approxQuantity || "",
      quantityUnit: bookingData.quantityUnit || "kg",
      estimatedWeight: bookingData.approxQuantity
        ? `${bookingData.approxQuantity} ${bookingData.quantityUnit || "kg"}`
        : bookingData.volume || "Not specified",
      volume: bookingData.volume || (bookingData.approxQuantity ? `${bookingData.approxQuantity} ${bookingData.quantityUnit || "kg"}` : "Standard volume"),
      notes: bookingData.notes,
    });

    setCreatedRequestId(created.id);
    setBookingSuccess(true);
  };

  const resetBookingModal = () => {
    setSelectedService(null);
    setBookingSuccess(false);
    setCreatedRequestId("");
    setBookingData({
      name: "",
      phone: "",
      email: "",
      address: "",
      pincode: "",
      date: "",
      timeSlot: "Morning (8:00 AM - 11:30 AM)",
      approxQuantity: "",
      quantityUnit: "kg",
      volume: "2-3 bags / items",
      notes: "",
    });
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
    createdRequestId,
    resetBookingModal,
    bookingData,
    setBookingData,
    handleBookingSubmit,
    filteredServices,
    filteredCheckerItems,
  };
}
