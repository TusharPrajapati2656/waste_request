// src/pages/admin/components/AdminRequestModal.jsx

import { useState } from "react";
import { LuX, LuSave } from "react-icons/lu";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";
import CustomDatePicker from "../../../common/Calendar/CustomDatePicker";

const CATEGORY_FALLBACK_OPTIONS = [
  { value: "recyclables", label: "Household Recyclables" },
  { value: "organic", label: "Organic / Kitchen Waste" },
  { value: "ewaste", label: "E-Waste & Electronics" },
  { value: "bulk", label: "On-Demand Bulk Waste" },
  { value: "hazardous", label: "Hazardous & Chemicals" },
  { value: "commercial", label: "Commercial & Business" },
];

const UNIT_OPTIONS = [
  { value: "kg", label: "kg" },
  { value: "bags", label: "bags" },
  { value: "items", label: "items" },
  { value: "tons", label: "tons" },
];

const TIME_SLOT_OPTIONS = [
  { value: "Morning (8:00 AM - 11:30 AM)", label: "Morning (8:00 AM - 11:30 AM)" },
  { value: "Afternoon (1:00 PM - 4:00 PM)", label: "Afternoon (1:00 PM - 4:00 PM)" },
  { value: "Evening (5:00 PM - 7:30 PM)", label: "Evening (5:00 PM - 7:30 PM)" },
];

const STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted (Awaiting Review)" },
  { value: "confirmed", label: "Confirmed (Depot Approved)" },
  { value: "assigned", label: "Assigned (Driver Allocated)" },
  { value: "in_transit", label: "Out for Collection" },
  { value: "collected", label: "Collected & Weighed" },
  { value: "completed", label: "Completed & Certified" },
  { value: "cancelled", label: "Cancelled" },
];

function getInitialFormData(initialData) {
  if (initialData) {
    return {
      name: initialData.name || "",
      phone: initialData.phone || "",
      email: initialData.email || "",
      address: initialData.address || "",
      pincode: initialData.pincode || "110001",
      wasteType: initialData.wasteType || "Household Recyclables",
      category: initialData.category || "recyclables",
      approxQuantity: initialData.approxQuantity || (initialData.estimatedWeight ? String(parseInt(initialData.estimatedWeight) || "10") : "10"),
      quantityUnit: initialData.quantityUnit || "kg",
      volume: initialData.volume || "",
      estimatedWeight: initialData.estimatedWeight || "",
      measuredWeight: initialData.measuredWeight || "",
      date: initialData.date || new Date().toISOString().split("T")[0],
      timeSlot: initialData.timeSlot || "Morning (8:00 AM - 11:30 AM)",
      status: initialData.status || "submitted",
      driver: initialData.driver || "Unassigned",
      driverPhone: initialData.driverPhone || "",
      organizerNotes: initialData.organizerNotes || "",
      notes: initialData.notes || "",
    };
  }
  return {
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "110001",
    wasteType: "Household Recyclables",
    category: "recyclables",
    approxQuantity: "10",
    quantityUnit: "kg",
    volume: "2 bags sorted plastic & dry waste",
    estimatedWeight: "10 kg",
    measuredWeight: "",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "Morning (8:00 AM - 11:30 AM)",
    status: "submitted",
    driver: "Unassigned",
    driverPhone: "",
    organizerNotes: "",
    notes: "",
  };
}

function RequestFormContent({ initialData, onClose, onSubmit, drivers, categories }) {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState(() => getInitialFormData(initialData));

  const categoryOptions =
    categories && categories.length > 0
      ? categories.map((c) => ({ value: c.id, label: c.name }))
      : CATEGORY_FALLBACK_OPTIONS;

  const driverOptions = [
    { value: "Unassigned", label: "Unassigned" },
    ...(drivers || []).map((drv) => ({
      value: drv.name,
      label: `${drv.name} - ${drv.vehicleReg} (${drv.status})`,
    })),
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedCat = categories.find((c) => c.id === value);
      setFormData((prev) => ({
        ...prev,
        category: value,
        wasteType: selectedCat ? selectedCat.name : prev.wasteType,
      }));
      return;
    }

    if (name === "driver") {
      if (value === "Unassigned") {
        setFormData((prev) => ({
          ...prev,
          driver: "Unassigned",
          driverPhone: "",
        }));
      } else {
        const selectedDriver = drivers.find((d) => d.name === value);
        setFormData((prev) => ({
          ...prev,
          driver: selectedDriver
            ? `${selectedDriver.name} (${selectedDriver.vehicleReg})`
            : value,
          driverPhone: selectedDriver ? selectedDriver.phone : "",
        }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, initialData?.id);
  };

  return (
    <div className="admin-modal-container">
      {/* Modal Header */}
      <div className="admin-modal-header">
        <h2 className="admin-modal-title">
          {isEditing ? `Edit Request Manifest (${initialData.id})` : "Log New Citizen Pickup Booking"}
        </h2>
        <button
          type="button"
          className="admin-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <LuX />
        </button>
      </div>

      {/* Modal Form */}
      <form onSubmit={handleFormSubmit}>
        <div className="admin-modal-body">
          {/* Citizen Details */}
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Citizen Full Name</label>
              <input
                type="text"
                name="name"
                className="admin-form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aarav Sharma"
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Contact Phone</label>
              <input
                type="text"
                name="phone"
                className="admin-form-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Email Address (Optional)</label>
              <input
                type="email"
                name="email"
                className="admin-form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="citizen@example.com"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Pickup Pincode / Zone</label>
              <input
                type="text"
                name="pincode"
                className="admin-form-input"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="110001"
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Full Street Address & Landmark</label>
            <textarea
              name="address"
              className="admin-form-textarea"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              placeholder="Flat 402, Green Meadows Tower A, Sector 14"
              required
            />
          </div>

          {/* Waste Manifest Details */}
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Waste Category</label>
              <CustomDropdown
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Volume & Packaging</label>
              <input
                type="text"
                name="volume"
                className="admin-form-input"
                value={formData.volume}
                onChange={handleChange}
                placeholder="3 bags cardboard & crushed bottles"
                required
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Approximate Quantity & Unit</label>
              <div style={{ display: "flex", gap: "0.8rem" }}>
                <input
                  type="number"
                  min="1"
                  name="approxQuantity"
                  className="admin-form-input"
                  value={formData.approxQuantity}
                  onChange={handleChange}
                  placeholder="10"
                  style={{ flex: 1 }}
                />
                <div style={{ width: "9.5rem" }}>
                  <CustomDropdown
                    name="quantityUnit"
                    value={formData.quantityUnit}
                    onChange={handleChange}
                    options={UNIT_OPTIONS}
                  />
                </div>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Estimated Weight</label>
              <input
                type="text"
                name="estimatedWeight"
                className="admin-form-input"
                value={formData.estimatedWeight}
                onChange={handleChange}
                placeholder="12 kg"
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">
              Measured Scale Weight (At Pickup)
            </label>
            <input
              type="text"
              name="measuredWeight"
              className="admin-form-input"
              value={formData.measuredWeight}
              onChange={handleChange}
              placeholder="e.g. 11.8 kg (once verified)"
            />
          </div>

          {/* Schedule & Logistics */}
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Pickup Date</label>
              <CustomDatePicker
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                variant="admin"
                placeholder="Select pickup date"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Service Time Window</label>
              <CustomDropdown
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                options={TIME_SLOT_OPTIONS}
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Workflow Status</label>
              <CustomDropdown
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={STATUS_OPTIONS}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Allocated Driver & Vehicle</label>
              <CustomDropdown
                name="driver"
                value={
                  formData.driver.includes("(")
                    ? formData.driver.split("(")[0].trim()
                    : formData.driver
                }
                onChange={handleChange}
                options={driverOptions}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">
              Depot Dispatch & Logistics Notes
            </label>
            <textarea
              name="organizerNotes"
              className="admin-form-textarea"
              rows="2"
              value={formData.organizerNotes}
              onChange={handleChange}
              placeholder="e.g. Van dispatched at 8:45 AM. 2nd stop on Sector 14 route."
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="admin-modal-footer">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="admin-btn admin-btn-primary">
            <LuSave />
            <span>{isEditing ? "Save Changes" : "Log Booking"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminRequestModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  drivers = [],
  categories = [],
}) {
  if (!isOpen) return null;

  return (
    <div
      className="admin-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <RequestFormContent
        key={initialData?.id || "create-new-req"}
        initialData={initialData}
        onClose={onClose}
        onSubmit={onSubmit}
        drivers={drivers}
        categories={categories}
      />
    </div>
  );
}
