import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state() {
    return {
      darkTheme: true,
    };
  },
  actions: {
    changeTheme() {
      this.darkTheme = !this.darkTheme;
    },
  },
  getters: {
    themeIcon(): string {
      return this.darkTheme ? "fa-regular fa-sun" : "fa-regular fa-moon";
    },
  },
});
