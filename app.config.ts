import { defineConfig } from "@tanstack/start/config";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  vite: {
    plugins: [
      // @ts-ignore
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
  server: {
    preset: "cloudflare-pages",
    unenv: cloudflare,
  },
});
