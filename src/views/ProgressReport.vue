<template>
  <v-container fluid class="pa-6 bg-gray-50">
    <!-- Header Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card flat color="transparent">
          <v-card-title class="px-0 pb-0">
            <h1 class="text-h4 font-weight-bold text-gray-900 text-primary mb-4">
              {{ $t("dashboard.title") }}
            </h1>
          </v-card-title>

          <div class="d-flex flex-column flex-sm-row align-center justify-start justify-sm-end">
            <!-- Search Input -->
            <v-text-field
              v-model="searchQuery"
              prepend-inner-icon="mdi-magnify"
              :placeholder="$t('dashboard.search')"
              clearable
              class="mr-sm-4 mb-3 mb-sm-0 search-field"
              style="max-width: 300px; width: 100%"
              solo
              flat
              background-color="grey lighten-5"
              dense
              rounded="lg"
              hide-details
              prepend-inner-icon-color="grey darken-1"
              clear-icon="mdi-close-circle"
              clear-icon-color="grey darken-2"
            ></v-text-field>

            <!-- Status Filter -->
            <v-btn-toggle
              v-model="statusFilter"
              mandatory
              class="elevation-2 font-weight-bold flex-wrap justify-center status-filter"
              rounded
              color="primary"
              group
            >
              <v-btn
                v-for="status in ['all', 'Pending', 'In Progress', 'Completed']"
                :key="status"
                :value="status"
                class="px-2 px-sm-4 ma-1 status-btn"
                :class="{ 'active-btn': statusFilter === status }"
                variant="flat"
              >
                {{
                  $t(`status.${status === "all" ? "all" : status.toLowerCase().replace(" ", "")}`)
                }}
              </v-btn>
            </v-btn-toggle>
          </div>
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
          class="metric-card transition-all duration-300 hover:elevation-6 rounded-lg"
          elevation="4"
        >
          <v-card-title class="text-subtitle-1 text-white font-weight-medium py-2">
            {{ metric.title }}
          </v-card-title>
          <v-card-text class="text-h4 text-center text-white font-weight-bold py-4">
            {{ metric.value }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Section -->

    <v-row class="mb-6">
      <v-col cols="12" md="12">
        <v-card
          elevation="4"
          rounded="lg"
          class="chart-card h-full transition-all duration-300 hover:elevation-8"
        >
          <v-card-title class="text-subtitle-1 font-weight-bold text-grey-darken-3 py-3">
            {{ $t("dashboard.statusDistribution") }}
          </v-card-title>
          <v-card-text class="pa-4">
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

    const metrics = computed(() => [
      {
        title: t("dashboard.totalTasks"),
        value: totalTasks.value,
        color: "blue darken-2",
      },
      {
        title: t("dashboard.tasksCompleted"),
        value: completedTasks.value,
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
      labels: [t("status.pending"), t("status.inprogress"), t("status.completed")],
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
.metric-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.metric-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1));
  z-index: 0;
  pointer-events: none; /* Ensures clicks pass through */
}

.metric-card:hover {
  transform: translateY(-4px); /* Slight lift on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important; /* Stronger shadow */
}

.metric-card .v-card-title,
.metric-card .v-card-text {
  position: relative; /* Ensures text stays above gradient */
  z-index: 1;
}

.metric-card .v-card-title {
  background-color: rgba(0, 0, 0, 0.1); /* Subtle overlay for title */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Light separator */
}

.metric-card .v-card-text {
  letter-spacing: 1px; /* Slight spacing for emphasis */
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .metric-card .v-card-title {
    font-size: 1rem !important; /* Smaller title on mobile */
  }

  .metric-card .v-card-text {
    font-size: 1.75rem !important; /* Smaller value on mobile */
  }
}
.chart-card {
  position: relative;
  background-color: #ffffff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top left, rgba(240, 240, 240, 0.5), transparent 70%);
  z-index: 0;
  pointer-events: none; /* Ensures clicks pass through */
  opacity: 0.8;
}

.chart-card:hover {
  transform: scale(1.02); /* Slight zoom on hover */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important; /* Enhanced shadow */
}

.chart-card .v-card-title,
.chart-card .v-card-text {
  position: relative; /* Keeps content above gradient */
  z-index: 1;
}

.chart-card .v-card-title {
  background: linear-gradient(to right, #f5f5f5, #ffffff); /* Subtle header gradient */
  border-bottom: 1px solid #e0e0e0; /* Light separator */
}

.chart-card .v-card-text {
  background-color: #fff; /* Ensures chart area is clean */
}

/* Chart Container */
.chart-container {
  height: 300px;
  min-height: 250px;
  transition: opacity 0.3s ease;
}

.chart-card:hover .chart-container {
  opacity: 0.95; /* Slight fade effect on hover */
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .chart-card .v-card-title {
    font-size: 1rem !important; /* Smaller title on mobile */
  }

  .chart-container {
    height: 200px; /* Reduced height on small screens */
  }
}
</style>
