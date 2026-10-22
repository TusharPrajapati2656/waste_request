// src/utils/dateHelpers.js

/**
 * Converts a Date object or date string into YYYY-MM-DD format
 * @param {Date|string|number} date 
 * @returns {string} YYYY-MM-DD
 */
export const toISODateString = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Formats a YYYY-MM-DD date string into a friendly human-readable format
 * e.g. "Thu, Oct 24, 2026"
 */
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
