<template>

      <div class="w-full row">

  
        <q-date
        class="w-full"
          v-model="dateModel"
          :events="events"
          :event-color="(date) => date[9] % 2 === 0 ? 'teal' : 'orange'"
        />
      </div>

   
  </template>
  
  <script>
  import { ref, watch } from 'vue'
import {date} from 'quasar'

  
  export default {
    props:['events'],
    emits:['onSelectDate'],
    setup (props,{emit}) {
    
      const current = Date.now()
      const formattedString = date.formatDate(current, 'YYYY/MM/DD')

      const dateModel = ref(formattedString)

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
  