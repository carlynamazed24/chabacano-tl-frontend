import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";

const enableLocalHttps = process.env.VITE_DEV_HTTPS === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: enableLocalHttps
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
