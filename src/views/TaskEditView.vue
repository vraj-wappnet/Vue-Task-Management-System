<!-- <template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card>
          <v-card-title>Edit Task</v-card-title>
          <v-card-text>
            <task-form
              v-if="task"
              ref="taskForm"
              :initial-task="task"
              submit-button-text="Update Task"
              @submit="updateTask"
            />
            <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
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
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "@/stores/taskStore";
import TaskForm from "@/components/tasks/TaskForm.vue";
import { Task } from "@/models/task";

export default defineComponent({
  name: "TaskEditView",
  components: { TaskForm },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const taskStore = useTaskStore();
    const taskForm = ref<InstanceType<typeof TaskForm>>();
    const task = ref<Task | null>(null);

    onMounted(() => {
      const taskId = props.id || (route.params.id as string);
      const foundTask = taskStore.getTaskById(taskId);
      if (foundTask) {
        task.value = foundTask;
      } else {
        router.push({ name: "not-found" });
      }
    });

    const updateTask = (taskData: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>) => {
      if (task.value) {
        taskStore.updateTask(task.value.id, taskData);
        router.push({ name: "dashboard" });
      }
    };

    return {
      taskForm,
      task,
      updateTask,
    };
  },
});
</script> -->

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card>
          <v-card-title>{{ $t("actions.edit") }}</v-card-title>
          <v-card-text>
            <task-form
              v-if="task"
              ref="taskForm"
              :initial-task="task"
              :submit-button-text="$t('actions.save')"
              @submit="updateTask"
            />
            <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="$router.go(-1)">
              {{ $t("actions.cancel") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "@/stores/taskStore";
import TaskForm from "@/components/tasks/TaskForm.vue";
import { Task } from "@/models/task";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "TaskEditView",
  components: { TaskForm },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const taskStore = useTaskStore();
    const taskForm = ref<InstanceType<typeof TaskForm>>();
    const task = ref<Task | null>(null);

    onMounted(() => {
      const taskId = props.id || (route.params.id as string);
      const foundTask = taskStore.getTaskById(taskId);
      if (foundTask) {
        task.value = foundTask;
      } else {
        router.push({ name: "not-found" });
      }
    });

    const updateTask = (taskData: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>) => {
      if (task.value) {
        taskStore.updateTask(task.value.id, taskData);
        router.push({ name: "dashboard" });
      }
    };

    return {
      taskForm,
      task,
      updateTask,
      t,
    };
  },
});
</script>
