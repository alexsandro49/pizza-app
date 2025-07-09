import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useConfigStore = defineStore("config", () => {
  const darkTheme = ref(true);

  const themeIcon = computed(() => {
    return darkTheme.value ? "fa-regular fa-sun" : "fa-regular fa-moon";
  });

  function changeTheme() {
    darkTheme.value = !darkTheme.value;
  }

  return { darkTheme, themeIcon, changeTheme };
});
