import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import { languages, defaultLocale } from "@/locales";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// Vuetify setup
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { useAuthStore } from "./stores/authStore";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("locale") || defaultLocale,
  fallbackLocale: "en",
  messages: {
    en: languages.en.translation,
    fr: languages.fr.translation,
  },
});

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);
// Define options for Vue3Toastify
app.use(vuetify);

// app.mount("#app");
const authStore = useAuthStore();
authStore.initializeAuth().then(() => {
  app.mount("#app");
});
