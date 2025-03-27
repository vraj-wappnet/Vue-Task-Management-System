<template>
  <v-card class="mb-4" :class="priorityClass" elevation="2" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center py-2">
      <span class="text-subtitle-1 font-weight-medium">{{ translatedTitle }}</span>
      <v-tooltip location="top">
        <template #activator="{ props }">
          <v-chip v-bind="props" small :color="priorityColor" class="white--text font-weight-bold">
            {{ $t(`task.priorities.${task.priority.toLowerCase()}`) }}
          </v-chip>
        </template>
        <span>
          {{ $t("task.priority") }}:
          {{ $t(`task.priorities.${task.priority.toLowerCase()}`) }}
        </span>
      </v-tooltip>
    </v-card-title>

    <v-card-subtitle class="py-1">
      {{ $t("task.dueDate") }}: {{ formatDate(task.dueDate) }}
    </v-card-subtitle>

    <v-card-text class="pt-2">
      <p v-if="translatedDescription" class="text-body-2">{{ translatedDescription }}</p>
      <p v-else class="text-grey text-body-2 font-italic">{{ $t("task.noDescription") }}</p>
    </v-card-text>

    <v-card-actions class="pa-3">
      <v-btn icon color="primary" @click="$emit('edit', task.id)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon color="error" @click="$emit('delete', task.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-spacer />

      <v-chip small :color="statusColor" class="white--text">
        {{ $t(statusKey) }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Task } from "@/models/task";
import { parse } from "date-fns";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "TaskCard",
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  emits: ["edit", "delete"],
  setup(props) {
    const { t, locale } = useI18n();

    // Add translations for task titles and descriptions
    const taskTranslations = {
      "Setup Vue Project": {
        en: "Setup Vue Project",
        fr: "Configurer le projet Vue",
      },
      "Implement Task Form": {
        en: "Implement Task Form",
        fr: "Implémenter le formulaire de tâche",
      },
      "Write Documentation": {
        en: "Write Documentation",
        fr: "Rédiger la documentation",
      },
      "Create new Vue 3 project with TypeScript": {
        en: "Create new Vue 3 project with TypeScript",
        fr: "Créer un nouveau projet Vue 3 avec TypeScript",
      },
      "Create form for adding and editing tasks": {
        en: "Create form for adding and editing tasks",
        fr: "Créer un formulaire pour ajouter et modifier des tâches",
      },
      "Document all features and components": {
        en: "Document all features and components",
        fr: "Documenter toutes les fonctionnalités et composants",
      },
    };

    const translatedTitle = computed(() => {
      const translation = taskTranslations[props.task.title as keyof typeof taskTranslations];
      return translation ? translation[locale.value as "en" | "fr"] : props.task.title;
    });

    const translatedDescription = computed(() => {
      if (!props.task.description) return null;
      const translation = taskTranslations[props.task.description as keyof typeof taskTranslations];
      return translation ? translation[locale.value as "en" | "fr"] : props.task.description;
    });

    const priorityColor = computed(() => {
      switch (props.task.priority) {
        case "High":
          return "red";
        case "Medium":
          return "orange";
        case "Low":
          return "green";
        default:
          return "grey";
      }
    });

    const priorityClass = computed(() => {
      switch (props.task.priority) {
        case "High":
          return "border-left-red";
        case "Medium":
          return "border-left-orange";
        case "Low":
          return "border-left-green";
        default:
          return "";
      }
    });

    const statusColor = computed(() => {
      switch (props.task.status) {
        case "Completed":
          return "success";
        case "In Progress":
          return "warning";
        case "Pending":
          return "error";
        default:
          return "grey";
      }
    });

    const statusKey = computed(() => {
      const formattedKey = props.task.status
        .toLowerCase()
        .replace(/\s+(.)/g, (_, c) => c.toUpperCase());
      return `task.statuses.${formattedKey}`;
    });

    const formatDate = (date: string) => {
      const parsedDate = parse(date, "dd-MM-yyyy", new Date());
      return parsedDate.toLocaleDateString(locale.value, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    return {
      priorityColor,
      priorityClass,
      statusColor,
      statusKey,
      formatDate,
      translatedTitle,
      translatedDescription,
      t,
    };
  },
});
</script>

<style scoped>
.border-left-red {
  border-left: 4px solid #f44336;
}
.border-left-orange {
  border-left: 4px solid #ff9800;
}
.border-left-green {
  border-left: 4px solid #4caf50;
}

.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
