<template>
  <DataTable 
  :columns="columns" 
  :cells="[
    'name',
    'time_in',
    'time_out',
    'break_in',
    'break_out'
    ]"
  :rows="report && report.reports ? report.reports.data : []"
 
  >
    <template v-slot:top>
      <div class="row">
        <span class="text-lg font-bold" v-if="report">
          {{ `${formatTime(report.date, "MMMM Do")} Report` }}
        </span>
      </div>
    </template>

    <template v-slot:name="{ props }">
      <q-td :props="props">
        <div class="row items-center">
          <q-avatar class="px-1">
            <img :src="props.row.image" />
          </q-avatar>

          <span class="px-2">
            {{props.row.full_name}}
          </span>
        </div>
      </q-td>
    </template>

    <template v-slot:time_in="{props}">
      <q-td :props="props">
        <span>

          {{props.row.time_in ? formatTime(props.row.time_in,'LT') :'--'}}

        </span>

      </q-td>

    </template>


    <template v-slot:break_out="{props}">
      <q-td :props="props">
        <span>

          {{props.row.break_out ? formatTime(props.row.break_out,'LT') :'--'}}

        </span>

      </q-td>

    </template>

    <template v-slot:break_in="{props}">
      <q-td :props="props">
        <span>

          {{props.row.break_in ? formatTime(props.row.break_in,'LT') :'--'}}

        </span>

      </q-td>

    </template>

    <template v-slot:time_out="{props}">
      <q-td :props="props">
        <span>

          {{props.row.time_out ? formatTime(props.row.time_out,'LT') :'--'}}

        </span>

      </q-td>

    </template>
  </DataTable>

{{report}}
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { useReportStore } from "@/store/report";
import { storeToRefs } from "pinia";
import formatTime from "@/composables/DateTimeFormat";


const columns = [
  {
    name: "name",
    label: "Name",
    required: true,
    align: "left",
  },
  {
    name: "time_in",
    label: "Time in",
    required: true,
    align: "center",
  },
  {
    name: "break_out",
    label: "Break out",
    required: true,
    align: "center",
  },
  {
    name: "break_in",
    label: "Break in",
    required: true,
    align: "center",
  },
  {
    name: "time_out",
    label: "Time out",
    required: true,
    align: "center",
  },
];

export default {
  components: { DataTable },
  setup() {
    const reportStore = useReportStore();

    const { report } = storeToRefs(reportStore);

    return {
      report,
      formatTime,
      columns,
    };
  },
};
</script>

<style>
</style>