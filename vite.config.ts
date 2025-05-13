/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
  },
  // Using github pages
  base: "/svg-interpolate-demo/",

  // For Runtime: absolute path
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@examples": path.resolve(__dirname, "./src/examples"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
