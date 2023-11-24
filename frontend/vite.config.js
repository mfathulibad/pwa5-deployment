import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["*/**"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "ProfeLink",
        short_name: "ProfeLink",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#007bff",
        description: "Lpa is lecturer profile applicalion",
        lang: "en",
        scope: "/",
        icons: [
          {
            src: "/public/maskable_icon.png",
            sizes: "196x196",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/public/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => true,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host : "0.0.0.0",
    port : 3000,
  }
});
