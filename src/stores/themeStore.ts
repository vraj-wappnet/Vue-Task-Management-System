// import { defineStore } from "pinia";

// export const useThemeStore = defineStore("theme", {
//   state: () => ({
//     isDark: localStorage.getItem("darkMode") === "true" || false,
//   }),
//   actions: {
//     toggleTheme() {
//       this.isDark = !this.isDark;
//       localStorage.setItem("darkMode", String(this.isDark));
//       this.applyTheme();
//     },
//     applyTheme() {
//       const root = document.documentElement;
//       if (this.isDark) {
//         root.classList.add("dark");
//       } else {
//         root.classList.remove("dark");
//       }
//     },
//   },
// });

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
