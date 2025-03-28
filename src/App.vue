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

          <!-- Auth Section -->
          <template v-if="authStore.isLoading">
            <v-progress-circular indeterminate size="24" color="white" />
          </template>
          <template v-else>
            <user-profile v-if="authStore.isAuthenticated" />
            <google-sign-in-button v-else color="white" />
          </template>
        </div>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary width="300" class="pa-4">
      <div class="d-flex flex-column h-100">
        <v-list nav class="flex-grow-0">
          <v-list-item
            v-for="item in filteredMenuItems"
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

        <!-- User Info in Drawer -->
        <div v-if="authStore.isAuthenticated" class="mt-auto pa-4 text-center">
          <v-avatar size="72" class="mb-2">
            <v-img v-if="authStore.photoURL" :src="authStore.photoURL" />
            <v-icon v-else size="72">mdi-account-circle</v-icon>
          </v-avatar>
          <h3 class="text-h6">{{ authStore.displayName }}</h3>
          <p class="text-caption">{{ authStore.user?.email }}</p>
          <v-btn color="error" variant="outlined" @click="authStore.signOut()" class="mt-4">
            <v-icon left>mdi-logout</v-icon>
            {{ $t("auth.signOut") }}
          </v-btn>
        </div>
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
import { useAuthStore } from "@/stores/authStore";
import UserProfile from "@/components/auth/UserProfile.vue";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton.vue";

// Stores
const theme = useTheme();
const themeStore = useThemeStore();
const i18nStore = useI18nStore();
const authStore = useAuthStore();
const { locale } = useI18n();

// State
const isDark = computed(() => themeStore.theme === "dark");
const drawer = ref(false);

// Menu items with conditional rendering
const menuItems = [
  {
    translationKey: "app.dashboard",
    icon: "mdi-view-dashboard",
    route: { name: "dashboard" },
    requiresAuth: false,
  },
  {
    translationKey: "app.dashboardMain",
    icon: "mdi-chart-line",
    route: { name: "dashboardMain" },
    requiresAuth: true,
  },
  {
    translationKey: "app.createTask",
    icon: "mdi-plus",
    route: { name: "task-create" },
    requiresAuth: true,
  },
];

// Filter menu items based on auth status
const filteredMenuItems = computed(() => {
  return menuItems.filter((item) => !item.requiresAuth || authStore.isAuthenticated);
});

// Theme management
const toggleTheme = () => {
  themeStore.toggleTheme();
  theme.global.name.value = themeStore.theme;
  document.documentElement.setAttribute("data-theme", themeStore.theme);
  updateThemeMeta(themeStore.theme);
};

const updateThemeMeta = (theme: string) => {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#121212" : "#1976D2");
  }
};

// Language management
const availableLanguages = computed(() => i18nStore.availableLanguages);
const currentLanguage = computed(() => i18nStore.currentLanguage);

const setLocale = (newLocale: string) => {
  i18nStore.setLocale(newLocale as "en" | "fr");
  locale.value = newLocale;
};

// Initialize app
onMounted(async () => {
  themeStore.initializeTheme();
  theme.global.name.value = themeStore.theme;
  document.documentElement.setAttribute("data-theme", themeStore.theme);
  updateThemeMeta(themeStore.theme);

  setLocale(i18nStore.locale);

  // Initialize auth state
  await authStore.initializeAuth();
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
  backdrop-filter: blur(4px);
}

/* Hover effects for menu items */
.hover-effect {
  transition: background-color 0.3s ease;
}

.hover-effect:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

/* Responsive language menu */
.language-menu {
  min-width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Adjust text size for smaller screens */
@media (max-width: 600px) {
  .v-app-bar-title {
    font-size: 1rem !important;
  }
}

.full-title {
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
  flex: 1 1 auto;
  min-width: 0;
}

/* Responsive adjustments for small screens */
@media (max-width: 600px) {
  .full-title {
    font-size: 0.75rem !important;
    padding: 0 4px;
    text-align: center;
    max-width: 100%;
  }
}

/* Smooth transitions for theme changes */
.v-application {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Custom scrollbar that respects theme */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(var(--v-theme-background), 0.1);
}
::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.5);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.8);
}
</style>
