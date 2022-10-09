<script setup lang="ts">
import { getThemeJSON, applyTheme } from "unocss-presets-m3";

function changeDarkLight() {
  let dataTheme = document.documentElement.getAttribute("data-theme");
  if (dataTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
async function changeThemeColor(e: any) {
  let color = e.target.value;
  let theme = await getThemeJSON(color);
  applyTheme(theme);
}
async function changeThemeImg(e: any) {
  let imgFile = e.target.files[0];
  let imgUrl = URL.createObjectURL(imgFile);
  let theme = await getThemeJSON(imgUrl, [], "img");
  applyTheme(theme);

  (
    document.querySelector("#container") as any
  ).style.backgroundImage = `url(${imgUrl})`;
}
</script>

<template>
  <section>
    1 更改主题色(通过hex)<input type="color" @change="changeThemeColor" /> 2
    更改主题色 (通过img)<input
      type="file"
      @change="changeThemeImg"
      accept=".jpg, .jpeg, .png"
    />

    <div class="w-20 h-20 primary">primary</div>
    <div class="w-10 h-10 secondary">secondary</div>

    <button @click="changeDarkLight">dark/light</button>
  </section>
</template>
