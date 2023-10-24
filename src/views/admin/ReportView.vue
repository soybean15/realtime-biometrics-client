<template>
  <div class="row py-3">
    <report-side-panel class="col-3" />


    <div class="column col-9 px-1">
      
      <report-container class="" />

      <StatContainer/>



    </div>
   
  </div>
</template>

<script>
import ReportContainer from "./components/ReportContainer.vue";
import ReportSidePanel from "./components/ReportSidePanel.vue";

import { useReportStore } from "@/store/report";
import { onMounted } from "vue";
import StatContainer from './components/StatContainer.vue';

export default {
  components: { ReportSidePanel, ReportContainer,StatContainer },
  setup() {
    const reportStore = useReportStore();

    onMounted(() => {
      reportStore.index();
    });
  },
};
</script>

<style>
</style>