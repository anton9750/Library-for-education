import React from "react";
export default function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      {label && <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>{label}</label>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} 
             style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #d1d5db" }} />
    </div>
  );
}