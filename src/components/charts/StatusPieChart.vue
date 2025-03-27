<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
import type { ChartData } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "StatusPieChart",
  props: {
    data: {
      type: Object as () => ChartData,
      required: true,
    },
  },
  setup(props) {
    const chart = ref<HTMLCanvasElement | null>(null);
    let chartInstance: Chart | null = null;

    onMounted(() => {
      if (chart.value) {
        renderChart();
      }
    });

    watch(
      () => props.data,
      () => {
        if (chartInstance) {
          chartInstance.data = props.data;
          chartInstance.update();
        }
      },
      { deep: true }
    );

    const renderChart = () => {
      if (chart.value) {
        chartInstance = new Chart(chart.value, {
          type: "pie",
          data: props.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          },
        });
      }
    };

    return {
      chart,
    };
  },
});
</script>

<style scoped>
div {
  position: relative;
  height: 300px;
}
</style>
