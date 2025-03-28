<template>
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
      >
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useI18nStore } from "@/stores/i18nStore";
import { useI18n } from "vue-i18n";
const i18nStore = useI18nStore();
const { locale } = useI18n();
const availableLanguages = i18nStore.availableLanguages;
const currentLanguage = i18nStore.currentLanguage;
const setLocale = (newLocale) => {
  i18nStore.setLocale(newLocale);
  locale.value = newLocale;
};
</script>
