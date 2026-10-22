// src/common/dropdown/CustomDropdown.jsx

import { useState, useRef, useEffect } from "react";
import { LuChevronDown, LuCheck } from "react-icons/lu";
import "./CustomDropdown.css";

/**
 * CustomDropdown - Universal accessible, eco-modern custom dropdown component
 *
 * @param {Array<string|number|Object>} options - Array of options { value, label, description?, icon? }
 * @param {string|number} value - Currently selected value
 * @param {Function} onChange - Callback invoked on selection: passes { target: { value, name } }
 * @param {string} [placeholder="Select an option"] - Placeholder text
 * @param {React.ReactNode} [icon] - Leading icon for the dropdown trigger
 * @param {string} [name] - Form field name
 * @param {string} [id] - Element ID
 * @param {boolean} [disabled=false] - Disabled state
 * @param {string} [className=""] - Additional class names
 * @param {string} [variant="default"] - Variant: 'default', 'hero', 'filter', 'embedded'
 * @param {string} [size="md"] - Size: 'sm', 'md', 'lg'
 * @param {string} [align="left"] - Alignment of menu: 'left', 'right'
 * @param {string} [ariaLabel] - Accessibility label
 */
export default function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  icon = null,
  name = "",
  id = "",
  disabled = false,
  className = "",
  variant = "default",
  size = "md",
  align = "left",
  ariaLabel,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Normalize options into a standard { value, label, description, icon } structure
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "string" || typeof opt === "number") {
      return {
        value: String(opt),
        label: String(opt),
        description: null,
        icon: null,
      };
    }
    return {
      value: String(opt.value),
      label: opt.label !== undefined ? String(opt.label) : String(opt.value),
      description: opt.description || null,
      icon: opt.icon || null,
    };
  });

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  ) || null;

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  // Handle option selection
  const handleSelect = (option) => {
    if (disabled) return;
    setIsOpen(false);

    if (onChange) {
      const syntheticEvent = {
        target: { value: option.value, name: name || id },
        currentTarget: { value: option.value, name: name || id },
        value: option.value,
      };
      onChange(syntheticEvent, option.value);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
        handleSelect(normalizedOptions[highlightedIndex]);
      } else {
        setIsOpen((prev) => !prev);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prev) =>
          prev < normalizedOptions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(normalizedOptions.length - 1);
      } else {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : normalizedOptions.length - 1
        );
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Tab") {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  const variantClass = variant !== "default" ? `variant-${variant}` : "";
  const sizeClass = size !== "md" ? `size-${size}` : "";

  return (
    <div
      ref={dropdownRef}
      className={`custom-dropdown ${variantClass} ${sizeClass} ${isOpen ? "is-open" : ""} ${
        disabled ? "is-disabled" : ""
      } ${className}`.trim()}
      id={id ? `${id}-container` : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        id={id}
        name={name}
        className="custom-dropdown-trigger"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
      >
        <div className="custom-dropdown-selected-wrap">
          {/* Display leading icon: either custom prop or option's icon */}
          {(icon || selectedOption?.icon) && (
            <span className="custom-dropdown-lead-icon" aria-hidden="true">
              {selectedOption?.icon || icon}
            </span>
          )}

          <div className="custom-dropdown-value">
            {selectedOption ? (
              <>
                <span className="custom-dropdown-label-text">
                  {selectedOption.label}
                </span>
                {selectedOption.description && (
                  <span className="custom-dropdown-subtext">
                    {selectedOption.description}
                  </span>
                )}
              </>
            ) : (
              <span className="custom-dropdown-placeholder">{placeholder}</span>
            )}
          </div>
        </div>

        <span className="custom-dropdown-chevron" aria-hidden="true">
          <LuChevronDown />
        </span>
      </button>

      {isOpen && (
        <ul
          className={`custom-dropdown-menu ${
            align === "right" ? "menu-align-right" : ""
          }`}
          role="listbox"
          tabIndex={-1}
          aria-label={ariaLabel || placeholder}
        >
          {normalizedOptions.map((opt, index) => {
            const isSelected = selectedOption && opt.value === selectedOption.value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={opt.value}
                id={`${id || "dropdown"}-opt-${opt.value}`}
                role="option"
                aria-selected={isSelected}
                className={`custom-dropdown-item ${
                  isSelected ? "is-selected" : ""
                } ${isHighlighted ? "is-highlighted" : ""}`}
                onClick={() => handleSelect(opt)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="custom-dropdown-item-left">
                  {opt.icon && (
                    <span className="custom-dropdown-item-icon" aria-hidden="true">
                      {opt.icon}
                    </span>
                  )}
                  <div className="custom-dropdown-item-labels">
                    <span className="custom-dropdown-item-title">{opt.label}</span>
                    {opt.description && (
                      <span className="custom-dropdown-item-desc">
                        {opt.description}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <span className="custom-dropdown-item-check" aria-hidden="true">
                    <LuCheck />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
