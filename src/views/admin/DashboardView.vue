<template>
  <div class="column p-5">
    <div  >
      <div class="text-4xl font-thin">Dashboard</div>

      <div class="text-md font-secondary">Welcome back, {{ user.name }}</div>
    </div>

    <div class="row">
      <div class="col-7 column">
        <div class="row rounded-md my-1 p-1">
          <StatView
            class="m-0.5"
            :backgroundColor="'bg-surface'"
            :title="{
              value: 'Total Users',
              properties: 'text-green',
            }"
            :value="dashboard.user_count"
            v-if="dashboard"
          />
          <StatView
            class="m-0.5"
            :backgroundColor="'bg-surface'"
            :title="{
              value: 'Total Employees',
              properties: 'text-green',
            }"
            :value="dashboard.employee_count"
            v-if="dashboard"
          />
          <StatView
            class="m-0.5"
            :backgroundColor="'bg-surface'"
            :title="{
              value: 'Total Attendance',
              properties: 'text-green',
            }"
            :value="currentAttendance ? currentAttendance.total_attendance : 0"
            :caption="{
              value: `${currentAttendance.total_lates} total lates`,
              separator: '',
            }"
            :helper="{
              isUp:
                currentAttendance.total_lates > previousAttendance.total_lates,
              isPositive:
                currentAttendance.total_lates < previousAttendance.total_lates,
            }"
            v-if="dashboard && currentAttendance"
          >
            <template v-slot:helper>
              <div>
                <!-- {{`${(((currentAttendance.total_lates-previousAttendance.total_lates)/currentAttendance.total_lates)*100).toFixed(0)}% higher compare last month`}} -->
                {{
                  computeRate(
                    currentAttendance.total_lates,
                    previousAttendance.total_lates,
                    (result, isHigher) => {
                      result = (result / currentAttendance.total_lates) * 100;

                      if (isHigher) {
                        return `${result.toFixed(0)}% higher than last month`;
                      } else {
                        return `${result.toFixed(0)}% lower than last month`;
                      }
                    }
                  )
                }}
              </div>
            </template>
          </StatView>

          <StatView
            class="m-0.5"
            :backgroundColor="'bg-surface'"
            :title="{
              value: 'Absentee Rate',
              properties: 'text-green',
            }"
            :value="`${currentAttendance.absentee_rate.toFixed(2)}%`"
            :helper="{
              isUp:
                currentAttendance.total_lates > previousAttendance.total_lates,
              isPositive:
                currentAttendance.total_lates < previousAttendance.total_lates,
            }"
            v-if="dashboard && currentAttendance"
          >
            <template v-slot:helper>
              <div>
                {{
                  computeRate(
                    currentAttendance.total_lates,
                    previousAttendance.total_lates,
                    (result, isHigher) => {
        
                      if (isHigher) {
                        return `${result.toFixed(0)}% higher than last month`;
                      } else {
                        return `${result.toFixed(0)}% lower than last month`;
                      }
                    }
                  )
                }}
              </div>
            </template>
          </StatView>
        </div>
        <div class="p-3 bg-surface my-2 shadow-md rounded-md">
        <NotificationPanel/>

        </div>
       
      </div>

      <div class="col-5 p-2 rounded-md">
        <div class="p-3 bg-surface my-2 shadow-md rounded-md">
          <bar-chart
            :title="'Attendance Rate'"
            :seriesProps="series.series"
            :categoriesProps="series.categories"
            v-if="series"
          />
        </div>

        <div class="bg-surface p-4">
          <PieChart
            :title="'Attendance Rate by Department'"
            :options="pieChartOption"
            @onChange="onChange"
            v-if="pieChartOption"
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
import generateBarChartData from "@/composables/barChart";
import generatePieChartData from "@/composables/pieChart";
import { date } from "quasar";
import NotificationPanel from './components/NotificationPanel.vue';

export default {
  components: {
    BarChart,
    StatView,
    PieChart,
    NotificationPanel
  },
  setup() {
    const dashboardStore = useDashboardStore();

    const series = ref(null);
    const currentAttendance = ref(null);
    const previousAttendance = ref(null);
    const { dashboard, user, summary, pieChartData } =
      storeToRefs(dashboardStore);

    const pieChartOption = ref(null);

    onMounted(async () => {
      await dashboardStore.index();

      series.value = generateBarChartData(summary.value.data);

      pieChartOption.value = Object.keys(summary.value.data).map((item) => {
        return {
          label: date.formatDate(item, "MMM YYYY"),
          value: item,
        };
      });

      pieChartData.value = generatePieChartData(
        summary.value.data[pieChartOption.value[0].value]
      );
      currentAttendance.value =
        summary.value.data[pieChartOption.value[0].value];
      previousAttendance.value =
        summary.value.data[pieChartOption.value[1].value];
    });

    return {
      dashboard,
      user,
      series,
      summary,
      pieChartOption,
      currentAttendance,
      previousAttendance,
      onChange: (value) => {
        pieChartData.value = generatePieChartData(summary.value.data[value]);
      },
      computeRate: (current, prev, callback) => {
        let result = "";
        let isHigher = true;
        if (current >= prev) {
          result = current - prev;
          return callback(result, isHigher);
        } else if (current < prev) {
          isHigher = false;
          result = prev - current;
          return callback(result, isHigher);
        } else {
          return "No changes";
        }
      },
    };
  },
};
</script>

<style>
</style>