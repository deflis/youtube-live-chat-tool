import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "lib/",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "browser",
      fileName: `index`,
    },
  },
});
