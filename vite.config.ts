import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
export default defineConfig({
  plugins: [
    react(),
    {
      name: "preserve-original-world",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.split("?")[0] === "/world/index.html") {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(
              readFileSync(
                new URL("./public/world/index.html", import.meta.url),
              ),
            );
          } else next();
        });
      },
    },
  ],
  base: "./",
  optimizeDeps: { entries: ["index.html"] },
});
