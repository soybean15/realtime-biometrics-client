<template>
  <!-- 
  props : 
    -title
    -rows
    -columns
    -cells
    -pagination

  slots :
    -cells (array)
    -top-right
    -top
    -bottom -->
  <div>
    <DataTable
      :columns="columns"
      :rows="employeeAttendance.attendance"
      :cells="[
        'remarks',
        'date',
        'time_in',
        'break_out',
        'break_in',
        'time_out',
        'action'
      ]"
    >
      <template v-slot:top>
        <div class="row items-center">
          <div>
            {{
              `${formatTime(employeeAttendance.date, "MMMM")} ${
                employeeAttendance.cut_off
              }`
            }}
          </div>
        </div>
      </template>
      <template v-slot:remarks="{ props }">
        <q-td :props="props" v-if="props.row.daily && props.row.daily[0]">
          <div v-if="!props.row.daily[0].is_resolve">
            <div v-for="item in props.row.daily[0].remarks" :key="item.key">
              <div
                class="flex flex-wrap"
                v-if="
                  item.key === 'no_time_in' ||
                  item.key === 'no_time_out' ||
                  item.key === 'undertime' ||
                  item.key === 'late'
                "
              >
                <q-chip
                  :color="getChipColor(item.key)"
                  dense
                  :label="item.title"
                  :class="{
                    'cursor-pointer':
                      item.key === 'no_time_in' || item.key === 'no_time_out',
                  }"
                >
                  <q-tooltip class="bg-indigo" :offset="[10, 10]">
                   {{item.details}}
                  </q-tooltip>
                </q-chip>
              </div>
            </div>
          </div>
          <q-chip :color="getChipColor('normal')" dense label="Normal" v-else />
        </q-td>
      </template>

      <template v-slot:action="{props}">
        <q-td :props="props" v-if="props.row.daily && props.row.daily[0]">
          <div class="row items-center" v-if="!props.row.daily[0].is_resolve"> 

             <ResolveAttendanceModal :issue="props.row.daily[0]"/>
          
          
          
          </div>
          <span class="italic text-sm" v-else>No Action Needed</span>
          
        </q-td>
      </template>

      <template v-slot:date="{ props }">
        <q-td :props="props">
          <div
            :class="{
              'text-orange-700':
                props.row.daily &&
                props.row.daily[0] &&
                !props.row.daily[0].is_resolve,
            }"
          >
            {{ props.row.date }}
          </div>
        </q-td>
      </template>

      <template v-slot:time_in="{ props }">
        <q-td :props="props">
          <div
            :class="{
              'text-orange-700':
                props.row.daily &&
                props.row.daily[0] &&
                !props.row.daily[0].is_resolve,
            }"
          >
            {{ format(props.row.time_in) }}
          </div>
        </q-td>
      </template>

      <template v-slot:break_out="{ props }">
        <q-td :props="props">
          <div
            :class="{
              'text-orange-700':
                props.row.daily &&
                props.row.daily[0] &&
                !props.row.daily[0].is_resolve,
            }"
          >
            {{ format(props.row.break_out) }}
          </div>
        </q-td>
      </template>

      <template v-slot:break_in="{ props }">
        <q-td :props="props">
          <div
            :class="{
              'text-orange-700':
                props.row.daily &&
                props.row.daily[0] &&
                !props.row.daily[0].is_resolve,
            }"
          >
            {{ format(props.row.break_in) }}
          </div>
        </q-td>
      </template>

      <template v-slot:time_out="{ props }">
        <q-td :props="props">
          <div
            :class="{
              'text-orange-700':
                props.row.daily &&
                props.row.daily[0] &&
                !props.row.daily[0].is_resolve,
            }"
          >
            {{ format(props.row.time_out) }}
          </div>
        </q-td>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";

import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import formatTime from "@/composables/DateTimeFormat";
import ResolveAttendanceModal from "../modals/ResolveAttendanceModal.vue";
import getChipColor from "@/composables/chipColor";
import { useAttendanceStore } from '@/store/attendance';



const format = (val) => {
  return formatTime(val, "LTS") == "Invalid date"
    ? "No data"
    : formatTime(val, "LT");
};

const columns = [
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    // field: (row) => row.date,
    // format: (val) => `${val}`,

    //  sortable: true,
  },
  {
    name: "time_in",
    required: true,
    label: "Time in",
    align: "left",
    // field: (row) => row.time_in,
    //  format: (val) =>`${format(val)}`,
    //  sortable: true,
  },
  {
    name: "break_out",
    required: true,
    label: "Break Out",
    align: "left",
    // field: (row) => row.break_out,
    // format: (val) =>`${format(val)}`,
    //  sortable: true,
  },
  {
    name: "break_in",
    required: true,
    label: "Break in",
    align: "left",
    // field: (row) => row.break_in,
    // format: (val) =>`${format(val)}`,
    //  sortable: true,
  },
  {
    name: "time_out",
    required: true,
    label: "Time out",
    align: "left",
    // field: (row) => row.time_out,
    // format: (val) =>`${format(val)}`,
    //  sortable: true,
  },

  {
    name: "remarks",
    required: true,
    label: "Remarks",
    align: "center",
    style: "width: 50px",
    //  sortable: true,
  },

  {
    name: "action",
    required: true,
    label: "Action",
    align: "center",
    style: "width: 50px",
    //  sortable: true,
  },
];
export default {
  components: { DataTable,ResolveAttendanceModal },
  setup() {
    const attendanceStore = useAttendanceStore();

    const { employeeAttendance } = storeToRefs(attendanceStore);

    onMounted(() => {
      attendanceStore.getAttendanceByCuOff();
    });

    return {
      employeeAttendance,
      columns,
      formatTime,
      format,
      getChipColor,
     
    };
  },
};
</script>

<style>
</style>