<template>
  <v-card class="mb-4" :class="priorityClass">
    <v-card-title class="d-flex justify-space-between">
      <span>{{ task.title }}</span>
      <v-chip small :color="priorityColor">{{ task.priority }}</v-chip>
    </v-card-title>

    <v-card-subtitle> Due: {{ task.dueDate }} </v-card-subtitle>

    <v-card-text>
      <p v-if="task.description">{{ task.description }}</p>
      <p v-else class="text-grey">No description</p>
    </v-card-text>

    <v-card-actions>
      <v-btn icon color="primary" @click="$emit('edit', task.id)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon color="error" @click="$emit('delete', task.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-chip :color="statusColor">{{ task.status }}</v-chip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Task } from "@/models/task";

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

    return {
      priorityColor,
      priorityClass,
      statusColor,
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
</style>
