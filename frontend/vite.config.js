import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Library-for-education/', // 👈 Add this exact line right here!
  server: {
    port: 5173
  }
});