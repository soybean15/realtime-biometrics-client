<template>
  <div class="">
    <div class="text-lg row justify-between">
      <span>{{ title }}</span>

      <q-select
        outlined
        dense
        v-model="selectModel"
        :options="options"
        label="Filter"
        @update:model-value="onChange"
        
      />
    </div>
    <apexchart
      type="pie"
      width="100%"
      height="300px"
      :options="chartOptions"
      :series="pieChartData.series"
    ></apexchart>
  </div>

</template>

<script>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
// import { date } from "quasar";
import {useDashboardStore} from '@/store/dashboard'
import { storeToRefs } from 'pinia';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["title", "options"],
  emits:['onChange'],

  setup(props,{emit}) {
    //const timeStamp = Date.now();
   // const selectModel = ref(date.formatDate(timeStamp, "MMM YYYY"));

   const dashboardStore = useDashboardStore()
   const {pieChartData}= storeToRefs(dashboardStore)
    const selectModel = ref(props.options[0].label);
    console.log(props.options)


    return {
      selectModel,
      pieChartData,
      onChange:(value)=>{

       emit('onChange',value.value)

     
      },
   
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: pieChartData.value.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>