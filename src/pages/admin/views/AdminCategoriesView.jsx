// src/pages/admin/views/AdminCategoriesView.jsx

import { useState } from "react";
import {
  LuTrash2,
  LuRecycle,
  LuLeaf,
  LuCpu,
  LuArmchair,
  LuFlame,
  LuBuilding2,
  LuCoins,
  LuWeight,
  LuTruck,
  LuSettings,
  LuArrowRight,
  LuSave,
  LuX,
} from "react-icons/lu";

function getCategoryIcon(id) {
  switch (id) {
    case "recyclables":
      return <LuTrash2 />;
    case "organic":
      return <LuLeaf />;
    case "ewaste":
      return <LuCpu />;
    case "bulk":
      return <LuArmchair />;
    case "hazardous":
      return <LuFlame />;
    case "commercial":
      return <LuBuilding2 />;
    default:
      return <LuRecycle />;
  }
}

export default function AdminCategoriesView({
  categories = [],
  onUpdateCategory,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditForm({
      name: cat.name,
      creditRewardPerKg: cat.creditRewardPerKg,
      minWeightKg: cat.minWeightKg,
      vehicleRequired: cat.vehicleRequired,
      active: cat.active,
    });
  };

  const handleSave = (id) => {
    onUpdateCategory(id, editForm);
    setEditingId(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.8rem" }}>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-titles">
          <h1 className="admin-page-h1">Waste Stream Categories & Credit Pricing</h1>
          <p className="admin-page-desc">
            Define accepted collection categories, citizen reward credits per kg, required vehicle specifications, and active status.
          </p>
        </div>
      </div>

      {/* Categories Cards Grid */}
      <div className="admin-categories-grid">
        {categories.map((cat) => {
          const isCurrentEdit = editingId === cat.id;

          return (
            <div key={cat.id} className="admin-category-card">
              {/* Card Header */}
              <div className="admin-cat-card-header">
                <div className="admin-cat-header-left">
                  <div
                    className="admin-cat-icon-box"
                    aria-hidden="true"
                    style={{
                      background: cat.color ? `${cat.color}15` : "#eaf6ee",
                      color: cat.color || "#16794b",
                    }}
                  >
                    {getCategoryIcon(cat.id)}
                  </div>
                  <div className="admin-cat-title-group">
                    <h2 className="admin-cat-title">{cat.name}</h2>
                    <span className="admin-cat-stream-id">
                      stream_id: {cat.id}
                    </span>
                  </div>
                </div>

                <div
                  className={`admin-cat-status-pill ${
                    cat.active ? "active" : "disabled"
                  }`}
                >
                  <span className="admin-cat-status-dot" aria-hidden="true" />
                  <span>{cat.active ? "Active Stream" : "Disabled"}</span>
                </div>
              </div>

              {isCurrentEdit ? (
                /* Edit Mode Drawer */
                <div className="admin-cat-edit-panel">
                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        Citizen Reward (₹ / kg)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        className="admin-form-input"
                        value={editForm.creditRewardPerKg}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            creditRewardPerKg: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        Min Threshold (kg)
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="admin-form-input"
                        value={editForm.minWeightKg}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            minWeightKg: parseInt(e.target.value, 10) || 1,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      Required Vehicle Specification
                    </label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={editForm.vehicleRequired}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          vehicleRequired: e.target.value,
                        })
                      }
                      placeholder="e.g. Electric Van, Heavy Flatbed Truck"
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.4rem 0",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`active-toggle-${cat.id}`}
                      checked={editForm.active}
                      onChange={(e) =>
                        setEditForm({ ...editForm, active: e.target.checked })
                      }
                      style={{
                        width: "1.8rem",
                        height: "1.8rem",
                        accentColor: "var(--primary)",
                        cursor: "pointer",
                      }}
                    />
                    <label
                      htmlFor={`active-toggle-${cat.id}`}
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: "600",
                        color: "#0f172a",
                        cursor: "pointer",
                      }}
                    >
                      Active for citizen bookings
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.6rem" }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-primary"
                      style={{ flex: 1, justifyContent: "center" }}
                      onClick={() => handleSave(cat.id)}
                    >
                      <LuSave />
                      <span>Save Changes</span>
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={() => setEditingId(null)}
                      title="Cancel edit"
                    >
                      <LuX />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Display Mode matching requested UI */
                <>
                  {/* 3-Column Metrics Panel */}
                  <div className="admin-cat-metrics-panel">
                    {/* Col 1: Citizen Reward */}
                    <div className="admin-cat-metric-col">
                      <div className="admin-cat-metric-icon-wrap" aria-hidden="true">
                        <LuCoins />
                      </div>
                      <span className="admin-cat-metric-label">
                        Citizen Reward
                      </span>
                      <strong className="admin-cat-metric-value">
                        ₹ {Number(cat.creditRewardPerKg).toFixed(2)} / kg
                      </strong>
                    </div>

                    {/* Col 2: Minimum Threshold */}
                    <div className="admin-cat-metric-col">
                      <div className="admin-cat-metric-icon-wrap" aria-hidden="true">
                        <LuWeight />
                      </div>
                      <span className="admin-cat-metric-label">
                        Minimum Threshold
                      </span>
                      <strong className="admin-cat-metric-value">
                        {cat.minWeightKg} kg
                      </strong>
                    </div>

                    {/* Col 3: Required Vehicle */}
                    <div className="admin-cat-metric-col">
                      <div className="admin-cat-metric-icon-wrap" aria-hidden="true">
                        <LuTruck />
                      </div>
                      <span className="admin-cat-metric-label">
                        Required Vehicle
                      </span>
                      <strong
                        className="admin-cat-metric-value vehicle-text"
                        title={cat.vehicleRequired}
                      >
                        {cat.vehicleRequired}
                      </strong>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    className="admin-cat-config-btn"
                    onClick={() => startEdit(cat)}
                  >
                    <LuSettings
                      className="admin-cat-btn-gear"
                      aria-hidden="true"
                    />
                    <span>Configure Pricing & Vehicle</span>
                    <LuArrowRight
                      className="admin-cat-btn-arrow"
                      aria-hidden="true"
                    />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
