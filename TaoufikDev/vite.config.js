import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  ...(command === "serve"
    ? {
        html: {
          cspNonce: "vite-dev-only",
        },
      }
    : {}),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "contact.html"),
        vilber: resolve(__dirname, "projets/vilber.html"),
        budgie: resolve(__dirname, "projets/budgie.html"),
        uvitec: resolve(__dirname, "projets/uvitec.html"),
        uvitec3d: resolve(__dirname, "projets/uvitec-3d.html"),
        ohMyCleanServices: resolve(__dirname, "projets/oh-my-clean-services.html"),
        vilber3d: resolve(__dirname, "projets/vilber-3d.html"),
        projets: resolve(__dirname, "projets.html"),
      },
    },
  },
}));
