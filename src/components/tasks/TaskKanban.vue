<!-- <template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="bg-red-lighten-4">
            Pending
            <v-chip class="ml-2">{{ pendingTasks.length }}</v-chip>
          </v-card-title>
          <v-card-text>
            <draggable
              v-model="pendingTasks"
              group="tasks"
              item-key="id"
              @end="onDragEnd"
              class="kanban-column"
            >
              <template #item="{ element }">
                <task-card
                  :task="element"
                  @edit="$emit('edit', element.id)"
                  @delete="$emit('delete', element.id)"
                />
              </template>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="bg-orange-lighten-4">
            In Progress
            <v-chip class="ml-2">{{ inProgressTasks.length }}</v-chip>
          </v-card-title>
          <v-card-text>
            <draggable
              v-model="inProgressTasks"
              group="tasks"
              item-key="id"
              @end="onDragEnd"
              class="kanban-column"
            >
              <template #item="{ element }">
                <task-card
                  :task="element"
                  @edit="$emit('edit', element.id)"
                  @delete="$emit('delete', element.id)"
                />
              </template>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="bg-green-lighten-4">
            Completed
            <v-chip class="ml-2">{{ completedTasks.length }}</v-chip>
          </v-card-title>
          <v-card-text>
            <draggable
              v-model="completedTasks"
              group="tasks"
              item-key="id"
              @end="onDragEnd"
              class="kanban-column"
            >
              <template #item="{ element }">
                <task-card
                  :task="element"
                  @edit="$emit('edit', element.id)"
                  @delete="$emit('delete', element.id)"
                />
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
.kanban-column {
  min-height: 100px;
}
</style> -->

<template>
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
</style>
