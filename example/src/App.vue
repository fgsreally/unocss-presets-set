<script setup lang="ts">
import M3 from "./components/m3.vue";
import { ref } from "vue";
let allComponent = [{ label: "m3", comp: M3 }];
let curComp = ref(M3);
</script>

<template>
  <section id="container">
    <button v-for="(item, i) in allComponent" @click="curComp = item.comp">
      {{ item.label }}
    </button>
    <component :is="curComp"></component>
  </section>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: background-color 1s;
}
#container div {
  margin: 30px;
}

#container {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
body {
  height: 100vh;
}
</style>
