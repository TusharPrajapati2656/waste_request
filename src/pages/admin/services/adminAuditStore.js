// src/pages/admin/services/adminAuditStore.js

const AUDIT_STORAGE_KEY = "greencycle_admin_audit_logs_v3";

const INITIAL_LOGS = [
  {
    id: "LOG-6570",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    action: "BULK_DELETE",
    operator: "Tushar Kumar",
    target: "4 items",
    details: "Bulk deleted requests: GC-84920, GC-84712, GC-83905, GC-85102",
    severity: "danger",
  },
  {
    id: "LOG-901",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    action: "STATUS_UPDATE",
    operator: "Admin (Dispatch)",
    target: "GC-84920",
    details: "Marked status as Out for Collection. Dispatched driver Ramesh Kumar (EV Van #12).",
    severity: "info",
  },
  {
    id: "LOG-902",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    action: "DRIVER_ASSIGN",
    operator: "Admin (Dispatch)",
    target: "GC-84712",
    details: "Assigned heavy flatbed truck crew Suresh Yadav for bulk mattress pickup in Sector 22.",
    severity: "info",
  },
  {
    id: "LOG-903",
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    action: "CERTIFICATE_ISSUED",
    operator: "Admin (Compliance)",
    target: "GC-83905",
    details: "Generated official green recycling manifest #EW-2026-904. Diverted 14.2 kg e-waste.",
    severity: "success",
  },
  {
    id: "LOG-904",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    action: "NEW_CITIZEN_BOOKING",
    operator: "Citizen Portal",
    target: "GC-85102",
    details: "New online pickup logged by citizen Pooja Banerjee for Organic Waste (8 kg).",
    severity: "info",
  },
  {
    id: "LOG-905",
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    action: "FLEET_STATUS",
    operator: "System Telematics",
    target: "DRV-101",
    details: "Electric Van #12 battery reported at 78%. Geo-fence Sector 14 checked.",
    severity: "info",
  },
  {
    id: "LOG-906",
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    action: "STATUS_UPDATE",
    operator: "Admin (Dispatch)",
    target: "GC-84109",
    details: "Marked status as Verified by depot inspection team. Total weight audited at 24.5 kg.",
    severity: "info",
  },
  {
    id: "LOG-907",
    timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    action: "FLEET_STATUS",
    operator: "System Telematics",
    target: "DRV-104",
    details: "Battery level checked at 92%. Assigned optimal route for South Delhi corridors.",
    severity: "info",
  },
  {
    id: "LOG-908",
    timestamp: new Date(Date.now() - 1000 * 60 * 490).toISOString(),
    action: "NEW_CITIZEN_BOOKING",
    operator: "Citizen Portal",
    target: "GC-84220",
    details: "Commercial electronic pickup scheduled for TechHub Tower 3 (55 kg).",
    severity: "info",
  },
  {
    id: "LOG-909",
    timestamp: new Date(Date.now() - 1000 * 60 * 550).toISOString(),
    action: "CERTIFICATE_ISSUED",
    operator: "Admin (Compliance)",
    target: "GC-83890",
    details: "Issued recycling certificate #GC-CR-8821 for 180 kg segregated dry plastics.",
    severity: "success",
  },
  {
    id: "LOG-910",
    timestamp: new Date(Date.now() - 1000 * 60 * 620).toISOString(),
    action: "DRIVER_ASSIGN",
    operator: "Admin (Dispatch)",
    target: "GC-84011",
    details: "Assigned Amit Verma for medical and hazardous safety waste collection.",
    severity: "info",
  },
  {
    id: "LOG-911",
    timestamp: new Date(Date.now() - 1000 * 60 * 700).toISOString(),
    action: "STATUS_UPDATE",
    operator: "Admin (Dispatch)",
    target: "GC-83995",
    details: "Completed drop-off at Sector 14 Materials Recovery Facility.",
    severity: "info",
  },
  {
    id: "LOG-912",
    timestamp: new Date(Date.now() - 1000 * 60 * 780).toISOString(),
    action: "NEW_CITIZEN_BOOKING",
    operator: "Citizen Portal",
    target: "GC-83944",
    details: "New online pickup logged by citizen Vikram Malhotra for Dry Recyclables (12 kg).",
    severity: "info",
  },
];

export const adminAuditStore = {
  getAll: () => {
    try {
      const data = localStorage.getItem(AUDIT_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(INITIAL_LOGS));
        return INITIAL_LOGS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LOGS;
    }
  },

  log: (action, target, details, operator = "Super Admin", severity = "info") => {
    const list = adminAuditStore.getAll();
    const newLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      action,
      operator,
      target,
      details,
      severity,
    };
    const updated = [newLog, ...list.slice(0, 99)]; // Keep latest 100
    try {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("greencycle_audit_updated", { detail: updated })
        );
      }
    } catch (e) {
      console.error("Failed to write audit log", e);
    }
    return newLog;
  },

  clear: () => {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify([]));
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("greencycle_audit_updated", { detail: [] })
      );
    }
  },

  reset: () => {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(INITIAL_LOGS));
    return INITIAL_LOGS;
  },
};
