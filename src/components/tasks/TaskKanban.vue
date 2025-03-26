<!-- <template>
  <div class="pa-4">
    <v-row class="kanban-board">
      <v-col cols="12" md="4">
        <v-card elevation="4" rounded="lg" class="kanban-card">
          <v-card-title class="text-h6 font-weight-bold red lighten-4 pa-3">
            <v-icon left color="red darken-2">mdi-clock-outline</v-icon>
            Pending
            <v-spacer />
            <v-chip color="red" text-color="white" size="small" class="font-weight-bold">
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
          <v-card-title class="text-h6 font-weight-bold orange lighten-4 pa-3">
            <v-icon left color="orange darken-2">mdi-progress-clock</v-icon>
            In Progress
            <v-spacer />
            <v-chip color="orange" text-color="white" size="small" class="font-weight-bold">
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
          <v-card-title class="text-h6 font-weight-bold green lighten-4 pa-3">
            <v-icon left color="green darken-2">mdi-check-circle-outline</v-icon>
            Completed
            <v-spacer />
            <v-chip color="green" text-color="white" size="small" class="font-weight-bold">
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
import { Task } from "@/models/task";
import { useTaskStore } from "@/stores/taskStore";
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  name: "TaskKanban",
  components: { draggable, TaskCard },
  emits: ["edit", "delete"],
  setup(_, { emit }) {
    const taskStore = useTaskStore();

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
      editTask: (id: string) => emit("edit", id),
      deleteTask: (id: string) => emit("delete", id),
    };
  },
});
</script>

<style scoped>
.kanban-board {
  margin: -8px; /* Offset for card padding */
}

.kanban-card {
  transition: all 0.3s ease;
  height: 100%;
  background-color: #fafafa;
}

.kanban-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.kanban-column {
  min-height: 200px;
  background-color: #ffffff;
  border-radius: 8px;
}

.task-list {
  min-height: 100px;
}

.task-card {
  transition: transform 0.2s ease-in-out;
  cursor: move;
  min-height: 200px; /* Adjust this value as needed */
  width: 100%;
}

.task-card:hover {
  transform: scale(1.02);
}

.v-card-title {
  display: flex;
  align-items: center;
}
</style> -->

<!-- 
<template>
  <div class="pa-4">
    <v-row class="kanban-board">
      <v-col cols="12" md="4">
        <v-card elevation="4" rounded="lg" class="kanban-card">
          <v-card-title class="text-h6 font-weight-bold pa-3" :class="statusHeaderClass('Pending')">
            <v-icon left :color="statusIconColor('Pending')">mdi-clock-outline</v-icon>
            Pending
            <v-spacer />
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
            In Progress
            <v-spacer />
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
            Completed
            <v-spacer />
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
import { Task } from "@/models/task";
import { useTaskStore } from "@/stores/taskStore";
import { useTheme } from "vuetify";
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  name: "TaskKanban",
  components: { draggable, TaskCard },
  emits: ["edit", "delete"],
  setup(_, { emit }) {
    const taskStore = useTaskStore();
    const theme = useTheme();

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
    };
  },
});
</script>

<style scoped>
.kanban-board {
  margin: -8px; /* Offset for card padding */
}

.kanban-card {
  transition: all 0.3s ease, background-color 0.3s ease;
  height: 100%;
  background-color: rgba(var(--v-theme-surface), 1);
}

.kanban-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.kanban-column {
  min-height: 200px;
  background-color: rgba(var(--v-theme-background), 0.5);
  border-radius: 8px;
}

.task-list {
  min-height: 100px;
}

.task-card {
  transition: transform 0.2s ease-in-out;
  cursor: move;
  min-height: 200px;
  width: 100%;
}

.task-card:hover {
  transform: scale(1.02);
}

.v-card-title {
  display: flex;
  align-items: center;
}

/* Dark mode specific adjustments */
.v-theme--dark {
  .kanban-card {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .kanban-column {
    background-color: rgba(var(--v-theme-surface), 0.7);
  }
}
</style> -->

<template>
  <div class="pa-4">
    <v-row class="kanban-board">
      <v-col cols="12" md="4">
        <v-card elevation="4" rounded="lg" class="kanban-card">
          <v-card-title class="text-h6 font-weight-bold pa-3" :class="statusHeaderClass('Pending')">
            <v-icon left :color="statusIconColor('Pending')">mdi-clock-outline</v-icon>
            {{ $t("task.statuses.pending") }}
            <v-spacer />
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
            <v-spacer />
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
            <v-spacer />
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
import { Task } from "@/models/task";
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
