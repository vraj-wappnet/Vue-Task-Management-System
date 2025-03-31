<template>
  <div class="pa-4">
    <v-row class="kanban-board">
      <v-col cols="12" md="4">
        <v-card elevation="4" rounded="lg" class="kanban-card">
          <v-card-title class="text-h6 font-weight-bold pa-3" :class="statusHeaderClass('Pending')">
            <v-icon left :color="statusIconColor('Pending')">mdi-clock-outline</v-icon>
            {{ $t("task.statuses.pending") }}
            <v-chip
              :color="statusChipColor('Pending')"
              text-color="white"
              size="small"
              class="font-weight-bold"
            >
              {{ pendingTasks.length }}
            </v-chip>
          </v-card-title>
          <v-card-text class="pa-4 kanban-column">
            <draggable
              v-model="pendingTasks"
              group="tasks"
              item-key="id"
              @end="onDragEnd"
              class="task-list"
            >
              <template #item="{ element }">
                <div class="mb-3">
                  <task-card
                    :task="element"
                    @edit="$emit('edit', element.id)"
                    @delete="$emit('delete', element.id)"
                    class="task-card"
                  />
                </div>
              </template>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="4" rounded="lg" class="kanban-card">
          <v-card-title
            class="text-h6 font-weight-bold pa-3"
            :class="statusHeaderClass('In Progress')"
          >
            <v-icon left :color="statusIconColor('In Progress')">mdi-progress-clock</v-icon>
            {{ $t("task.statuses.inProgress") }}
            <v-chip
              :color="statusChipColor('In Progress')"
              text-color="white"
              size="small"
              class="font-weight-bold"
            >
              {{ inProgressTasks.length }}
            </v-chip>
          </v-card-title>
          <v-card-text class="pa-4 kanban-column">
            <draggable
              v-model="inProgressTasks"
              group="tasks"
              item-key="id"
              @end="onDragEnd"
              class="task-list"
            >
              <template #item="{ element }">
                <div class="mb-3">
                  <task-card
                    :task="element"
                    @edit="$emit('edit', element.id)"
                    @delete="$emit('delete', element.id)"
                    class="task-card"
                  />
                </div>
              </template>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="4" rounded="lg" class="kanban-card">
          <v-card-title
            class="text-h6 font-weight-bold pa-3"
            :class="statusHeaderClass('Completed')"
          >
            <v-icon left :color="statusIconColor('Completed')">mdi-check-circle-outline</v-icon>
            {{ $t("task.statuses.completed") }}
            <v-chip
              :color="statusChipColor('Completed')"
              text-color="white"
              size="small"
              class="font-weight-bold"
            >
              {{ completedTasks.length }}
            </v-chip>
          </v-card-title>
          <v-card-text class="pa-4 kanban-column">
            <draggable
              v-model="completedTasks"
              group="tasks"
              item-key="id"
              @end="onDragEnd"
              class="task-list"
            >
              <template #item="{ element }">
                <div class="mb-3">
                  <task-card
                    :task="element"
                    @edit="$emit('edit', element.id)"
                    @delete="$emit('delete', element.id)"
                    class="task-card"
                  />
                </div>
              </template>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { Task } from "@/models/task";
import { useTaskStore } from "@/stores/taskStore";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  name: "TaskKanban",
  components: { draggable, TaskCard },
  emits: ["edit", "delete"],
  setup(_, { emit }) {
    const taskStore = useTaskStore();
    const theme = useTheme();
    const { t } = useI18n();

    const isDark = computed(() => theme.global.current.value.dark);

    // Status styling functions
    const statusHeaderClass = (status: string) => {
      const base = isDark.value ? "darken-3" : "lighten-4";
      switch (status) {
        case "Pending":
          return `red ${base}`;
        case "In Progress":
          return `orange ${base}`;
        case "Completed":
          return `green ${base}`;
        default:
          return `grey ${base}`;
      }
    };

    const statusIconColor = (status: string) => {
      const base = isDark.value ? "darken-2" : "darken-2";
      switch (status) {
        case "Pending":
          return `red ${base}`;
        case "In Progress":
          return `orange ${base}`;
        case "Completed":
          return `green ${base}`;
        default:
          return `grey ${base}`;
      }
    };

    const statusChipColor = (status: string) => {
      const base = isDark.value ? "darken-2" : "";
      switch (status) {
        case "Pending":
          return `red ${base}`;
        case "In Progress":
          return `orange ${base}`;
        case "Completed":
          return `green ${base}`;
        default:
          return `grey ${base}`;
      }
    };

    const pendingTasks = computed({
      get: () => taskStore.pendingTasks,
      set: (tasks) => updateTasksStatus(tasks, "Pending"),
    });

    const inProgressTasks = computed({
      get: () => taskStore.inProgressTasks,
      set: (tasks) => updateTasksStatus(tasks, "In Progress"),
    });

    const completedTasks = computed({
      get: () => taskStore.completedTasks,
      set: (tasks) => updateTasksStatus(tasks, "Completed"),
    });

    const updateTasksStatus = (tasks: Task[], status: Task["status"]) => {
      tasks.forEach((task) => {
        if (task.status !== status) {
          taskStore.updateTask(task.id, { status });
        }
      });
    };

    const onDragEnd = () => {
      // Additional logic if needed when drag ends
    };

    return {
      pendingTasks,
      inProgressTasks,
      completedTasks,
      onDragEnd,
      statusHeaderClass,
      statusIconColor,
      statusChipColor,
      editTask: (id: string) => emit("edit", id),
      deleteTask: (id: string) => emit("delete", id),
      t, // Add i18n to template
    };
  },
});
</script>
