<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar size="36">
          <v-img v-if="photoURL" :src="photoURL" />
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-card width="300">
      <v-card-text class="text-center">
        <v-avatar size="72" class="mb-4">
          <v-img v-if="photoURL" :src="photoURL" />
          <v-icon v-else size="72">mdi-account-circle</v-icon>
        </v-avatar>
        <h3 class="text-h6">{{ displayName }}</h3>
        <p class="text-caption">{{ user?.email }}</p>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="error" @click="handleSignOut" :loading="isLoading">
          <v-icon left>mdi-logout</v-icon>
          {{ $t("auth.signOut") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";

export default defineComponent({
  name: "UserProfile",
  setup() {
    const authStore = useAuthStore();

    const handleSignOut = async () => {
      try {
        await authStore.signOut();
      } catch (error) {
        console.error("Sign out error:", error);
      }
    };

    return {
      user: computed(() => authStore.user),
      displayName: computed(() => authStore.displayName),
      photoURL: computed(() => authStore.photoURL),
      isLoading: computed(() => authStore.isLoading),
      handleSignOut,
    };
  },
});
</script>
