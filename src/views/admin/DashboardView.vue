<template>
  <div class="row">
    <div class="col-8 column p-5">
      <div>
        <div class="text-4xl font-thin">Dashboard</div>

        <div class="text-md font-secondary">Welcome back, {{ user.name }}</div>
      </div>
    </div>

    <bar-chart/>

    <div class="col-4"></div>
  </div>
</template>

<script>
import { useDashboardStore } from "@/store/dashboard";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import BarChart from '@/components/charts/BarChart.vue';
export default {
  components:{
    BarChart,
  },
  setup() {
    const dashboardStore = useDashboardStore();

    const { dashboard, user, summary } = storeToRefs(dashboardStore);

    onMounted(() => {
      dashboardStore.index();
    });

    return {
      dashboard,
      user,
      summary,
    };
  },
};
</script>

<style>
</style>