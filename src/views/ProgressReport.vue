<template>
  <v-container fluid class="pa-6 bg-gray-50">
    <!-- Header Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card flat color="transparent">
          <v-card-title class="d-flex align-center justify-space-between px-0">
            <h1 class="text-h4 font-weight-bold text-gray-900 text-primary">
              {{ $t("dashboard.title") }}
            </h1>
            <div class="d-flex align-center">
              <!-- Search Input -->
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                :placeholder="$t('dashboard.searchPlaceholder')"
                clearable
                class="mr-4"
                dense
                solo
              ></v-text-field>

              <!-- Status Filter -->
              <v-btn-toggle
                v-model="statusFilter"
                mandatory
                class="mr-4 elevation-2 font-weight-bold"
                rounded
              >
                <v-btn
                  v-for="status in ['all', 'Pending', 'In Progress', 'Completed']"
                  :key="status"
                  :value="status"
                  class="px-4"
                >
                  {{
                    $t(`status.${status === "all" ? "all" : status.toLowerCase().replace(" ", "")}`)
                  }}
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Task List -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="4" rounded="lg" class="transition-all duration-300 hover:elevation-8">
          <v-card-title class="text-subtitle-1 font-weight-bold text-primary">
            {{ $t("dashboard.recentTasks") }}
          </v-card-title>
          <v-card-text>
            <task-list
              :tasks="filteredTasks"
              :loading="loading"
              @edit="$emit('edit', $event)"
              @delete="$emit('delete', $event)"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Metrics Cards -->
    <v-row class="mb-6">
      <v-col v-for="metric in metrics" :key="metric.title" cols="12" md="4">
        <v-card
          :color="metric.color"
          class="transition-all duration-300 hover:elevation-6 rounded-lg"
          elevation="4"
        >
          <v-card-title class="text-subtitle-1 text-white">
            {{ metric.title }}
          </v-card-title>
          <v-card-text class="text-h4 text-center text-white font-weight-bold">
            {{ metric.value }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Section -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card
          elevation="4"
          rounded="lg"
          class="h-full transition-all duration-300 hover:elevation-8"
        >
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ $t("dashboard.statusDistribution") }}
          </v-card-title>
          <v-card-text>
            <status-pie-chart :data="statusChartData" class="chart-container" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useI18n } from "vue-i18n";
import { parse, isBefore } from "date-fns";
import StatusPieChart from "@/components/charts/StatusPieChart.vue";
import TaskList from "@/components/tasks/TaskList.vue";

export default defineComponent({
  name: "ProgressReport",
  components: {
    StatusPieChart,
    TaskList,
  },
  setup() {
    const { t } = useI18n();
    const taskStore = useTaskStore();

    const statusFilter = ref("all");
    const searchQuery = ref(""); // Search input state
    const loading = ref(false);

    // Computed properties
    const totalTasks = computed(() => taskStore.allTasks.length);
    const completedTasks = computed(() => taskStore.completedTasks.length);
    const overdueTasks = computed(() => {
      return taskStore.allTasks.filter((task) => {
        const dueDate = parse(task.dueDate, "dd-MM-yyyy", new Date());
        return isBefore(dueDate, new Date()) && task.status !== "Completed";
      }).length;
    });

    const completionPercentage = computed(() => {
      return totalTasks.value > 0 ? Math.round((completedTasks.value / totalTasks.value) * 100) : 0;
    });

    const metrics = computed(() => [
      {
        title: t("dashboard.totalTasks"),
        value: totalTasks.value,
        color: "blue darken-2",
      },
      {
        title: t("dashboard.tasksCompleted"),
        value: `${completedTasks.value} (${completionPercentage.value}%)`,
        color: "green darken-2",
      },
      {
        title: t("dashboard.overdueTasks"),
        value: overdueTasks.value,
        color: "red darken-2",
      },
    ]);

    // Computed property for filtering tasks based on search and status
    const filteredTasks = computed(() => {
      let tasks = taskStore.allTasks;

      // Apply status filter
      if (statusFilter.value !== "all") {
        tasks = tasks.filter((task) => task.status === statusFilter.value);
      }

      // Apply search filter
      if (searchQuery.value.trim() !== "") {
        tasks = tasks.filter((task) =>
          task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return tasks.slice(0, 5); // Show only 5 recent tasks
    });

    const statusChartData = computed(() => ({
      labels: [t("status.pending"), t("status.inProgress"), t("status.completed")],
      datasets: [
        {
          data: [
            taskStore.pendingTasks.length,
            taskStore.inProgressTasks.length,
            taskStore.completedTasks.length,
          ],
          backgroundColor: ["#FF5252", "#FFC107", "#4CAF50"],
        },
      ],
    }));

    return {
      statusFilter,
      searchQuery,
      loading,
      metrics,
      filteredTasks,
      statusChartData,
      t,
    };
  },
});
</script>

<style scoped>
.chart-container {
  height: 300px;
  min-height: 250px;
}
</style>
