<template>
  <div>
    <!-- Text Button for Larger Screens -->
    <v-btn
      v-if="!isSmallScreen"
      variant="text"
      :loading="authStore.isLoading"
      @click="handleSignIn"
      class="text-capitalize d-none d-sm-flex"
      prepend-icon="mdi-google"
      :disabled="authStore.isLoading"
      :ripple="false"
    >
    </v-btn>

    <!-- Icon-Only Button for Smaller Screens -->
    <v-btn
      v-else
      variant="text"
      :loading="authStore.isLoading"
      @click="handleSignIn"
      class="d-sm-none"
      :disabled="authStore.isLoading"
      :ripple="false"
    >
      <v-icon>mdi-google</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/authStore";

export default defineComponent({
  name: "GoogleSignInButton",
  setup() {
    const authStore = useAuthStore();
    const isSmallScreen = ref(false);

    const handleSignIn = async () => {
      try {
        await authStore.signInWithGoogle();
      } catch (error) {
        console.error("Google sign-in error:", error);
      }
    };

    // Check screen size for responsive behavior
    const updateScreenSize = () => {
      isSmallScreen.value = window.innerWidth < 600; // Matches Vuetify's 'sm' breakpoint
    };

    onMounted(() => {
      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateScreenSize);
    });

    return {
      authStore,
      handleSignIn,
      isSmallScreen,
    };
  },
});
</script>
<style scoped>
/* Smooth Transitions */
.v-btn {
  transition: all 0.3s ease-in-out;
}

/* Hover Effect */
.v-btn:hover {
  background-color: rgba(var(--v-theme-blue-darken-1), 0.1);
}

/* Loading Spinner Alignment */
.v-btn--loading .v-icon {
  margin-right: 8px;
}

/* Ensure consistent text styling */
.text-capitalize {
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>
