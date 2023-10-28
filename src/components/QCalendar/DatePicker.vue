<template>
     
      <div class="px-3 w-full row">

  
        <q-date
        class="w-full"
          v-model="dateModel"
          :events="events"
          :event-color="(date) => date[9] % 2 === 0 ? 'teal' : 'orange'"
        />
      </div>



   
  </template>
  
  <script>
  import {  watch } from 'vue'
import {useCalendarStore} from '@/store/calendar'
import { storeToRefs } from 'pinia'

  
  export default {
    props:['events'],
    emits:['onSelectDate'],
    setup (props,{emit}) {
    
      const calendarStore = useCalendarStore()

      const {dateModel} = storeToRefs(calendarStore)


      const emitDate = () => {
        emit('onSelectDate', dateModel.value)
    };

      watch(dateModel,()=>{
       
        emitDate()
      })
     
      return {
        dateModel

      }
    }
  }
  </script>
  