<template>
  <div>
    <div class="text-lg">
      {{title}}
    </div>
    <apexchart
      width="100%"
      height="350px"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
// you can import in a particular component and register the component like below
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },

  props: ["seriesProps", "categoriesProps",'title'],
  setup(props) {
    return {
      series: props.seriesProps,
      chartOptions: {
        colors: ["#168216", "#ff7e05"],
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            dataLabels: {
              total: {
       
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories: props.categoriesProps,
        },
        yaxis: {
            max:100
          
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
};
</script>

<style>
.apexcharts-tooltip {
  color: #1b1a1a;
}
</style>