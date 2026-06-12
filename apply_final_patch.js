const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim());
}

console.log("⚙️ Executing structural alignment patch...");

// 1. Create a safe, uniform Card fallback molecule to prevent compilation breaks
write("frontend/src/components/Card.jsx", `
import React from 'react';

export default function Card({ children, style = {} }) {
  return (
    <div 
      className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm" 
      style={style}
    >
      {children}
    </div>
  );
}
`);

// 2. Overwrite vite.config.js to cleanly bundle the `@tailwindcss/vite` plugin engine
write("frontend/vite.config.js", `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173
  }
});
`);

console.log("✅ Structural patch applied successfully!");