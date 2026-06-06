import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const port = process.env.PORT ? Number(process.env.PORT) : 5173;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port,
    strictPort: true,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port,
    host: true,
  },
});
