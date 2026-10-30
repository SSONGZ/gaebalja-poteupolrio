import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

export default defineConfig({
  base: "./",
  root: import.meta.dirname,
  plugins: [{
    name: "copy-standalone-portfolio-script",
    apply: "build",
    buildStart() {
      this.emitFile({
        type: "asset",
        fileName: "js/main.js",
        source: readFileSync(new URL("./js/main.js", import.meta.url)),
      });
    },
  }],
  build: {
    outDir: "dist/public",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
    port: Number(process.env.PORT) || 4173,
    strictPort: false,
  },
});
