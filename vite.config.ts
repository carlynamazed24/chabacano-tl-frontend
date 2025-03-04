import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";

const isLocalHost = false;

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: isLocalHost
    ? {
        https: {
          key: fs.readFileSync("./certs/localhost-key.pem"),
          cert: fs.readFileSync("./certs/localhost.pem"),
        },
        host: "localhost",
        port: 5173,
      }
    : {},
});
