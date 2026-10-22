// src/pages/admin/services/adminAuditStore.js

const AUDIT_STORAGE_KEY = "greencycle_admin_audit_logs_v1";

const INITIAL_LOGS = [
  {
    id: "LOG-901",
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
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
