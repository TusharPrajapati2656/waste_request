// src/pages/admin/views/AdminCategoriesView.jsx

import { useState } from "react";
import { LuPencil, LuSave, LuX } from "react-icons/lu";

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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(34rem, 1fr))", gap: "2.4rem" }}>
        {categories.map((cat) => {
          const isCurrentEdit = editingId === cat.id;

          return (
            <div
              key={cat.id}
              className="admin-card-container"
              style={{
                padding: "2.4rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.6rem",
                borderTop: `0.4rem solid ${cat.color || "#10b981"}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontSize: "1.7rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.4rem" }}>
                    {cat.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "1.2rem",
                      color: "#64748b",
                      background: "#f1f5f9",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "0.4rem",
                    }}
                  >
                    stream_id: {cat.id}
                  </span>
                </div>

                <span
                  style={{
                    padding: "0.35rem 0.9rem",
                    borderRadius: "9999px",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    background: cat.active ? "#ecfdf5" : "#fee2e2",
                    color: cat.active ? "#059669" : "#dc2626",
                  }}
                >
                  {cat.active ? "Active Stream" : "Disabled"}
                </span>
              </div>

              {isCurrentEdit ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Reward Credits / kg</label>
                    <input
                      type="number"
                      step="0.5"
                      className="admin-form-input"
                      value={editForm.creditRewardPerKg}
                      onChange={(e) =>
                        setEditForm({ ...editForm, creditRewardPerKg: parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Min Weight (kg)</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={editForm.minWeightKg}
                      onChange={(e) =>
                        setEditForm({ ...editForm, minWeightKg: parseInt(e.target.value, 10) || 1 })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Vehicle Requirement</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={editForm.vehicleRequired}
                      onChange={(e) =>
                        setEditForm({ ...editForm, vehicleRequired: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "0.4rem" }}>
                    <input
                      type="checkbox"
                      id={`active-${cat.id}`}
                      checked={editForm.active}
                      onChange={(e) =>
                        setEditForm({ ...editForm, active: e.target.checked })
                      }
                    />
                    <label htmlFor={`active-${cat.id}`} style={{ fontSize: "1.3rem", fontWeight: "600" }}>
                      Active for citizen bookings
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.8rem" }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-primary"
                      style={{ flex: 1, justifyContent: "center" }}
                      onClick={() => handleSave(cat.id)}
                    >
                      <LuSave />
                      <span>Save Rates</span>
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={() => setEditingId(null)}
                    >
                      <LuX />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      background: "#f8fafc",
                      padding: "1.4rem",
                      borderRadius: "var(--admin-radius-md)",
                      fontSize: "1.3rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#64748b" }}>Citizen Reward Credit:</span>
                      <strong style={{ color: "#0f172a" }}>
                        ₹ {cat.creditRewardPerKg.toFixed(2)} / kg
                      </strong>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#64748b" }}>Minimum Threshold:</span>
                      <strong style={{ color: "#0f172a" }}>{cat.minWeightKg} kg</strong>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#64748b" }}>Required Vehicle:</span>
                      <strong style={{ color: "#0f172a", fontSize: "1.2rem" }}>
                        {cat.vehicleRequired}
                      </strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    style={{ justifyContent: "center", marginTop: "auto" }}
                    onClick={() => startEdit(cat)}
                  >
                    <LuPencil />
                    <span>Configure Pricing & Vehicle</span>
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
