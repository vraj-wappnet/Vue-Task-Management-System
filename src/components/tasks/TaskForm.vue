<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="handleSubmit"
    class="task-form"
    :class="{ 'dark-form': isDark }"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="task.title"
            :label="$t('task.title')"
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
            :label="$t('task.dueDate')"
            :rules="dateRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-calendar"
            :placeholder="$t('task.dueDate')"
            :hint="$t('validation.dateFormat')"
            persistent-hint
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="task.description"
            :label="$t('task.description')"
            :rules="descriptionRules"
            variant="outlined"
            rows="3"
            prepend-inner-icon="mdi-text"
            clearable
            :counter="500"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <!-- <v-select
            v-model="task.priority"
            :items="priorityOptions"
            :label="$t('task.priority')"
            :rules="priorityRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-priority-high"
            :item-props="getPriorityProps"
          ></v-select> -->
          <v-select
            v-model="task.priority"
            :items="priorityOptions"
            item-title="text"
            item-value="value"
            :label="$t('task.priority')"
            :rules="priorityRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-priority-high"
            :item-props="getPriorityProps"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <!-- <v-select
            v-model="task.status"
            :items="statusOptions"
            :label="$t('task.status')"
            :rules="statusRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-progress-check"
            :item-props="getStatusProps"
          ></v-select> -->
          <v-select
            v-model="task.status"
            :items="statusOptions"
            item-title="text"
            item-value="value"
            :label="$t('task.status')"
            :rules="statusRules"
            variant="outlined"
            required
            prepend-inner-icon="mdi-progress-check"
            :item-props="getStatusProps"
          ></v-select>
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn color="error" :variant="isDark ? 'tonal' : 'text'" class="mr-4" @click="resetForm">
            <v-icon left>mdi-cancel</v-icon>
            {{ $t("actions.reset") }}
          </v-btn>

          <v-btn
            type="submit"
            color="primary"
            :variant="isDark ? 'tonal' : 'elevated'"
            :disabled="!valid"
            :loading="submitting"
          >
            <v-icon left>mdi-content-save</v-icon>
            {{ $t(submitButtonTranslationKey) }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from "vue";
import { Task, Priority, Status } from "@/models/task";
import { parse, isValid, format } from "date-fns";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";

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
    const { t } = useI18n();
    const theme = useTheme();
    const isDark = computed(() => theme.global.current.value.dark);

    const form = ref();
    const valid = ref(false);
    const submitting = ref(false);
    const task = ref({ ...props.initialTask });

    watch(
      () => props.initialTask,
      (newVal) => {
        task.value = { ...newVal };
      }
    );

    const priorityOptions = computed(() => [
      { value: "Low", text: t("task.priorities.low") },
      { value: "Medium", text: t("task.priorities.medium") },
      { value: "High", text: t("task.priorities.high") },
    ]);

    const statusOptions = computed(() => [
      { value: "Pending", text: t("task.statuses.pending") },
      { value: "In Progress", text: t("task.statuses.inProgress") },
      { value: "Completed", text: t("task.statuses.completed") },
    ]);

    const submitButtonTranslationKey = computed(() =>
      props.submitButtonText === "Submit" ? "actions.save" : props.submitButtonText.toLowerCase()
    );

    const titleRules = [
      (v: string) => !!v || t("validation.required", { field: t("task.title") }),
      (v: string) =>
        v.length <= 100 ||
        t("validation.maxLength", {
          field: t("task.title"),
          max: 100,
        }),
    ];

    const descriptionRules = [
      (v: string) =>
        !v ||
        v.length <= 500 ||
        t("validation.maxLength", {
          field: t("task.description"),
          max: 500,
        }),
    ];

    const dateRules = [
      (v: string) => !!v || t("validation.required", { field: t("task.dueDate") }),
      (v: string) => /^\d{2}-\d{2}-\d{4}$/.test(v) || t("validation.dateFormat"),
      (v: string) => {
        const date = parse(v, "dd-MM-yyyy", new Date());
        return isValid(date) || t("validation.invalidDate");
      },
    ];

    const priorityRules = [
      (v: Priority) => !!v || t("validation.required", { field: t("task.priority") }),
    ];

    const statusRules = [
      (v: Status) => !!v || t("validation.required", { field: t("task.status") }),
    ];

    const getPriorityProps = (item: { value: string }) => ({
      color: isDark.value
        ? {
            Low: "green-darken-2",
            Medium: "orange-darken-2",
            High: "red-darken-2",
          }[item.value]
        : {
            Low: "green",
            Medium: "orange",
            High: "red",
          }[item.value],
    });

    const getStatusProps = (item: { value: string }) => ({
      color: isDark.value
        ? {
            Pending: "grey-darken-2",
            "In Progress": "blue-darken-2",
            Completed: "green-darken-2",
          }[item.value]
        : {
            Pending: "grey",
            "In Progress": "blue",
            Completed: "green",
          }[item.value],
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
      isDark,
      form,
      valid,
      submitting,
      task,
      priorityOptions,
      statusOptions,
      submitButtonTranslationKey,
      titleRules,
      descriptionRules,
      dateRules,
      priorityRules,
      statusRules,
      getPriorityProps,
      getStatusProps,
      handleSubmit,
      resetForm,
      t,
    };
  },
});
</script>

<style scoped>
.task-form {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgb(var(--v-theme-surface));
  transition: background-color 0.3s ease;
}

.dark-form {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.task-form :deep(.v-input__details) {
  color: rgba(var(--v-theme-on-surface), 0.7);
}
</style>
