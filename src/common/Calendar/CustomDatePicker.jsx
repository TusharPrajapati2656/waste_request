// src/common/Calendar/CustomDatePicker.jsx

import { useState, useRef, useEffect } from "react";
import { LuCalendar, LuChevronDown, LuX } from "react-icons/lu";
import Calendar from "./Calendar";
import { formatDisplayDate } from "../../utils/dateHelpers";
import "./CustomDatePicker.css";

/**
 * CustomDatePicker - Accessible, eco-styled date picker powered by custom Calendar
 */
export default function CustomDatePicker({
  value,
  onChange,
  minDate,
  placeholder = "Select pickup date",
  name = "",
  id = "",
  required = false,
  disabled = false,
  singleMonth = true,
  variant = "default",
  className = "",
  ariaLabel,
  title = "Select pickup date",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleDateSelect = (date) => {
    setIsOpen(false);
    if (onChange) {
      const syntheticEvent = {
        target: { value: date, name: name || id },
        currentTarget: { value: date, name: name || id },
        value: date,
      };
      onChange(syntheticEvent, date);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onChange) {
      const syntheticEvent = {
        target: { value: "", name: name || id },
        currentTarget: { value: "", name: name || id },
        value: "",
      };
      onChange(syntheticEvent, "");
    }
  };

  const displayValue = value ? formatDisplayDate(value) : "";

  return (
    <div
      ref={containerRef}
      className={`custom-datepicker-wrap variant-${variant} ${isOpen ? "is-open" : ""} ${disabled ? "is-disabled" : ""} ${className}`}
    >
      <button
        id={id}
        type="button"
        className="custom-datepicker-trigger"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        disabled={disabled}
      >
        <div className="datepicker-icon-badge" aria-hidden="true">
          <LuCalendar />
        </div>

        <span className={`datepicker-value ${!value ? "is-placeholder" : ""}`}>
          {displayValue || placeholder}
        </span>

        {value && !disabled && (
          <span
            className="datepicker-clear-btn"
            onClick={handleClear}
            title="Clear date"
            aria-label="Clear date"
            role="button"
            tabIndex={0}
          >
            <LuX />
          </span>
        )}

        <LuChevronDown className="datepicker-chevron" aria-hidden="true" />
      </button>

      {/* Hidden input to satisfy form required validations if needed */}
      <input
        type="text"
        name={name || id}
        value={value || ""}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        className="custom-datepicker-native-hidden"
        onChange={() => {}}
      />

      {isOpen && (
        <div className="custom-datepicker-popover" role="dialog" aria-modal="true">
          <Calendar
            selectedDate={value}
            onDateSelect={handleDateSelect}
            minDate={minDate}
            singleMonth={singleMonth}
            title={title}
          />
        </div>
      )}
    </div>
  );
}
