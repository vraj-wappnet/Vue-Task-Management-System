<!-- <template>
  <div class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="filteredTasks.length === 0"
          type="info"
          variant="tonal"
          rounded="lg"
          class="mb-4"
        >
          <v-icon left>mdi-information-outline</v-icon>
          No tasks found
        </v-alert>

        <v-row v-else dense>
          <v-col v-for="task in filteredTasks" :key="task.id" cols="12" sm="6" md="4">
            <task-card
              :task="task"
              @edit="$emit('edit', $event)"
              @delete="$emit('delete', $event)"
              class="task-card fill-height"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { Task, Priority } from "@/models/task";
import TaskCard from "./TaskCard.vue";

interface PriorityOption {
  text: string;
  value: Priority;
}

export default defineComponent({
  name: "TaskList",
  components: { TaskCard },
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
      validator: (value: Task[]) => Array.isArray(value),
    },
  },
  emits: {
    edit: (id: string) => typeof id === "string",
    delete: (id: string) => typeof id === "string",
  },
  setup(props) {
    const search = ref<string>("");
    const priorityFilter = ref<Priority | null>(null);

    const priorityOptions = computed<PriorityOption[]>(() => [
      { text: "Low", value: "Low" },
      { text: "Medium", value: "Medium" },
      { text: "High", value: "High" },
    ]);

    const filteredTasks = computed<Task[]>(() => {
      let filtered = [...props.tasks];

      if (search.value) {
        const searchTerm = search.value.toLowerCase();
        filtered = filtered.filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm) ||
            (task.description && task.description.toLowerCase().includes(searchTerm))
        );
      }

      if (priorityFilter.value) {
        filtered = filtered.filter((task) => task.priority === priorityFilter.value);
      }

      return filtered;
    });

    return {
      search,
      priorityFilter,
      priorityOptions,
      filteredTasks,
    };
  },
});
</script>

<style scoped>
.task-card {
  transition: transform 0.2s ease-in-out;
  height: 100%; /* Ensure it fills the parent height */
  display: flex; /* Make it a flex container */
  flex-direction: column; /* Stack content vertically */
}

.task-card:hover {
  transform: translateY(-4px);
}

/* Ensure all columns have equal height */
.v-row > .v-col {
  display: flex;
  flex-direction: column;
}

/* Optional: Set a minimum height for consistency */
.task-card {
  min-height: 200px; /* Adjust this value as needed */
  width: 100%; /* Ensure full width within column */
}
</style> -->

<template>
  <div class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="filteredTasks.length === 0"
          type="info"
          variant="tonal"
          rounded="lg"
          class="mb-4"
        >
          <v-icon left>mdi-information-outline</v-icon>
          {{ $t("task.noTasks") }}
        </v-alert>

        <v-row v-else dense>
          <v-col v-for="task in filteredTasks" :key="task.id" cols="12" sm="6" md="4">
            <task-card
              :task="task"
              @edit="$emit('edit', $event)"
              @delete="$emit('delete', $event)"
              class="task-card fill-height"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { Task, Priority } from "@/models/task";
import TaskCard from "./TaskCard.vue";
import { useI18n } from "vue-i18n";

interface PriorityOption {
  text: string;
  value: Priority;
}

export default defineComponent({
  name: "TaskList",
  components: { TaskCard },
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
      validator: (value: Task[]) => Array.isArray(value),
    },
  },
  emits: {
    edit: (id: string) => typeof id === "string",
    delete: (id: string) => typeof id === "string",
  },
  setup(props) {
    const { t } = useI18n(); // Initialize i18n
    const search = ref<string>("");
    const priorityFilter = ref<Priority | null>(null);

    const priorityOptions = computed<PriorityOption[]>(() => [
      { text: t("task.priorities.low"), value: "Low" },
      { text: t("task.priorities.medium"), value: "Medium" },
      { text: t("task.priorities.high"), value: "High" },
    ]);

    const filteredTasks = computed<Task[]>(() => {
      let filtered = [...props.tasks];

      if (search.value) {
        const searchTerm = search.value.toLowerCase();
        filtered = filtered.filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm) ||
            (task.description && task.description.toLowerCase().includes(searchTerm))
        );
      }

      if (priorityFilter.value) {
        filtered = filtered.filter((task) => task.priority === priorityFilter.value);
      }

      return filtered;
    });

    return {
      search,
      priorityFilter,
      priorityOptions,
      filteredTasks,
      t,
    };
  },
});
</script>

<style scoped>
.task-card {
  transition: transform 0.2s ease-in-out;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.task-card:hover {
  transform: translateY(-4px);
}

/* Ensure all columns have equal height */
.v-row > .v-col {
  display: flex;
  flex-direction: column;
}

/* Optional: Set a minimum height for consistency */
.task-card {
  min-height: 200px;
  width: 100%;
}
</style>
