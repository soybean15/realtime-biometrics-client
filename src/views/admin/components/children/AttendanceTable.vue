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
        >
      
        <template v-slot:top>
          <div class="row items-center">

            <div>{{ `${formatTime(employeeAttendance.date, 'MMMM')} ${employeeAttendance.cut_off}` }}</div>


          </div>
        </template>
      </DataTable>
        

    </div>
  
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import { useEmployeeStore } from '@/store/employee';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import formatTime from '@/composables/DateTimeFormat'


const format=(val)=>{

  return formatTime(val,"LTS") == 'Invalid date' ? 'No data' :formatTime(val,'LT')

}

const columns = [
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: (row) => row.date,
    format: (val) => `${val}`,
    //  sortable: true,
  },
  {
    name: "time_in",
    required: true,
    label: "Time in",
    align: "left",
    field: (row) => row.time_in,
     format: (val) =>`${format(val)}`,
    //  sortable: true,
  },
  {
    name: "break_out",
    required: true,
    label: "Break Out",
    align: "left",
    field: (row) => row.break_out,
    format: (val) =>`${format(val)}`,
    //  sortable: true,
  },
  {
    name: "break_in",
    required: true,
    label: "Break in",
    align: "left",
    field: (row) => row.break_in,
    format: (val) =>`${format(val)}`,
    //  sortable: true,
  },
  {
    name: "time_out",
    required: true,
    label: "Time out",
    align: "left",
    field: (row) => row.time_out,
    format: (val) =>`${format(val)}`,
    //  sortable: true,
  },

]
export default {
    components:{DataTable},
    setup(){
        const employeeStore = useEmployeeStore()

        const {employeeAttendance} = storeToRefs(employeeStore)

        onMounted(()=>{
            employeeStore.getAttendanceByCuOff()
        })

        return {
            employeeAttendance,columns ,formatTime
        }
    }

}
</script>

<style>

</style>