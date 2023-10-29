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
      :series="series"
    ></apexchart>
  </div>

  {{seriesProps}}
</template>

<script>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
// import { date } from "quasar";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["title", "options",'pieData'],
  emits:['onChange'],

  setup(props,{emit}) {
    //const timeStamp = Date.now();
   // const selectModel = ref(date.formatDate(timeStamp, "MMM YYYY"));

    const selectModel = ref(props.options[0].label);
    console.log(props.options)


    return {
      selectModel,

      onChange:(value)=>{

        emit('onChange',value.value)

       
      },
      series: props.pieData.series,
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: props.pieData.labels,
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