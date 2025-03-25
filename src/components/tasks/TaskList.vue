<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="search"
          label="Search tasks"
          prepend-inner-icon="mdi-magnify"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="priorityFilter"
          :items="priorityOptions"
          label="Filter by priority"
          item-title="text"
          item-value="value"
          clearable
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-alert v-if="filteredTasks.length === 0" type="info"> No tasks found </v-alert>

        <template v-else>
          <task-card
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @edit="$emit('edit', $event)"
            @delete="$emit('delete', $event)"
          />
        </template>
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
