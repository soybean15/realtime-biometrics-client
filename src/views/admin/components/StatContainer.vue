<template>
  
  <div class="row p-3 bg-surface rounded-md mt-1">

    <div class=" row rounded-md" v-if="report">


      <stat-view
      :backgroundColor="'bg-onSurface'"
      :title="{
        value:'Active Employees',
        properties: 'text-secondary font-bold'
      }"
      :value="`${report[0].total}`"
      :helperText="`${report[0].total}% active employee`"
    
    
      
      />

      <stat-view
      class="ml-1"
      :backgroundColor="'bg-onSurface'"
      :title="{
        value:'Present',
        properties: 'text-green font-bold'
      }"
      :value="`${report[0].present}`"
      :helperText="`${report[0].present_percentage}% active employee`"
    
    
      
      />


      <stat-view
      class="ml-1"
      :backgroundColor="'bg-onSurface'"
      :title="{
        value:'Lates',
        properties: 'text-orange font-bold'
      }"
      :value="`${report[0].lates}`"
      :helperText="`${report[0].lates}% of ${report[0].present} attendees`"
   
      
      />


      <stat-view
      class="ml-1"
      :backgroundColor="'bg-onSurface'"
      :title="{
        value:'Absents',
        properties: 'text-red font-bold'
      }"
      :value="`${report[0].absents}`"
      
   
      
      />

    </div>

  </div>

 
</template>

<script>

import StatView from '@/components/StatView.vue'
import {useReportStore } from '@/store/report'
import { storeToRefs } from 'pinia'
export default {
    components:{StatView},
    setup(){



      const reportStore = useReportStore()

      const {report }= storeToRefs(reportStore)

      return {

        report
      }
    }

}
</script>

<style>

</style>