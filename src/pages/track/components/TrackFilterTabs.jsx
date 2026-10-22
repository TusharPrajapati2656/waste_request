// src/pages/track/components/TrackFilterTabs.jsx

import { FILTER_TABS } from "../data/trackData";

export default function TrackFilterTabs({ activeTab, onTabChange, counts }) {
  return (
    <div className="tracker-tabs">
      {FILTER_TABS.map((tab) => {
        const count = counts[tab.key] ?? 0;
        return (
          <button
            key={tab.key}
            type="button"
            className={`tracker-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label} ({count})
          </button>
        );
      })}
    </div>
  );
}
