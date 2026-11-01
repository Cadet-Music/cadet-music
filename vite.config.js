import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // framer-motion is imported by ~38 components; isolate it so it
            // stays a single long-term-cached chunk instead of being inlined
            // into every route chunk that uses it.
            if (id.includes('framer-motion')) return 'vendor-framer-motion';
            if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor-react';
            if (id.includes('zustand') || id.includes('canvas-confetti')) return 'vendor-utils';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
