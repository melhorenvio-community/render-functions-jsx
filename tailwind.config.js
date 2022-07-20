const preset = require('@melhorenvio/ds-core/tailwind.config');

module.exports = {
  presets: [preset],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      boxShadow: {
        cover: '0 0 0 max(100vw, 100vh) rgba(0, 0, 0, 0.6)',
      },
    },
  },
};
