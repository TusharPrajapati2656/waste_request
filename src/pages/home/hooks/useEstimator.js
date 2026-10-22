// src/pages/home/hooks/useEstimator.js

import { useState } from "react";
import { estimateRates } from "../data/homeData";

export function useEstimator() {
  const [wasteType, setWasteType] = useState("recyclables");
  const [pincode, setPincode] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [estimateResult, setEstimateResult] = useState(null);

  const handleEstimate = (e) => {
    e.preventDefault();
    if (!pincode.trim() || !pickupDate) {
      alert("Please provide your pickup location (Pincode/Area) and preferred date.");
      return;
    }

    setEstimateResult(estimateRates[wasteType] || estimateRates.recyclables);
  };

  return {
    wasteType,
    setWasteType,
    pincode,
    setPincode,
    pickupDate,
    setPickupDate,
    estimateResult,
    handleEstimate,
  };
}
