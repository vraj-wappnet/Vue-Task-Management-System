<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6">
          <v-card-title class="text-center mb-6">
            <h2>{{ $t("auth.signIn") }}</h2>
          </v-card-title>

          <google-sign-in-button />

          <v-alert v-if="authStore.error" type="error" class="mt-4">
            {{ authStore.error }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/authStore";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    GoogleSignInButton,
  },
  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },
});
</script>
