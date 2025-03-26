<template>
  <v-app>
    <v-app-bar app color="primary" elevation="2" prominent height="50">
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click="drawer = !drawer">
          <v-icon size="large">mdi-menu</v-icon>
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="text-h6 font-weight-bold"> Task Management System </v-app-bar-title>

      <template v-slot:append>
        <v-btn icon variant="text" @click="toggleDarkMode">
          <v-icon>{{ darkModeIcon }}</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary width="300" class="pa-4">
      <div class="d-flex flex-column h-100">
        <v-list nav class="flex-grow-0">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.route"
            active-class="bg-primary-lighten-4"
            class="mb-2 rounded-lg"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" class="mr-4"></v-icon>
            </template>

            <v-list-item-title class="font-weight-medium">
              {{ item.title }}
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

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const drawer = ref(false);
    const menuItems = [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: { name: "dashboard" } },
      { title: "Create Task", icon: "mdi-plus", route: { name: "task-create" } },
    ];

    return {
      drawer,
      menuItems,
    };
  },
});
</script>
