import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        vilber: resolve(__dirname, "projets/vilber.html"),
        projets: resolve(__dirname, "projets.html"),
      },
    },
  },
});