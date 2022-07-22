import { fileURLToPath, URL } from "url";
import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import SvgLoader from "vite-svg-loader";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import Resolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vitePlugins()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "tailwind.config.js": resolve("tailwind.config.js"),
    },
  },
  optimizeDeps: {
    include: ["tailwind.config.js"],
  },
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
  },
  css: ["@melhorenvio/ds-core/style.css", "@/assets/css/index.pcss"],
  postcss: require("@melhorenvio/ds-core/postcss.config"),
  esbuild: { loader: { '.js': '.jsx' } }
});

function vitePlugins() {
  return [
    SvgLoader(),
    Icons({
      compiler: "vue3",
      customCollections: {
        "mp-icons": FileSystemIconLoader("./src/assets/icons"),
        "sc-icons": FileSystemIconLoader("./src/assets/shipping-companies"),
      },
    }),
    Components({
      resolvers: [
        Resolver({
          prefix: false,
          customCollections: ["mp-icons", "sc-icons"],
        }),
      ],
    }),
  ];
}
