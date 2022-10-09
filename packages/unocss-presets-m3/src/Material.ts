import {
  argbFromHex,
  themeFromSourceColor,
  themeFromImage,
  CustomColor,
  Theme,
  hexFromArgb,
  argbFromRgb,
  Scheme,
} from "@importantimport/material-color-utilities";

export async function getThemeJSON(
  colorOrUrl: string | number,
  otherColor?: CustomColor[],
  type: "argb" | "img" | "hex" = "hex",
  errorCb?: OnErrorEventHandler
) {
  let theme: Theme;
  if (type === "img") {
    let el = new Image();
    el.src = colorOrUrl as string;
    el.onerror = errorCb || null;
    theme = await themeFromImage(el, otherColor);
  } else {
    let color;
    switch (type) {
      case "hex":
        color = argbFromHex(colorOrUrl as string);
        break;
      case "argb":
        color = colorOrUrl;
        break;
      default:
        throw new Error(`error color format`);
    }
    theme = await themeFromSourceColor(color as number, otherColor);
  }
  return theme;
}

export async function initPresets(
  theme: Theme,
  tones: number[],
  mode: "prefers-color-scheme" | "data-theme" = "data-theme"
) {
  let preflight = "";
  let lightPreflight = "";
  let darkPreflight = "";
  let themeColors: any = {};
  let rules: any = [];
  for (const [key, value] of Object.entries(theme.schemes.light.toJSON())) {
    const token = getToken(key);
    const color = hexFromArgb(value as number);
    preflight += `--md-sys-color-${token}-light:${color};`;
    lightPreflight += `--md-sys-color-${token}:var(--md-sys-color-${token}-light);`;
    darkPreflight += `--md-sys-color-${token}:var(--md-sys-color-${token}-dark);`;
    rules.push([token, { "background-color": `var(--md-sys-color-${token})` }]);
    rules.push([`${token}-text`, { color: `var(--md-sys-color-${token})` }]);
  }
  for (const [key, value] of Object.entries(theme.schemes.dark.toJSON())) {
    const token = getToken(key);
    const color = hexFromArgb(value as number);
    preflight += `--md-sys-color-${token}-dark:${color};`;
  }
  for (const [key, palette] of Object.entries(theme.palettes)) {
    const paletteKey = getToken(key);

    for (const tone of tones) {
      const token = `--md-ref-palette-${paletteKey}${tone}`;
      const color = hexFromArgb(palette.tone(tone));
      preflight += `${token}:${color};`;
      themeColors[`${paletteKey}${tone}`] = color;
    }
  }
  return {
    preflights: [
      {
        getCSS: () => {
          if (mode === "data-theme") {
            return `body{${
              preflight + lightPreflight
            }}[data-theme="dark"] body{${darkPreflight}}`;
          } else {
            return `body{${
              preflight + lightPreflight
            }}@media(prefers-color-scheme: dark){body{${darkPreflight}}}`;
          }
        },
      },
    ],
    theme: { colors: themeColors },
    rules,
  };
}

function getToken(key: string) {
  return key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function initPrefers() {
  //当使用data-theme时，启动时兼容prefers-color-scheme
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
export function applyTheme(
  theme: Theme,
  options?: {
    target?: HTMLElement;
    paletteTones?: number[];
  }
) {
  const target = options?.target || document.body;
  setSchemeProperties(target, theme.schemes.dark, "-dark");
  setSchemeProperties(target, theme.schemes.light, "-light");
  if (options?.paletteTones) {
    const tones = options?.paletteTones ?? [];
    for (const [key, palette] of Object.entries(theme.palettes)) {
      const paletteKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      for (const tone of tones) {
        const token = `--md-ref-palette-${paletteKey}-${paletteKey}${tone}`;
        const color = hexFromArgb(palette.tone(tone));
        target.style.setProperty(token, color);
      }
    }
  }
}
function setSchemeProperties(
  target: HTMLElement,
  scheme: Scheme,
  suffix: string = ""
) {
  for (const [key, value] of Object.entries(scheme.toJSON())) {
    const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    const color = hexFromArgb(value);
    target.style.setProperty(`--md-sys-color-${token}${suffix}`, color);
  }
}
