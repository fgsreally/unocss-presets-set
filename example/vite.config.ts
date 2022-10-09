import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import presetWind from "@unocss/preset-wind";
import presetM3 from "unocss-presets-m3";
// https://vitejs.dev/config/

let m3 = await presetM3("#ff00cc");
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetWind(), m3],
    }),
  ],
});
