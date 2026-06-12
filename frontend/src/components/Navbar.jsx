import React from "react";
export default function Navbar() {
  const navLayoutBlockStyle = {
    height: "64px", background: "#1f2937", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 24px", borderBottom: "3px solid #3b82f6"
  };
  return (
    <header style={navLayoutBlockStyle}>
      <div style={{ fontWeight: "700", fontSize: "1.25rem" }}>ENTERPRISE HYPER CORE CONTROL PLATFORM</div>
      <div>System Node Profile Context: <code>Active Runtime Engine</code></div>
    </header>
  );
}