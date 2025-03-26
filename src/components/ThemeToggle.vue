<template>
  <button @click="toggleTheme" class="theme-toggle">
    <span v-if="isDark">☀️ Light Mode</span>
    <span v-else>🌙 Dark Mode</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useThemeStore } from "@/stores/themeStore";

export default defineComponent({
  setup() {
    const themeStore = useThemeStore();

    const toggleTheme = () => {
      themeStore.toggleTheme();
    };

    return {
      toggleTheme,
      isDark: themeStore.isDark,
    };
  },
});
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.theme-toggle:hover {
  background-color: var(--primary-color);
  color: white;
}
</style>
