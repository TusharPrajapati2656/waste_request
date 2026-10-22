// src/common/SectionBadge/SectionHeaderBadge.jsx

import React from "react";
import { LuLeaf } from "react-icons/lu";
import "./SectionHeaderBadge.css";

export default function SectionHeaderBadge({ icon, className = "" }) {
  return (
    <div className={`section-top-badge ${className}`} aria-hidden="true">
      <span className="section-badge-leaf leaf-top-left">
        <LuLeaf />
      </span>
      <span className="section-badge-leaf leaf-top-right">
        <LuLeaf />
      </span>
      <span className="section-badge-leaf leaf-bottom-right">
        <LuLeaf />
      </span>
      <div className="section-top-badge-box">
        {icon}
      </div>
    </div>
  );
}
