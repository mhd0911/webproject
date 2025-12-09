import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // mọi request bắt đầu bằng /api sẽ được forward sang backend
      "/api": {
        target: "http://localhost:5000", // PORT backend đang chạy
        changeOrigin: true,
      },
    },
  },
});
