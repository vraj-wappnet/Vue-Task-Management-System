<template>
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
</script>
