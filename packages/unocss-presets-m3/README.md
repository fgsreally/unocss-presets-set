# unocss-presets-m3
Based on [Google material 3](https://m3.material.io/theme-builder#/custom),to generate theme color 

```ts
//vite.config.ts
import Unocss from "unocss/vite";
import presetM3 from "unocss-presets-m3";

export default defineConfig({
  plugins: [
    Unocss({
      presets: [  await presetM3("#ff00cc")],
    }),
  ],
});

```

## use in browser
just like what tailwindcss does
```html
<div class="bg-primary color-primary-10"></div>
```

## dynamic change in browser
The theme color can be changed dynamically in the browser by providing a base color or an image
```ts
import { getThemeJSON, applyTheme } from "unocss-presets-m3";

async function changeThemeColor(color:string) {
  let theme = await getThemeJSON(color);
  applyTheme(theme);
}
async function changeThemeImg(imgUrl: string) {
  let theme = await getThemeJSON(imgUrl, [], "img");
  applyTheme(theme);
}
```
