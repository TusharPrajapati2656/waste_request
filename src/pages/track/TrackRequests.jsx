// src/pages/track/TrackRequests.jsx

import { useTrackRequests } from "./hooks/useTrackRequests";
import TrackHeader from "./components/TrackHeader";
import TrackFilterTabs from "./components/TrackFilterTabs";
import TrackRequestList from "./components/TrackRequestList";
import "./TrackRequests.css";

export default function TrackRequests() {
  const {
    filteredRequests,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    expandedId,
    toggleExpandedId,
    handleCancelRequest,
    counts,
  } = useTrackRequests();

  return (
    <div className="tracker-page">
      <div className="section-wrapper">
        <TrackHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <TrackFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        <TrackRequestList
          requests={filteredRequests}
          searchTerm={searchTerm}
          expandedId={expandedId}
          onToggleExpand={toggleExpandedId}
          onCancelRequest={handleCancelRequest}
        />
      </div>
    </div>
  );
}
