<template>
    <div>

        <div class="row" v-if="summary">
            <SummaryCard
                :title="'Attendance'"
                titleStyle="font-bold text-lg text-green"
                :value="`${summary['attended']}/${summary['total_attendance']}`"
                valueStyle="text-xl font-bold"
            />

            <SummaryCard
                :title="'Lates'"
                titleStyle="font-bold text-lg text-orange"
                :value="`${summary['late']}`"
                valueStyle="text-xl font-bold"
            />

            <SummaryCard
                :title="'Absents'"
                titleStyle="font-bold text-lg text-red"
                :value="`${summary['total_attendance']-summary['attended']}`"
                valueStyle="text-xl font-bold"
            />
            <SummaryCard
                :title="'To Resolve'"
                titleStyle="font-bold text-lg text-red"
                :value="`${summary['to_resolve']}`"
                valueStyle="text-xl font-bold"
            />

 

        </div>


    </div>
  

</template>

<script>
import SummaryCard from './SummaryCard.vue'
import {useAttendanceStore} from '@/store/attendance'
import { onMounted } from 'vue'
import { date } from 'quasar'
import { storeToRefs } from 'pinia'


const getCutOffDate=(val)=>{
    const day =  date.formatDate(val, 'DD')

    let start = 0
    let end = 0
    let daysInMonth = date.daysInMonth(val) 
    

    const month = parseInt(date.formatDate(val, 'MM'), 10); // Parse month as an integer
    const year = parseInt(date.formatDate(val, 'YYYY'), 10); // Parse year as an in

    if (day<=15){
        start = 1
        end = 15
    }else{
        start = 16
        end = daysInMonth
    }

    return {
        start:start,
        end:end,
        month:month,
        year:year
    }
}
export default {
    components:{SummaryCard},
    setup(){

        const current = new Date()
      //  const formattedString = date.formatDate(current, 'YYYY-MM-DD')
        const attendanceStore = useAttendanceStore()

        const {summary} = storeToRefs(attendanceStore)
        // const day = date.formatDate(current, 'DD')
        // const month = 

   
        
        onMounted(()=>{
           
 
            attendanceStore.getAttendanceSummary(getCutOffDate(current))
        })

        return{
            summary
        }

    }

}
</script>

<style>

</style>