<!-- <template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12">
        <v-toolbar flat>
          <v-toolbar-title>Task Dashboard</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" prepend-icon="mdi-plus" @click="navigateToCreate">
            New Task
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-tabs v-model="tab" grow>
          <v-tab value="list">List View</v-tab>
          <v-tab value="kanban">Kanban View</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="list">
            <task-list :tasks="taskStore.allTasks" @edit="navigateToEdit" @delete="deleteTask" />
          </v-window-item>

          <v-window-item value="kanban">
            <task-kanban @edit="navigateToEdit" @delete="deleteTask" />
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template> -->
<!-- <script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/taskStore";
import TaskList from "../components/tasks/TaskList.vue";
import TaskKanban from "../components/tasks/TaskKanban.vue";

export default defineComponent({
  name: "DashboardView",
  components: { TaskList, TaskKanban },
  setup() {
    const router = useRouter();
    const taskStore = useTaskStore();
    const tab = ref("list");

    const navigateToCreate = () => {
      router.push({ name: "task-create" });
    };

    const navigateToEdit = (id: string) => {
      router.push({ name: "task-edit", params: { id } });
    };

    const deleteTask = (id: string) => {
      if (confirm("Are you sure you want to delete this task?")) {
        taskStore.deleteTask(id);
      }
    };

    return {
      tab,
      taskStore,
      navigateToCreate,
      navigateToEdit,
      deleteTask,
    };
  },
});
</script> -->

<template>
  <v-container fluid class="pa-1 mt-auto">
    <v-row>
      <v-col cols="12">
        <v-card elevation="0" class="mb-4 pa-4 d-flex align-center">
          <div>
            <h2 class="text-h4 font-weight-bold text-primary">Task Dashboard</h2>
          </div>

          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            prepend-icon="mdi-plus"
            @click="navigateToCreate"
          >
            Create New Task
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-tabs v-model="tab" grow color="primary" bg-color="surface">
            <v-tab value="list" class="font-weight-medium">
              <v-icon start>mdi-view-list</v-icon>
              List View
              <v-chip color="primary" variant="flat" size="small" class="ml-2">
                {{ taskStore.allTasks.length }}
              </v-chip>
            </v-tab>
            <v-tab value="kanban" class="font-weight-medium">
              <v-icon start>mdi-view-column</v-icon>
              Kanban View
            </v-tab>
          </v-tabs>

          <v-divider></v-divider>

          <v-window v-model="tab" class="pa-4">
            <v-window-item value="list">
              <v-fade-transition mode="out-in">
                <task-list
                  :tasks="taskStore.allTasks"
                  @edit="navigateToEdit"
                  @delete="deleteTask"
                />
              </v-fade-transition>
            </v-window-item>

            <v-window-item value="kanban">
              <v-fade-transition mode="out-in">
                <task-kanban @edit="navigateToEdit" @delete="deleteTask" />
              </v-fade-transition>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>

    <!-- Enhanced Confirmation Dialog -->
    <v-dialog v-model="confirmDelete" max-width="450" persistent>
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="warning" size="large"> mdi-alert-circle-outline </v-icon>
          Confirm Task Deletion
        </v-card-title>

        <v-card-text class="text-body-1">
          Are you sure you want to permanently delete this task? This action cannot be undone and
          will remove the task from all views.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="confirmDelete = false"> Cancel </v-btn>

          <v-btn color="error" variant="elevated" @click="confirmDeleteTask"> Delete Task </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/taskStore";
import TaskList from "../components/tasks/TaskList.vue";
import TaskKanban from "../components/tasks/TaskKanban.vue";

export default defineComponent({
  name: "DashboardView",
  components: { TaskList, TaskKanban },
  setup() {
    const router = useRouter();
    const taskStore = useTaskStore();
    const tab = ref("list");
    const confirmDelete = ref(false);
    const taskToDelete = ref<string | null>(null);

    const navigateToCreate = () => {
      router.push({ name: "task-create" });
    };

    const navigateToEdit = (id: string) => {
      router.push({ name: "task-edit", params: { id } });
    };

    const deleteTask = (id: string) => {
      taskToDelete.value = id;
      confirmDelete.value = true;
    };

    const confirmDeleteTask = () => {
      if (taskToDelete.value) {
        taskStore.deleteTask(taskToDelete.value);
      }
      confirmDelete.value = false;
      taskToDelete.value = null;
    };

    return {
      tab,
      taskStore,
      confirmDelete,
      navigateToCreate,
      navigateToEdit,
      deleteTask,
      confirmDeleteTask,
    };
  },
});
</script>

<style scoped>
.v-tab {
  text-transform: capitalize !important;
}
/* Smooth transitions for window items */
.v-window-item-enter-active,
.v-window-item-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-window-item-enter-from,
.v-window-item-leave-to {
  opacity: 0;
}
</style>
