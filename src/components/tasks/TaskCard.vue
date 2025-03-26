<template>
  <v-card class="mb-4" :class="priorityClass" elevation="2" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center py-2">
      <span class="text-subtitle-1 font-weight-medium">{{ task.title }}</span>
      <v-tooltip location="top">
        <template #activator="{ props }">
          <v-chip v-bind="props" small :color="priorityColor" class="white--text font-weight-bold">
            {{ task.priority }}
          </v-chip>
        </template>
        <span>Priority: {{ task.priority }}</span>
      </v-tooltip>
    </v-card-title>

    <v-card-subtitle class="py-1"> Due: {{ formatDate(task.dueDate) }} </v-card-subtitle>

    <v-card-text class="pt-2">
      <p v-if="task.description" class="text-body-2">{{ task.description }}</p>
      <p v-else class="text-grey text-body-2 font-italic">No description</p>
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
        {{ task.status }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Task } from "@/models/task";
import { parse } from "date-fns";

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

    const formatDate = (date: string) => {
      const parsedDate = parse(date, "dd-MM-yyyy", new Date());
      return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    return {
      priorityColor,
      priorityClass,
      statusColor,
      formatDate,
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
