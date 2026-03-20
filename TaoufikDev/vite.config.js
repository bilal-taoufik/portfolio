import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ohmycleanservices: resolve(__dirname, "projets/ohmycleanservices.html"),
        uvitec: resolve(__dirname, "projets/uvitec.html"),
        vilber: resolve(__dirname, "projets/vilber.html"),
        vilber3d: resolve(__dirname, "projets/vilber-3d.html"),
        portfolio: resolve(__dirname, "projets/portfolio.html"),
        designguide: resolve(__dirname, "projets/design-guide.html"),
        projets: resolve(__dirname, "projets.html"),
        contact: resolve(__dirname, "contact.html"),
        legales: resolve(__dirname, "mentions-legales.html"),
      },
    },
  },
});