// src/pages/home/hooks/useEstimator.js

import { useState } from "react";
import { estimateRates } from "../data/homeData";

export function useEstimator() {
  const [wasteType, setWasteType] = useState("recyclables");
  const [pincode, setPincode] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [approxQuantity, setApproxQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("kg");
  const [timeSlot, setTimeSlot] = useState("Morning (8:00 AM - 11:30 AM)");
  const [estimateResult, setEstimateResult] = useState(null);

  const handleEstimate = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!pincode.trim() || !pickupDate) {
      alert("Please enter your 6-digit Pincode/Area and preferred pickup date.");
      return;
    }

    const rateInfo = estimateRates[wasteType] || estimateRates.recyclables;
    const qtyNum = parseFloat(approxQuantity) || 10;
    
    // Dynamic calculation based on quantity and waste type
    let calculatedRate = rateInfo.base;
    let earnedPoints = Math.round(qtyNum * 5);

    if (wasteType === "recyclables") {
      calculatedRate = "Free Pickup & Cashback";
    } else if (wasteType === "organic") {
      calculatedRate = qtyNum > 20 ? `$${Math.round(qtyNum * 0.8)} total` : "$12 / bin";
    } else if (wasteType === "bulk") {
      calculatedRate = qtyNum > 30 ? `$${Math.round(45 + (qtyNum - 30) * 0.5)} (Movers Included)` : "$45 Flat Rate";
    }

    setEstimateResult({
      ...rateInfo,
      calculatedRate,
      quantity: `${approxQuantity || "10"} ${quantityUnit}`,
      earnedPoints: `${earnedPoints} Green Credits`,
      pincode: pincode.trim(),
      slot: timeSlot,
      date: pickupDate,
    });
  };

  return {
    wasteType,
    setWasteType,
    pincode,
    setPincode,
    pickupDate,
    setPickupDate,
    approxQuantity,
    setApproxQuantity,
    quantityUnit,
    setQuantityUnit,
    timeSlot,
    setTimeSlot,
    estimateResult,
    handleEstimate,
  };
}

