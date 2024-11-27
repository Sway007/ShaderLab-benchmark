import basicSsl from "@vitejs/plugin-basic-ssl";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    basicSsl({
      name: "xr",
      certDir: "/Users/.../.devServer/cert",
      domains: ["*.custom.com"],
    }),
  ],
  server: {
    port: 4000,
    https: !!packageJson.dependencies["@galacean/engine-xr-webxr"],
    host: "0.0.0.0",
  },
  build: {
    minify: false,
    lib: {
      entry: "./index.tsx",
      /**
       * The name of the exposed global variable. Required when the `formats` option includes
       * `umd` or `iife`
       */
      name: "anything",
      formats: ["es", "umd"],
    },
  },
  resolve: {
    dedupe: ["@galacean/engine", "@galacean/engine-toolkit", "antv/x6"],
  },
});
