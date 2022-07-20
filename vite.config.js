import { fileURLToPath, URL } from "url";

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
    },
  },
  css: ["@melhorenvio/ds-core/style.css", "@/assets/css/index.pcss"],
  postcss: require("@melhorenvio/ds-core/postcss.config"),
});

function vitePlugins() {
  return [
    SvgLoader(),
    Icons({
      scale: 1,
      compiler: "vue3",
      customCollections: {
        "me-icons-action": FileSystemIconLoader(
          "./node_modules/@melhorenvio/ds-icons/action"
        ),
        "me-icons-content": FileSystemIconLoader(
          "./node_modules/@melhorenvio/ds-icons/content"
        ),
        "me-icons-datetime": FileSystemIconLoader(
          "./node_modules/@melhorenvio/ds-icons/datetime"
        ),
        "me-icons-navigation": FileSystemIconLoader(
          "./node_modules/@melhorenvio/ds-icons/navigation"
        ),
        "mr-icons-basic": FileSystemIconLoader("./assets/icons/basic"),
        "mr-icons-fancy": FileSystemIconLoader("./assets/icons/fancy"),
      },
      iconCustomizer(collection, icon, props) {
        props.width = "1em";
        props.height = "1em";
      },
    }),
    Components({
      resolvers: [
        Resolver({
          prefix: false,
          customCollections: [
            "me-icons-action",
            "me-icons-content",
            "me-icons-datetime",
            "me-icons-navigation",
            "mr-icons-basic",
            "mr-icons-fancy",
          ],
          enabledCollections: [
            "me-icons-action",
            "me-icons-content",
            "me-icons-datetime",
            "me-icons-navigation",
            "mr-icons-basic",
            "mr-icons-fancy",
          ],
        }),
      ],
    }),
  ];
}
