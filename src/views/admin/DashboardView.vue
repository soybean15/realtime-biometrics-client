<template>
  <div class="row">
    <div class="col-8 column p-5">
      <div>
        <div class="text-4xl font-thin">Dashboard</div>

        <div class="text-md font-secondary">Welcome back, {{ user.name }}</div>
      </div>
      <div class="p-1 bg-surface my-2 shadow-md rounded-md">
        <bar-chart
        :seriesProps="series.series"
        :categoriesProps="series.categories"
        v-if="series"
      />

     
      </div>
      <div class="bg-surface row rounded-md my-1 p-1">
        <StatView
        class="mx-0.5"
           :backgroundColor="'bg-onSurface'"
          :title='{
            value:"Total Users",
            properties:"text-green"
          }'
          :value="dashboard.user_count"
          
        v-if="dashboard"/>
        <StatView
          class="mx-0.5"
          :backgroundColor="'bg-onSurface'"
          :title='{
            value:"Total Employees",
            properties:"text-green"
          }'
          :value="dashboard.employee_count"
          
        v-if="dashboard"/>

      </div>
     
    </div>

    <div class="col-4">

     
   
    </div>
  </div>
 
</template>

<script>
import { useDashboardStore } from "@/store/dashboard";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";


import BarChart from "@/components/charts/BarChart.vue";
import StatView from '@/components/StatView.vue';

const generateChartData = (data) => {
  const latesData = [];
  const attendendData = [];

  const categories = [];

  for (let date in data) {
    console.log(data[date].month);

    const lates = data[date].total_lates;
    const attendance = data[date].total_attendance;

    latesData.push((lates == 0 ? 0 : (lates / attendance) * 100).toFixed(2));
    attendendData.push((100-data[date].absentee_rate ).toFixed(2));
    categories.push(date);
  }

  return {
    series: [
    
      {
        name: "Attendance",
        data: attendendData,
      },
      {
        name: "Lates",
        data: latesData,
      },
    ],
    categories:categories
  };
};
export default {
  components: {
    BarChart,
    StatView
  },
  setup() {
    const dashboardStore = useDashboardStore();

    const series = ref(null);
    const { dashboard, user, summary } = storeToRefs(dashboardStore);

    onMounted(async () => {
      await dashboardStore.index();

      console.log(summary.value.data);
      series.value = generateChartData(summary.value.data);
    });

    return {
      dashboard,
      user,
      series,
      summary,
      
    };
  },
};
</script>

<style>
</style>