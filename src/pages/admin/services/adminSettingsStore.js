// src/pages/admin/services/adminSettingsStore.js

const SETTINGS_STORAGE_KEY = "greencycle_admin_settings_v1";

const DEFAULT_SETTINGS = {
  hubName: "GreenCycle Regional Recovery Depot - Sector 14",
  hubCode: "DEL-NCR-014",
  headOperator: "Tushar Kumar (Regional Lead)",
  dispatchHotline: "+91 11 4988 2200",
  emergencyPhone: "+91 99999 00112",
  operatingHours: "07:30 AM - 07:00 PM (Mon - Sun)",
  autoAssignDrivers: true,
  activeZones: [
    { id: "Z-14", name: "Sector 14 Central", pincodes: "110001, 110014", active: true },
    { id: "Z-22", name: "Sector 22 North", pincodes: "110022, 110025", active: true },
    { id: "Z-18", name: "Sector 18 Cyber Hub", pincodes: "110018, 110019", active: true },
    { id: "Z-09", name: "Sector 9 South", pincodes: "110009, 110010", active: true },
    { id: "Z-IND", name: "Industrial Area East", pincodes: "110092, 110093", active: true },
  ],
  emergencyNotice: {
    enabled: false,
    text: "Heavy rainfall alert across Sector 14 routes. Dispatches may experience 20-30 minute delays.",
    type: "warning", // warning | alert | info
  },
  categoriesConfig: [
    {
      id: "recyclables",
      name: "Household Recyclables",
      creditRewardPerKg: 5.0,
      active: true,
      minWeightKg: 2,
      vehicleRequired: "Electric Van",
      color: "#16794b",
    },
    {
      id: "organic",
      name: "Organic / Kitchen Waste",
      creditRewardPerKg: 3.5,
      active: true,
      minWeightKg: 1,
      vehicleRequired: "Organic Compactor EV",
      color: "#15803d",
    },
    {
      id: "ewaste",
      name: "E-Waste & Electronics",
      creditRewardPerKg: 25.0,
      active: true,
      minWeightKg: 1,
      vehicleRequired: "Hazardous / E-Waste Specialist",
      color: "#0284c7",
    },
    {
      id: "bulk",
      name: "On-Demand Bulk Waste",
      creditRewardPerKg: 0.0,
      active: true,
      minWeightKg: 15,
      vehicleRequired: "Heavy Flatbed Truck",
      color: "#d97706",
    },
    {
      id: "hazardous",
      name: "Hazardous & Chemicals",
      creditRewardPerKg: 0.0,
      active: true,
      minWeightKg: 1,
      vehicleRequired: "Hazardous Certified EV",
      color: "#dc2626",
    },
    {
      id: "commercial",
      name: "Commercial & Business",
      creditRewardPerKg: 8.0,
      active: true,
      minWeightKg: 50,
      vehicleRequired: "Dedicated Cargo Fleet",
      color: "#7c3aed",
    },
  ],
};

export const adminSettingsStore = {
  get: () => {
    try {
      const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  update: (partial) => {
    const current = adminSettingsStore.get();
    const updated = { ...current, ...partial };
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("greencycle_settings_updated", { detail: updated })
        );
      }
    } catch (e) {
      console.error("Failed to save settings", e);
    }
    return updated;
  },

  updateCategory: (categoryId, updates) => {
    const current = adminSettingsStore.get();
    const updatedCategories = current.categoriesConfig.map((cat) =>
      cat.id === categoryId ? { ...cat, ...updates } : cat
    );
    return adminSettingsStore.update({ categoriesConfig: updatedCategories });
  },

  reset: () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  },
};
