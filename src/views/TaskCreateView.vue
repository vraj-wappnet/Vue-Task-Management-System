<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card>
          <v-card-title>Create New Task</v-card-title>
          <v-card-text>
            <task-form ref="taskForm" submit-button-text="Create Task" @submit="createTask" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="$router.go(-1)"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/taskStore";
import TaskForm from "@/components/tasks/TaskForm.vue";
import { Task } from "@/models/task";

export default defineComponent({
  name: "TaskCreateView",
  components: { TaskForm },
  setup() {
    const router = useRouter();
    const taskStore = useTaskStore();
    const taskForm = ref<InstanceType<typeof TaskForm>>();

    const createTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
      taskStore.addTask(taskData);
      router.push({ name: "dashboard" });
    };

    return {
      taskForm,
      createTask,
    };
  },
});
</script>
