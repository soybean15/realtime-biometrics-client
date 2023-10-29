<template>
  <div class="column">
    <div>
      <div class="text-4xl font-thin">Dashboard</div>

      <div class="text-md font-secondary">Welcome back, {{ user.name }}</div>
    </div>

    <div class="row">
      <div class="col-8 column">
        <div class="p-3 bg-surface my-2 shadow-md rounded-md">
          <bar-chart
            :title="'Attendance Rate'"
            :seriesProps="series.series"
            :categoriesProps="series.categories"
            v-if="series"
          />

      
        </div>

        <div class="row px-1">
            <div class="bg-surface row rounded-md my-1 p-1">
              <StatView
                class="mx-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Total Users',
                  properties: 'text-green',
                }"
                :value="dashboard.user_count"
                v-if="dashboard"
              />
              <StatView
                class="mx-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Total Employees',
                  properties: 'text-green',
                }"
                :value="dashboard.employee_count"
                v-if="dashboard"
              />
            </div>
          </div>
      </div>

      <div class="col-4 p-2 rounded-md">
        <div class="bg-surface p-4">
          <PieChart :title="'Attendance Rate by Department'"
            :options="pieChartOption"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { useDashboardStore } from "@/store/dashboard";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import BarChart from "@/components/charts/BarChart.vue";
import StatView from "@/components/StatView.vue";
import PieChart from "@/components/charts/PieChart.vue";
import generateBarChartData from '@/composables/barChart'
import generatePieChartData from '@/composables/pieChart'
import { date } from 'quasar'

export default {
  components: {
    BarChart,
    StatView,
    PieChart,
  },
  setup() {
    const dashboardStore = useDashboardStore();

    const series = ref(null);
    const { dashboard, user, summary } = storeToRefs(dashboardStore);

    const pieChartOption = ref(null)
    onMounted(async () => {
      await dashboardStore.index();

      console.log(summary.value.data);
      series.value = generateBarChartData(summary.value.data);

  
      pieChartOption.value = Object.keys(summary.value.data).map(
        (item)=>{

          return {
            label:date.formatDate(item, 'MMM YYYY'),
            value: item
          }
        }
      )

      generatePieChartData()
    });

    return {
      dashboard,
      user,
      series,
      summary,
      pieChartOption
    };
  },
};
</script>

<style>
</style>