<template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/taskStore";
import TaskList from "@/components/tasks/TaskList.vue";
import TaskKanban from "@/components/tasks/TaskKanban.vue";

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
</script>
