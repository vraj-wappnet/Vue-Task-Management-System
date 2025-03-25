<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" class="text-center">
        <v-icon size="100" color="error">mdi-alert-circle-outline</v-icon>
        <h1 class="text-h3 mt-4">404 - Page Not Found</h1>
        <p class="text-body-1 mt-4">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <v-btn color="primary" class="mt-6" @click="$router.push({ name: 'dashboard' })">
          Go to Dashboard
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFoundView",
});
</script>
