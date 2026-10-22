// src/pages/admin/services/adminFleetStore.js

const FLEET_STORAGE_KEY = "greencycle_admin_fleet_v1";

export const INITIAL_DRIVERS = [
  {
    id: "DRV-101",
    name: "Ramesh Kumar",
    phone: "+91 98111 22334",
    email: "ramesh.k@greencycle.eco",
    vehicleType: "Electric Van",
    vehicleReg: "EV Van #12 - DL 1V 4021",
    zone: "Sector 14 Central",
    status: "En Route",
    todayPickups: 6,
    completedPickups: 4,
    rating: 4.9,
    batteryLevel: 78,
    avatarColor: "#16a34a",
  },
  {
    id: "DRV-102",
    name: "Anil Rawat",
    phone: "+91 99888 77665",
    email: "anil.rawat@greencycle.eco",
    vehicleType: "Hazardous / E-Waste Specialist",
    vehicleReg: "E-Waste Specialist Van #04 - DL 1V 8820",
    zone: "Sector 18 Cyber Hub",
    status: "Available",
    todayPickups: 3,
    completedPickups: 3,
    rating: 4.8,
    batteryLevel: 92,
    avatarColor: "#0284c7",
  },
  {
    id: "DRV-103",
    name: "Suresh Yadav",
    phone: "+91 97222 44331",
    email: "suresh.y@greencycle.eco",
    vehicleType: "Heavy Flatbed Truck",
    vehicleReg: "Bulk Flatbed #02 - DL 1L 9901",
    zone: "Sector 22 North",
    status: "En Route",
    todayPickups: 4,
    completedPickups: 2,
    rating: 4.7,
    batteryLevel: 64,
    avatarColor: "#d97706",
  },
  {
    id: "DRV-104",
    name: "Prakash Jha",
    phone: "+91 98333 11889",
    email: "prakash.j@greencycle.eco",
    vehicleType: "Organic Compactor EV",
    vehicleReg: "Compactor Van #07 - DL 1V 3312",
    zone: "Sector 9 South",
    status: "On Break",
    todayPickups: 5,
    completedPickups: 5,
    rating: 4.9,
    batteryLevel: 45,
    avatarColor: "#9333ea",
  },
  {
    id: "DRV-105",
    name: "Vikas Malhotra",
    phone: "+91 98777 66221",
    email: "vikas.m@greencycle.eco",
    vehicleType: "Standard Recyclables Van",
    vehicleReg: "EV Van #09 - DL 1V 5543",
    zone: "Industrial Area East",
    status: "Off Duty",
    todayPickups: 0,
    completedPickups: 0,
    rating: 4.6,
    batteryLevel: 100,
    avatarColor: "#64748b",
  },
];

export const adminFleetStore = {
  getAll: () => {
    try {
      const data = localStorage.getItem(FLEET_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(INITIAL_DRIVERS));
        return INITIAL_DRIVERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DRIVERS;
    }
  },

  save: (drivers) => {
    try {
      localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(drivers));
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("greencycle_fleet_updated", { detail: drivers })
        );
      }
    } catch (e) {
      console.error("Failed to save fleet drivers", e);
    }
  },

  addDriver: (driverData) => {
    const list = adminFleetStore.getAll();
    const newId = `DRV-${Math.floor(100 + Math.random() * 900)}`;
    const colors = ["#16a34a", "#0284c7", "#d97706", "#9333ea", "#0d9488", "#e11d48"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newDriver = {
      id: newId,
      name: driverData.name,
      phone: driverData.phone,
      email: driverData.email || `${driverData.name.toLowerCase().replace(/\s+/g, ".")}@greencycle.eco`,
      vehicleType: driverData.vehicleType || "Electric Van",
      vehicleReg: driverData.vehicleReg,
      zone: driverData.zone || "Sector 14 Central",
      status: driverData.status || "Available",
      todayPickups: 0,
      completedPickups: 0,
      rating: 5.0,
      batteryLevel: 100,
      avatarColor: randomColor,
    };

    const updated = [newDriver, ...list];
    adminFleetStore.save(updated);
    return newDriver;
  },

  updateDriver: (id, updates) => {
    const list = adminFleetStore.getAll();
    const updated = list.map((d) => (d.id === id ? { ...d, ...updates } : d));
    adminFleetStore.save(updated);
    return updated.find((d) => d.id === id);
  },

  deleteDriver: (id) => {
    const list = adminFleetStore.getAll();
    const updated = list.filter((d) => d.id !== id);
    adminFleetStore.save(updated);
  },

  reset: () => {
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(INITIAL_DRIVERS));
    adminFleetStore.save(INITIAL_DRIVERS);
    return INITIAL_DRIVERS;
  },
};
