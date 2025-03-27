<template>
  <v-app :theme="theme">
    <v-app-bar app color="primary" elevation="2" prominent height="64" class="gradient-bar">
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click="drawer = !drawer" class="ml-2">
          <v-icon size="large">mdi-menu</v-icon>
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="text-h5 font-weight-bold text-uppercase">
        {{ $t("app.title") }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <!-- Language Selector -->
        <v-menu offset-y transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              class="text-capitalize mr-2"
              prepend-icon="mdi-translate"
            >
              {{ currentLanguage }}
            </v-btn>
          </template>
          <v-list dense class="py-0">
            <v-list-item
              v-for="lang in availableLanguages"
              :key="lang.locale"
              @click="setLocale(lang.locale)"
              class="hover-effect"
            >
              <v-list-item-title>{{ lang.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Theme Toggle Button -->
        <v-btn
          icon
          variant="text"
          @click="toggleTheme"
          :title="$t(isDark ? 'actions.switchToLight' : 'actions.switchToDark')"
          class="mr-2"
        >
          <v-icon size="large">{{ isDark ? "mdi-weather-sunny" : "mdi-weather-night" }}</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary width="300" class="pa-4">
      <div class="d-flex flex-column h-100">
        <v-list nav class="flex-grow-0">
          <v-list-item
            v-for="item in menuItems"
            :key="item.translationKey"
            :to="item.route"
            active-class="bg-primary-lighten-4"
            class="mb-2 rounded-lg"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" class="mr-4"></v-icon>
            </template>

            <v-list-item-title class="font-weight-medium">
              {{ $t(item.translationKey) }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-6">
        <router-view v-slot="{ Component }">
          <v-fade-transition mode="out-in">
            <component :is="Component" />
          </v-fade-transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/themeStore";
import { useI18nStore } from "@/stores/i18nStore";

// Vuetify theme
const theme = useTheme();
const themeStore = useThemeStore();
const i18nStore = useI18nStore();
const { locale } = useI18n();

const isDark = computed(() => themeStore.theme === "dark");
const drawer = ref(false);

const menuItems = [
  { translationKey: "app.dashboard", icon: "mdi-view-dashboard", route: { name: "dashboard" } },
  { translationKey: "app.createTask", icon: "mdi-plus", route: { name: "task-create" } },
];

// Toggle light/dark mode
const toggleTheme = () => {
  themeStore.toggleTheme();
  theme.global.name.value = themeStore.theme;
  document.documentElement.setAttribute("data-theme", themeStore.theme);
  updateThemeMeta(themeStore.theme);
};

// Update meta tag for mobile theme color
const updateThemeMeta = (theme) => {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#121212" : "#1976D2");
  }
};

// Language selection
const availableLanguages = computed(() => i18nStore.availableLanguages);
const currentLanguage = computed(() => i18nStore.currentLanguage);

const setLocale = (newLocale) => {
  i18nStore.setLocale(newLocale);
  locale.value = newLocale;
};

// Sync theme and language on app mount
onMounted(() => {
  themeStore.initializeTheme();
  theme.global.name.value = themeStore.theme;
  document.documentElement.setAttribute("data-theme", themeStore.theme);
  updateThemeMeta(themeStore.theme);

  setLocale(i18nStore.locale);
});
</script>

<style>
/* Light and Dark mode styles */
[data-theme="light"] {
  background-color: #ffffff;
  color: #121212;
}

[data-theme="dark"] {
  background-color: #121212;
  color: #ffffff;
}
</style>
