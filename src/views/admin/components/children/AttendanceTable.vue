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
    <q-table
      title="Treats"
      :rows="employeeAttendance.attendance"
      :columns="columns"
      row-key="name"
    >
      <template #body="props">
        <q-tr :props="props" :class="getColor(props.row)">
          <q-td key="date" :props="props">
            {{ format(props.row.date, "MMM Do") }}
          </q-td>
          <q-td key="time_in" :props="props">
            {{ format(props.row.time_in) ?? "N/A" }}
          </q-td>
          <q-td key="break_out" :props="props">
            {{ props.row.break_out ?? "N/A" }}
          </q-td>
          <q-td key="break_in" :props="props">
            {{ format(props.row.break_in) ?? "N/A" }}
          </q-td>
          <q-td key="time_out" :props="props">
            {{ format(props.row.time_out) ?? "N/A" }}
          </q-td>

          <q-td key="actions" :props="props">
            <q-btn-dropdown
              flat
             
              dropdown-icon="change_history"
              v-if="getActions(props.row)"
            >
              <q-list>
                <q-item  @click="resolve('no_time_in',props.row.daily[0])" clickable v-close-popup  v-if="props.row.daily[0].no_time_in">
                  <q-item-section>
                    <q-item-label>Resolve No Time in</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item @click="resolve('no_time_out',props.row.daily[0])" clickable v-close-popup  v-if="props.row.daily[0].no_time_out">
                  <q-item-section>
                    <q-item-label>Resolve Time out</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item @click="resolve('half_day_in',props.row.daily[0])" clickable v-close-popup  v-if="props.row.daily[0].half_day_in">
                  <q-item-section>
                    <q-item-label>Resolve Half Day</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item  @click="resolve('half_day_out',props.row.daily[0])" clickable v-close-popup  v-if="props.row.daily[0].half_day_out">
                  <q-item-section>
                    <q-item-label>Resolve Half Day</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <resolve-modal/>
</template>

<script>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import formatTime from "@/composables/DateTimeFormat";
import getChipColor from "@/composables/chipColor";
import { useAttendanceStore } from "@/store/attendance";
import {useResolveStore} from '@/store/resolve'
import ResolveModal from '../modals/ResolveModal.vue';
// import PDFViewer from '../modals/PDFViewer.vue';
// import CutOffPicker from '../CutOffPicker.vue';
const format = (val, format) => {
  if (format) {
    return formatTime(val, format);
  }

  return formatTime(val, "LTS") == "Invalid date"
    ? null
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
    name: "actions",
    required: true,
    label: "Actions",
    align: "center",
    style: "width: 50px",
    //  sortable: true,
  },
];
export default {
  components: {ResolveModal},
  setup() {
    const attendanceStore = useAttendanceStore();
    const resolveStore  =useResolveStore()

    const {dialog, status,title,row} = storeToRefs(resolveStore)

    const { employeeAttendance } = storeToRefs(attendanceStore);

    onMounted(() => {
      attendanceStore.getAttendanceByCuOff();
    });

    return {
      employeeAttendance,
      attendanceStore,
      columns,
      formatTime,
      format,
      getChipColor,

      onSelectCutOff: (val) => {
        attendanceStore.getAttendanceByCuOff(val);
      },
      getColor: (row) => {
        if (row.status == "No Attendance") {
          return "text-red";
        }

        if (row.daily[0]) {
          if (
            row.daily[0].no_time_in ||
            row.daily[0].no_time_out ||
            row.daily[0].half_day_in ||
            row.daily[0].half_day_out
          ) {
            return "text-orange";
          }

          if (row.daily[0].late) {
            return "text-orange-4";
          }

          return 'text-secondary'
        }
      },
      getActions: (row) => {
        if (row.daily) {
          return (
            row.daily[0].no_time_in ||
            row.daily[0].no_time_out ||
            row.daily[0].half_day_in ||
            row.daily[0].half_day_out
          );
        } else {
          return false;
        }
      },
      resolve:(val,_row)=>{

        const titles = 
         { 
          'no_time_in':'Resolve No Time in',
          'no_time_out': 'Resolve No Time out',
          'half_day_in': 'Resolve Half Day', 
          'half_day_out': 'Resolve Half Day',
        }

        

        dialog.value = true
        status.value = val
        title.value = titles[val]
        row.value= _row
      }
        
        
      
    };
  },
};
</script>

<style>
</style>