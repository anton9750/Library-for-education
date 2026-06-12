const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim());
}

console.log("🛠️ Injecting missing Vite mounting frameworks...");

// 1. Create index.html in the FRONTEND root directory (This is what Vite loads!)
write("frontend/index.html", `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enterprise DevKit Marketplace</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

// 2. Create the Vite Configuration file
write("frontend/vite.config.js", `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});
`);

console.log("✅ Missing files created! Ready for final installation step.");