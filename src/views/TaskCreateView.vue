<!-- <template>
  <v-container class="pa-5">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4" class="mx-auto" rounded="lg">
          <v-card-title class="text-h5 font-weight-bold primary white--text py-2">
            <v-icon left color="white">mdi-plus-circle</v-icon>
            Create New Task
          </v-card-title>

          <v-card-text class="pa-2 pt-0">
            <task-form ref="taskForm" submit-button-text="Create Task" @submit="createTask" />
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              color="secondary"
              variant="outlined"
              rounded
              class="px-4"
              @click="$router.go(-1)"
            >
              <v-icon left>mdi-arrow-left</v-icon>
              Cancel
            </v-btn>
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

<style scoped>
.v-card {
  transition: all 0.3s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}
</style> -->

<template>
  <v-container class="pa-5">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4" class="mx-auto" rounded="lg">
          <v-card-title class="text-h5 font-weight-bold primary white--text py-2">
            <v-icon left color="white">mdi-plus-circle</v-icon>
            {{ $t("app.createTask") }}
          </v-card-title>

          <v-card-text class="pa-2 pt-0">
            <task-form
              ref="taskForm"
              :submit-button-text="$t('actions.save')"
              @submit="createTask"
            />
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              color="secondary"
              variant="outlined"
              rounded
              class="px-4"
              @click="$router.go(-1)"
            >
              <v-icon left>mdi-arrow-left</v-icon>
              {{ $t("actions.cancel") }}
            </v-btn>
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
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "TaskCreateView",
  components: { TaskForm },
  setup() {
    const { t } = useI18n();
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
      t,
    };
  },
});
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}
</style>
