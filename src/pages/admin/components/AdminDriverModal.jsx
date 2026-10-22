import { useState } from "react";
import { LuX, LuSave } from "react-icons/lu";
import CustomDropdown from "../../../common/dropdown/CustomDropdown";

const ZONE_OPTIONS = [
  { value: "Sector 14 Central", label: "Sector 14 Central" },
  { value: "Sector 22 North", label: "Sector 22 North" },
  { value: "Sector 18 Cyber Hub", label: "Sector 18 Cyber Hub" },
  { value: "Sector 9 South", label: "Sector 9 South" },
  { value: "Industrial Area East", label: "Industrial Area East" },
];

const VEHICLE_TYPE_OPTIONS = [
  { value: "Electric Van", label: "Electric Van (Household Recyclables)" },
  { value: "Organic Compactor EV", label: "Organic Compactor EV" },
  { value: "Hazardous / E-Waste Specialist", label: "Hazardous / E-Waste Specialist" },
  { value: "Heavy Flatbed Truck", label: "Heavy Flatbed Truck (Bulk)" },
  { value: "Standard Recyclables Van", label: "Standard Recyclables Van" },
];

const STATUS_OPTIONS = [
  { value: "Available", label: "Available (Ready for Dispatch)" },
  { value: "En Route", label: "En Route (Executing Route)" },
  { value: "On Break", label: "On Break" },
  { value: "Off Duty", label: "Off Duty" },
];

function getInitialDriverData(initialData) {
  if (initialData) {
    return {
      name: initialData.name || "",
      phone: initialData.phone || "",
      email: initialData.email || "",
      vehicleType: initialData.vehicleType || "Electric Van",
      vehicleReg: initialData.vehicleReg || "",
      zone: initialData.zone || "Sector 14 Central",
      status: initialData.status || "Available",
    };
  }
  return {
    name: "",
    phone: "",
    email: "",
    vehicleType: "Electric Van",
    vehicleReg: `EV Van #${Math.floor(10 + Math.random() * 90)} - DL 1V ${Math.floor(1000 + Math.random() * 9000)}`,
    zone: "Sector 14 Central",
    status: "Available",
  };
}

function DriverFormContent({ initialData, onClose, onSubmit }) {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState(() => getInitialDriverData(initialData));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, initialData?.id);
  };

  return (
    <div className="admin-modal-container">
      <div className="admin-modal-header">
        <h2 className="admin-modal-title">
          {isEditing ? `Edit Driver (${initialData.id})` : "Register New Logistics Driver"}
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

      <form onSubmit={handleFormSubmit}>
        <div className="admin-modal-body">
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Driver Full Name</label>
              <input
                type="text"
                name="name"
                className="admin-form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Vikramaditya Singh"
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
                placeholder="+91 98111 55443"
                required
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Company Email</label>
              <input
                type="email"
                name="email"
                className="admin-form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="driver@greencycle.eco"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Operational Zone</label>
              <CustomDropdown
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                options={ZONE_OPTIONS}
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Assigned Vehicle Category</label>
              <CustomDropdown
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                options={VEHICLE_TYPE_OPTIONS}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Vehicle Registration Number</label>
              <input
                type="text"
                name="vehicleReg"
                className="admin-form-input"
                value={formData.vehicleReg}
                onChange={handleChange}
                placeholder="EV Van #15 - DL 1V 9921"
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Duty Status</label>
            <CustomDropdown
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={STATUS_OPTIONS}
            />
          </div>
        </div>

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
            <span>{isEditing ? "Save Driver" : "Register Driver"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminDriverModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="admin-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <DriverFormContent
        key={initialData?.id || "create-driver"}
        initialData={initialData}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}
