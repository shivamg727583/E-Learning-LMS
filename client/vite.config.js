import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Ensure the output directory is 'dist'
    chunkSizeWarningLimit: 1000, // (Optional) Increase chunk size warning limit if needed
  },
});
