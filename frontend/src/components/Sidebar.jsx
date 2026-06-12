import React from "react";
export default function Sidebar() {
  const sidebarStructureWrapperStyle = {
    width: "260px", minHeight: "calc(100vh - 64px)", background: "#f3f4f6",
    padding: "20px", borderRight: "1px solid #e5e7eb"
  };
  return (
    <aside style={sidebarStructureWrapperStyle}>
      <nav><ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ padding: "10px 0", fontWeight: "600" }}>⚙️ Control Center Dash</li>
        <li style={{ padding: "10px 0", color: "#4b5563" }}>👥 Target Profile Indexes</li>
        <li style={{ padding: "10px 0", color: "#4b5563" }}>📋 Core Log Transcripts</li>
        <li style={{ padding: "10px 0", color: "#4b5563" }}>🛠️ System Configurations</li>
      </ul></nav>
    </aside>
  );
}