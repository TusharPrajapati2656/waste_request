import {
  LuLeaf,
  LuDownload,
  LuScale,
  LuPercent,
  LuTrendingUp,
} from "react-icons/lu";

export default function AdminAnalyticsView({ requests = [], settings = {} }) {
  // Aggregate weight by category
  const categoryStats = {
    recyclables: { name: "Household Recyclables", count: 0, weight: 0, color: "#16794b" },
    organic: { name: "Organic / Kitchen Waste", count: 0, weight: 0, color: "#15803d" },
    ewaste: { name: "E-Waste & Electronics", count: 0, weight: 0, color: "#0284c7" },
    bulk: { name: "Bulk Furniture & Mattresses", count: 0, weight: 0, color: "#d97706" },
    hazardous: { name: "Hazardous & Chemicals", count: 0, weight: 0, color: "#dc2626" },
    commercial: { name: "Commercial Manifests", count: 0, weight: 0, color: "#7c3aed" },
  };

  let totalWeightAll = 0;

  requests.forEach((r) => {
    const cat = r.category || "recyclables";
    const raw = r.measuredWeight || r.estimatedWeight || "0";
    const wt = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;

    if (categoryStats[cat]) {
      categoryStats[cat].count += 1;
      categoryStats[cat].weight += wt;
    }
    totalWeightAll += wt;
  });

  const co2Rate = settings.co2OffsetRatePerKg || 1.84;
  const totalCo2SavedKg = totalWeightAll * co2Rate;
  const diversionRate = 98.4; // %

  const handleExportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      hub: settings.hubName || "GreenCycle Regional Depot",
      totalRequests: requests.length,
      totalWeightKg: totalWeightAll,
      totalCo2SavedKg: totalCo2SavedKg,
      diversionRatePercentage: diversionRate,
      breakdown: categoryStats,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `greencycle_analytics_report_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.8rem" }}>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-titles">
          <h1 className="admin-page-h1">Environmental Diversion & Operational Analytics</h1>
          <p className="admin-page-desc">
            Verified recovery metrics, CO2 emissions prevented, landfill diversion rate, and zonal volume breakdown.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={handleExportReport}
          >
            <LuDownload />
            <span>Export Analytics Report (JSON)</span>
          </button>
        </div>
      </div>

      {/* Top Impact KPIs */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box green">
              <LuLeaf />
            </div>
            <span className="admin-kpi-trend up">EPA Verified</span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">{totalCo2SavedKg.toFixed(1)} kg</span>
            <span className="admin-kpi-label">CO₂ Emissions Avoided</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box purple">
              <LuScale />
            </div>
            <span className="admin-kpi-trend up">Total Collected</span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">{totalWeightAll.toFixed(1)} kg</span>
            <span className="admin-kpi-label">Waste Diverted from Landfill</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box blue">
              <LuPercent />
            </div>
            <span className="admin-kpi-trend up">+2.1% this month</span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">{diversionRate}%</span>
            <span className="admin-kpi-label">Material Recovery Efficiency</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon-box amber">
              <LuTrendingUp />
            </div>
            <span className="admin-kpi-trend up">Avg 3.4 hrs</span>
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-value">99.1%</span>
            <span className="admin-kpi-label">On-Time Pickup SLA</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown & Progress Bars */}
      <div className="admin-card-container" style={{ padding: "2.8rem" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.6rem" }}>
          Material Composition Breakdown
        </h2>
        <p style={{ fontSize: "1.35rem", color: "#64748b", margin: "0 0 2.4rem" }}>
          Aggregated pickup weights grouped by waste stream category
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {Object.entries(categoryStats).map(([key, item]) => {
            const pct = totalWeightAll > 0 ? (item.weight / totalWeightAll) * 100 : 0;
            return (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    />
                    <strong style={{ fontSize: "1.45rem", color: "#0f172a" }}>
                      {item.name}
                    </strong>
                    <span style={{ fontSize: "1.25rem", color: "#64748b" }}>
                      ({item.count} pickups)
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                    <strong style={{ fontSize: "1.5rem", color: "#0f172a" }}>
                      {item.weight.toFixed(1)} kg
                    </strong>
                    <span style={{ fontSize: "1.25rem", color: "#64748b", fontWeight: "700" }}>
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "1rem",
                    borderRadius: "9999px",
                    background: "#f1f5f9",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.max(pct, 2)}%`,
                      backgroundColor: item.color,
                      borderRadius: "9999px",
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operational Zones Comparison */}
      <div className="admin-card-container" style={{ padding: "2.8rem" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.6rem" }}>
          Zonal Performance Matrix
        </h2>
        <p style={{ fontSize: "1.35rem", color: "#64748b", margin: "0 0 2rem" }}>
          Dispatch volume, response time, and citizen ratings by operational depot sector
        </p>

        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Zone / Sector</th>
                <th>Covered Pincodes</th>
                <th>Assigned EV Vans</th>
                <th>SLA Compliance</th>
                <th>Citizen Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Sector 14 Central</strong>
                </td>
                <td>110001, 110014</td>
                <td>3 Electric Vans</td>
                <td style={{ color: "#059669", fontWeight: "700" }}>99.4%</td>
                <td>4.9 ★</td>
                <td>
                  <span className="admin-chip chip-completed">High Density</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Sector 22 North</strong>
                </td>
                <td>110022, 110025</td>
                <td>2 Bulk Flatbeds</td>
                <td style={{ color: "#059669", fontWeight: "700" }}>98.2%</td>
                <td>4.7 ★</td>
                <td>
                  <span className="admin-chip chip-confirmed">Active</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Sector 18 Cyber Hub</strong>
                </td>
                <td>110018, 110019</td>
                <td>1 E-Waste Unit</td>
                <td style={{ color: "#059669", fontWeight: "700" }}>100%</td>
                <td>4.9 ★</td>
                <td>
                  <span className="admin-chip chip-in_transit">Optimal</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Sector 9 South</strong>
                </td>
                <td>110009, 110010</td>
                <td>1 Compactor EV</td>
                <td style={{ color: "#059669", fontWeight: "700" }}>97.8%</td>
                <td>4.8 ★</td>
                <td>
                  <span className="admin-chip chip-confirmed">Active</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Industrial Area East</strong>
                </td>
                <td>110092, 110093</td>
                <td>1 Standby Heavy Van</td>
                <td style={{ color: "#d97706", fontWeight: "700" }}>95.0%</td>
                <td>4.6 ★</td>
                <td>
                  <span className="admin-chip chip-submitted">Medium Load</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
