import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("darkMode", this.theme === "dark" ? "true" : "false");
    },
    initializeTheme() {
      this.theme = localStorage.getItem("darkMode") === "true" ? "dark" : "light";
    },
  },
  persist: true, // Ensure theme persists using Pinia plugin
});
