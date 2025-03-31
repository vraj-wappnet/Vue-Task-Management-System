// import { fileURLToPath, URL } from "node:url";
// import { defineConfig } from "vitest/config"; // Use Vitest's defineConfig
// import vue from "@vitejs/plugin-vue";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
//   test: {
//     globals: true,
//     css: false,
//     environment: "happy-dom",
//     coverage: {
//       provider: "v8",
//       reporter: ["text", "json", "html"],
//     },
//   },
// });
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    css: false,
    deps: {
      inline: ["vuetify"],
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
