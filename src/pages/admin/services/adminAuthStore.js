// src/pages/admin/services/adminAuthStore.js

const AUTH_STORAGE_KEY = "greencycle_admin_session_v1";

const DEFAULT_ADMIN = {
  id: "ADM-001",
  name: "Tushar Kumar",
  role: "Chief Operations Director",
  email: "admin@greencycle.eco",
  hub: "Central Depot Delhi-014",
  avatar: "TK",
};

export const adminAuthStore = {
  getUser: () => {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data);
      if (parsed && parsed.name === "Dr. Siddharth Verma") {
        const updated = { ...parsed, name: "Tushar Kumar", avatar: "TK" };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
      return parsed;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!adminAuthStore.getUser();
  },

  login: (email, password) => {
    // Demo credential validation
    const cleanEmail = email.trim().toLowerCase();
    if (
      (cleanEmail === "admin@greencycle.eco" && password === "admin123") ||
      (cleanEmail === "admin" && password === "admin")
    ) {
      const sessionUser = {
        ...DEFAULT_ADMIN,
        email: cleanEmail,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    }
    return {
      success: false,
      error: "Invalid email or password. Use demo login or: admin@greencycle.eco / admin123",
    };
  },

  quickDemoLogin: () => {
    const sessionUser = {
      ...DEFAULT_ADMIN,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
