<template>
  <div class="">
    <q-tab-panels v-model="tab" vertical animated>
      <q-tab-panel name="date">
        <div class="column">
          <ReportByDate />
          <StatContainer>
            <div class="row rounded-md" v-if="report">
              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Active Employees',
                  properties: 'text-secondary font-bold',
                }"
                :value="`${report[0].total}`"
                :helperText="`${report[0].total}% total active employee`"
              />

              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Present',
                  properties: 'text-green font-bold',
                }"
                :value="`${report[0].present}`"
                :helperText="`${report[0].present_percentage}% attendees`"
              />

              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Lates',
                  properties: 'text-orange font-bold',
                }"
                :value="`${report[0].lates}`"
                :helperText="`${report[0].lates}% of ${report[0].present} attendees`"
              />

              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Absents',
                  properties: 'text-red font-bold',
                }"
                :value="`${report[0].absents}`"
              />


            
  
            </div>
          </StatContainer>
        </div>
      </q-tab-panel>

      <q-tab-panel name="cut_off">
        <div class="column">
          <ReportByCutOff />

          <stat-container>
            <div class="row rounded-md" v-if="reports">



              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Active Employees',
                  properties: 'text-primary font-bold',
                }"
             
                :value="reports.total_employee"
              />

              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Total working days',
                  properties: 'text-secondary font-bold',
                }"
                :value="`${reports.working_days}`"
              >

              <template v-slot:helper>
                <div class="column text-xs ">
                  <div class="">
                    <span class="font-secondary  pr-2 "> Attendance Rate %</span> 
                    <span class="text-green">   {{ (100 - reports.absentee_rate).toFixed(2) }}%</span>
                  </div>

                 <div>
                    <span class="font-secondary  pr-2"> Absentee Rate %</span> 
                    <span class="text-red"> {{(reports.absentee_rate).toFixed(2)}}%</span>
                  </div>

                </div>

              </template>
              </stat-view>



              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Total Lates',
                  properties: 'text-orange font-bold',
                }"
             
                :value="reports.total_lates"
                :helperText="`${((reports.total_lates/reports.total_attendance)*100).toFixed(2)}% late percentage`"
              />
            

              

            </div>
          </stat-container>
        </div>
      </q-tab-panel>

      <q-tab-panel name="month">
        <div>
          <report-by-month />

          <stat-container>
            <div class="row rounded-md" v-if="reports">



              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Active Employees',
                  properties: 'text-primary font-bold',
                }"
             
                :value="reports.total_employee"
              />

              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Total working days',
                  properties: 'text-secondary font-bold',
                }"
                :value="`${reports.working_days}`"
              >

              <template v-slot:helper>
                <div class="column text-xs ">
                  <div class="">
                    <span class="font-secondary  pr-2 "> Attendance Rate %</span> 
                    <span class="text-green">   {{ (100 - reports.absentee_rate).toFixed(2) }}%</span>
                  </div>

                 <div>
                    <span class="font-secondary  pr-2"> Absentee Rate %</span> 
                    <span class="text-red"> {{(reports.absentee_rate).toFixed(2)}}%</span>
                  </div>

                </div>

              </template>
              </stat-view>


              <stat-view
                class="m-0.5"
                :backgroundColor="'bg-onSurface'"
                :title="{
                  value: 'Total lates',
                  properties: 'text-orange font-bold',
                }"
             
                :value="reports.total_lates"
                :helperText="`${((reports.total_lates/reports.total_attendance)*100).toFixed(2)}% late percentage`"
              />

              

            </div>
          </stat-container>
          
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import ReportByDate from "./tables/ReportByDate.vue";
import { useReportStore } from "@/store/report";
import { storeToRefs } from "pinia";
import StatContainer from "@/views/admin/components/StatContainer.vue";
import ReportByCutOff from "./tables/ReportByCutOff.vue";
import StatView from "@/components/StatView.vue";

import ReportByMonth from "./tables/ReportByMonth.vue";

export default {
  components: {
    ReportByDate,
    StatContainer,
    ReportByCutOff,
    ReportByMonth,
    StatView,
  },

  setup() {
    const reportStore = useReportStore();

    const { tab, report,reports } = storeToRefs(reportStore);

    return {
      tab,
      report,
      reports,
      
    };
  },
};
</script>

<style>
</style>