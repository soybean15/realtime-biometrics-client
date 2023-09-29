<template>

  <div class="q-px-lg q-py-md  bg-surface rounded-lg">
    <q-timeline color="secondary">
      <q-timeline-entry heading>
         <div class="row justify-between">
            <span>Today's Attendance </span>
            <span>{{ dateTime.date }}</span>
         </div>
        </q-timeline-entry>

        <div v-if="todayAttendance && todayAttendance.length==0">No Data Available</div>

        <div v-else>

            <q-timeline-entry :title="item.type" :subtitle="item.timestamp" v-for="item in todayAttendance" :key="item.id"/>
        

        </div>
      

 
    </q-timeline>
  </div>

</template>

  <script>
  import { useSettingStore } from '@/store/settings';
import { storeToRefs } from 'pinia';

export default {
    props:['todayAttendance'],
    setup(){
        const settingStore = useSettingStore()

        const {dateTime}= storeToRefs(settingStore)


        return {dateTime}


    }
};
</script>