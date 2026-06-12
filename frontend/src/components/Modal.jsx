import React from "react";
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  const overlayMatrixStyle = {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
  };
  const modalBoxBodyStyle = {
    background: "#fff", padding: "30px", borderRadius: "8px", maxWidth: "500px", width: "100%"
  };
  return (
    <div style={overlayMatrixStyle} onClick={onClose}>
      <div style={modalBoxBodyStyle} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} style={{ marginTop: "20px", padding: "8px 16px" }}>Close Context Layer</button>
      </div>
    </div>
  );
}