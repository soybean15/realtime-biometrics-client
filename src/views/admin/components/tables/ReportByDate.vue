<template>
  <!-- <DataTable 
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
      <div class="row w-full justify-between">
        <span class="text-lg font-bold" v-if="report">
          {{ `${formatTime(report.date, "MMMM Do")} Report` }}
        </span>


        <q-input outlined dense v-model="dateModel"  label="Select Date" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date @update:model-value="onUpdate" v-model="dateModel">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
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
  </DataTable> -->

  <q-table
    :columns="columns"
    :rows="report  ? report.reports : []"
    :filter="filter"
  >
    <template v-slot:top-left>
      <span class="text-lg font-bold" v-if="report">
        {{ `${formatTime(report.date, "MMMM Do")} Report` }}
      </span>
    </template>

    <template v-slot:top-right>
      <q-input
        outlined
        dense
        v-model="dateModel"
        label="Select Date"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date @update:model-value="onUpdate" v-model="dateModel">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </template>

    <template v-slot:body="props ">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <div class="row items-center">
          <q-avatar class="px-1">
            <img :src="props.row.image" />
          </q-avatar>

          <span class="px-2">
            {{props.row.full_name}}
          </span>
        </div>
        </q-td>

        <q-td key="time_in" :props="props">
          <q-badge :color="props.row.late? 'orange':'green'">
            {{ format(props.row.break_out)??'N/A' }}
          </q-badge>
        </q-td>



        <q-td key="break_out" :props="props">
          <q-badge :color="props.row.late? 'orange':'green'">
            {{format(props.row.break_out)??'N/A' }}
          </q-badge>
        </q-td>

        <q-td key="break_in" :props="props">
          <q-badge :color="props.row.late? 'orange':'green'">
            {{ format(props.row.break_in) ?? 'N/A' }}
          </q-badge>
        </q-td>



        <q-td key="time_out" :props="props">
          <q-badge :color="props.row.late? 'orange':'green'">
            {{ format(props.row.time_out)??'N/A'}}
          </q-badge>
        </q-td>

        
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { useReportStore } from "@/store/report";
import { storeToRefs } from "pinia";
import formatTime from "@/composables/DateTimeFormat";
import { ref } from "vue";

const columns = [
  {
    name: "name",
    label: "Name",
    required: true,
    field: (row) => row.full_name,
    align: "left",
  },
  {
    name: "time_in",
    label: "Time in",
    required: true,
    field: (row) => row.time_in,

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
  setup() {
    const reportStore = useReportStore();

    const timeStamp = Date.now();

    const dateModel = ref(formatTime(timeStamp, "L"));

    const { report, filter } = storeToRefs(reportStore);

    return {
      report,
      formatTime,
      columns,
      dateModel,
      filter,
      onUpdate: (val) => {
        reportStore.index(val);
        console.log(val);
      },
      format:(time)=>{
        if(time){
         return formatTime(time,'LT') 
        }
        return null
      }
    };
  },
};
</script>

<style>
</style>