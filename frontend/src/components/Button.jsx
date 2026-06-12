import React from "react";
export default function Button({ children, onClick, variant = "primary", style, ...props }) {
  const baseStyleMap = {
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    background: variant === "primary" ? "#2563eb" : variant === "danger" ? "#dc2626" : "#4b5563",
    color: "#ffffff"
  };
  return (
    <button onClick={onClick} style={{ ...baseStyleMap, ...style }} {...props}>
      {children}
    </button>
  );
}