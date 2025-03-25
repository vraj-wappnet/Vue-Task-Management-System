<!-- <template>
  <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
    <v-text-field v-model="task.title" label="Title" :rules="titleRules" required></v-text-field>

    <v-textarea
      v-model="task.description"
      label="Description"
      :rules="descriptionRules"
      rows="3"
    ></v-textarea>

    <v-text-field
      v-model="task.dueDate"
      label="Due Date (dd-mm-yyyy)"
      :rules="dateRules"
      required
    ></v-text-field>

    <v-select
      v-model="task.priority"
      :items="priorityOptions"
      label="Priority"
      :rules="priorityRules"
      required
    ></v-select>

    <v-select
      v-model="task.status"
      :items="statusOptions"
      label="Status"
      :rules="statusRules"
      required
    ></v-select>

    <v-btn type="submit" color="primary" class="mr-4" :disabled="!valid">
      {{ submitButtonText }}
    </v-btn>

    <v-btn color="error" class="mr-4" @click="resetForm"> Reset </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { Task, Priority, Status } from "@/models/task";
import { parse, isValid, format } from "date-fns";

export default defineComponent({
  name: "TaskForm",
  props: {
    initialTask: {
      type: Object as PropType<Omit<Task, "id" | "createdAt" | "updatedAt">>,
      required: false,
      default: () => ({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium" as Priority,
        status: "Pending" as Status,
      }),
    },
    submitButtonText: {
      type: String,
      default: "Submit",
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const form = ref();
    const valid = ref(false);
    const task = ref({ ...props.initialTask });

    watch(
      () => props.initialTask,
      (newVal) => {
        task.value = { ...newVal };
      }
    );

    const priorityOptions = ["Low", "Medium", "High"];
    const statusOptions = ["Pending", "In Progress", "Completed"];

    const titleRules = [
      (v: string) => !!v || "Title is required",
      (v: string) => (v && v.length <= 100) || "Title must be less than 100 characters",
    ];

    const descriptionRules = [
      (v: string) => !v || v.length <= 500 || "Description must be less than 500 characters",
    ];

    const dateRules = [
      (v: string) => !!v || "Date is required",
      (v: string) => {
        try {
          const date = parse(v, "dd-MM-yyyy", new Date());
          return isValid(date) || "Invalid date format (dd-mm-yyyy)";
        } catch {
          return "Invalid date format (dd-mm-yyyy)";
        }
      },
    ];

    const priorityRules = [(v: Priority) => !!v || "Priority is required"];

    const statusRules = [(v: Status) => !!v || "Status is required"];

    const handleSubmit = async () => {
      const { valid } = await form.value.validate();
      if (valid) {
        emit("submit", {
          ...task.value,
          dueDate: format(parse(task.value.dueDate, "dd-MM-yyyy", new Date()), "dd-MM-yyyy"),
        });
      }
    };

    const resetForm = () => {
      form.value.reset();
    };

    return {
      form,
      valid,
      task,
      priorityOptions,
      statusOptions,
      titleRules,
      descriptionRules,
      dateRules,
      priorityRules,
      statusRules,
      handleSubmit,
      resetForm,
    };
  },
});
</script> -->
<template>
  <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit" class="task-form">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="task.title"
            label="Title"
            :rules="titleRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-format-title"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="task.dueDate"
            label="Due Date (dd-mm-yyyy)"
            :rules="dateRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-calendar"
            placeholder="dd-mm-yyyy"
            hint="Format: dd-mm-yyyy"
            persistent-hint
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="task.description"
            label="Description"
            :rules="descriptionRules"
            variant="outlined"
            rows="3"
            prepend-inner-icon="mdi-text"
            clearable
            counter="500"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="task.priority"
            :items="priorityOptions"
            label="Priority"
            :rules="priorityRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-priority-high"
            :item-props="getPriorityProps"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="task.status"
            :items="statusOptions"
            label="Status"
            :rules="statusRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-progress-check"
            :item-props="getStatusProps"
          ></v-select>
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn color="error" variant="text" class="mr-4" @click="resetForm">
            <v-icon left>mdi-cancel</v-icon>
            Reset
          </v-btn>

          <v-btn
            type="submit"
            color="primary"
            :disabled="!valid"
            :loading="submitting"
            elevation="2"
          >
            <v-icon left>mdi-content-save</v-icon>
            {{ submitButtonText }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { Task, Priority, Status } from "@/models/task";
import { parse, isValid, format } from "date-fns";

export default defineComponent({
  name: "TaskForm",
  props: {
    initialTask: {
      type: Object as PropType<Omit<Task, "id" | "createdAt" | "updatedAt">>,
      default: () => ({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium" as Priority,
        status: "Pending" as Status,
      }),
    },
    submitButtonText: {
      type: String,
      default: "Submit",
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const form = ref();
    const valid = ref(false);
    const submitting = ref(false);
    const task = ref({ ...props.initialTask });

    watch(
      () => props.initialTask,
      (newVal) => {
        task.value = { ...newVal };
      },
      { deep: true }
    );

    const priorityOptions = ["Low", "Medium", "High"];
    const statusOptions = ["Pending", "In Progress", "Completed"];

    const titleRules = [
      (v: string) => !!v || "Title is required",
      (v: string) => v.length <= 100 || "Title must be less than 100 characters",
    ];

    const descriptionRules = [
      (v: string) => !v || v.length <= 500 || "Description must be less than 500 characters",
    ];

    const dateRules = [
      (v: string) => !!v || "Date is required",
      (v: string) => /^\d{2}-\d{2}-\d{4}$/.test(v) || "Invalid format (dd-mm-yyyy)",
      (v: string) => {
        const date = parse(v, "dd-MM-yyyy", new Date());
        return isValid(date) || "Invalid date";
      },
    ];

    const priorityRules = [(v: Priority) => !!v || "Priority is required"];
    const statusRules = [(v: Status) => !!v || "Status is required"];

    const getPriorityProps = (item: string) => ({
      color: {
        Low: "green",
        Medium: "orange",
        High: "red",
      }[item],
    });

    const getStatusProps = (item: string) => ({
      color: {
        Pending: "grey",
        "In Progress": "blue",
        Completed: "green",
      }[item],
    });

    const handleSubmit = async () => {
      const validation = await form.value.validate();
      if (!validation.valid) return;

      submitting.value = true;
      try {
        const formattedTask = {
          ...task.value,
          dueDate: format(parse(task.value.dueDate, "dd-MM-yyyy", new Date()), "dd-MM-yyyy"),
        };
        await emit("submit", formattedTask);
      } finally {
        submitting.value = false;
      }
    };

    const resetForm = () => {
      form.value.reset();
      task.value = { ...props.initialTask };
    };

    return {
      form,
      valid,
      submitting,
      task,
      priorityOptions,
      statusOptions,
      titleRules,
      descriptionRules,
      dateRules,
      priorityRules,
      statusRules,
      getPriorityProps,
      getStatusProps,
      handleSubmit,
      resetForm,
    };
  },
});
</script>

<style scoped>
.task-form {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
