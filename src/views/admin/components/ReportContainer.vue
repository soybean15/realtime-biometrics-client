<template>
  <div class="">
   
    <q-tab-panels v-model="tab" vertical animated>
          <q-tab-panel name="date">
            <ReportByDate/>
          </q-tab-panel>

          <q-tab-panel name="cut_off">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="month">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>

       
  </div>
</template>

<script>


import ReportByDate from './tables/ReportByDate.vue'
import  {useReportStore} from '@/store/report'
import { storeToRefs } from 'pinia'
export default {
    components:{ReportByDate},

    setup(){
        const reportStore = useReportStore()

        const {tab} = storeToRefs(reportStore)

        

        return {
            tab
        }
    }

}
</script>

<style>

</style>