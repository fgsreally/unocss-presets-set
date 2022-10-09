import { CustomColor } from "@importantimport/material-color-utilities";
import { getThemeJSON, initPresets } from "./Material";

const presetM3 = async (
  colorOrUrl: string | number,
  options?: { otherColor?: CustomColor[]; type?: "argb" | "img" | "hex" }, //主色生成
  tones: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] //色阶
) => {
  let m3Theme = await getThemeJSON(
    colorOrUrl,
    options?.otherColor,
    options?.type
  );
  let { preflights, theme, rules } = await initPresets(m3Theme, tones);
  return {
    name: "unocss-presets-m3",
    theme,
    rules,
    preflights,
  };
};

export default presetM3;

export * from "./Material";
