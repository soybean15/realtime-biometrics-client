<template>
  <div class="">

    
    <div class="text-lg row">
        <span>{{title}}</span>

        <q-select outlined v-model="selectModel" :options="options" label="Outlined" />

    </div>
    <apexchart
      type="pie"
      width="100%"
      height="200px"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import {  ref } from 'vue';
import VueApexCharts from "vue3-apexcharts";
import { date } from 'quasar'

export default {
    components: {
    apexchart: VueApexCharts,
    
  },
  props:['title','options'],

  setup() {
    const timeStamp = Date.now()
    const selectModel= ref(date.formatDate(timeStamp, 'MMM YYYY'))


    return {
        selectModel,
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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