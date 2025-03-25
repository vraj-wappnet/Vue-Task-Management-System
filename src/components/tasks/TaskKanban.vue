<template>
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
</style>
