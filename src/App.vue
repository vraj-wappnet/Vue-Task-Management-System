<template>
  <v-app :theme="theme.global.name.value">
    <v-app-bar app color="primary" elevation="2" height="56" class="gradient-bar px-2 px-sm-4">
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click="drawer = !drawer" class="ml-n1 ml-sm-2">
          <v-icon size="large">mdi-menu</v-icon>
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title
        class="text-body-1 text-sm-subtitle-1 font-weight-bold text-uppercase ml-n3 ml-sm-0 full-title"
      >
        {{ $t("app.title") }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <!-- Responsive Actions Container -->
        <div class="d-flex align-center">
          <!-- Language Selector -->
          <v-menu offset-y transition="slide-y-transition" content-class="language-menu">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="text-capitalize d-none d-sm-flex mr-2"
                prepend-icon="mdi-translate"
              >
                {{ currentLanguage }}
              </v-btn>
              <v-btn v-bind="props" icon variant="text" class="d-sm-none">
                <v-icon>mdi-translate</v-icon>
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
            class="mr-n1 mr-sm-2"
          >
            <v-icon size="large">
              {{ isDark ? "mdi-weather-sunny" : "mdi-weather-night" }}
            </v-icon>
          </v-btn>
        </div>
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
              <v-icon :icon="item.icon" class="mr-4" color="primary"></v-icon>
            </template>

            <v-list-item-title class="font-weight-medium">
              {{ $t(item.translationKey) }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-4 pa-sm-6">
        <router-view v-slot="{ Component }">
          <v-fade-transition mode="out-in">
            <component :is="Component" />
          </v-fade-transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
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
  {
    translationKey: "app.dashboardMain",
    icon: "mdi-chart-line",
    route: { name: "dashboardMain" },
  },
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
const updateThemeMeta = (theme: string) => {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#121212" : "#1976D2");
  }
};

// Language selection
const availableLanguages = computed(() => i18nStore.availableLanguages);
const currentLanguage = computed(() => i18nStore.currentLanguage);

const setLocale = (newLocale: string) => {
  i18nStore.setLocale(newLocale as "en" | "fr");
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

<style scoped>
/* Responsive adjustments */
.gradient-bar {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.9) 0%,
    rgba(var(--v-theme-primary), 0.7) 100%
  ) !important;
}

/* Hover effects for menu items */
.hover-effect {
  transition: background-color 0.3s ease;
}

.hover-effect:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

/* Responsive language menu */
.language-menu {
  min-width: 200px;
}

/* Adjust text size for smaller screens */
@media (max-width: 600px) {
  .v-app-bar-title {
    font-size: 1rem !important;
  }
}

full-title {
  white-space: nowrap; /* Prevent wrapping */
  overflow: visible; /* Allow overflow instead of hiding */
  text-overflow: clip; /* Disable ellipsis */
  flex: 1 1 auto; /* Take available space */
  min-width: 0; /* Prevent flex shrinkage */
}

/* Responsive adjustments for small screens */
@media (max-width: 600px) {
  .full-title {
    font-size: 0.75rem !important; /* Smaller size (12px) for long title */
    padding: 0 4px; /* Tighten padding */
    text-align: center; /* Center for balance */
    max-width: 100%; /* Ensure it fits within parent */
  }
}
</style>
