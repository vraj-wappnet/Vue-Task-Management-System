// import { defineStore } from "pinia";
// import { languages, defaultLocale } from "@/locales";
// import type { Locale } from "@/locales"; // 👈 Use `type` for type-only imports

// export const useI18nStore = defineStore("i18n", {
//   state: () => ({
//     locale: (localStorage.getItem("locale") || defaultLocale) as Locale,
//   }),
//   persist: {
//     key: "language-preference",
//     storage: localStorage,
//   },
//   actions: {
//     setLocale(newLocale: Locale) {
//       this.locale = newLocale;
//       localStorage.setItem("locale", newLocale);
//     },
//   },
//   getters: {
//     currentLanguage: (state) => languages[state.locale].name,
//     availableLanguages: () =>
//       Object.entries(languages).map(([locale, config]) => ({
//         locale,
//         name: config.name,
//       })),
//   },
// });

import { defineStore } from "pinia";
import { languages, defaultLocale } from "@/locales";
import type { Locale } from "@/locales"; // 👈 Type-only import

export const useI18nStore = defineStore("i18n", {
  state: () => ({
    locale: (localStorage.getItem("locale") || defaultLocale) as Locale,
  }),
  actions: {
    setLocale(newLocale: Locale) {
      this.locale = newLocale;
    },
  },
  getters: {
    currentLanguage: (state) => languages[state.locale].name,
    availableLanguages: () =>
      Object.entries(languages).map(([locale, config]) => ({
        locale,
        name: config.name,
      })),
  },
  persist: {
    key: "language-preference",
    storage: localStorage, // Can also be sessionStorage
  },
});
