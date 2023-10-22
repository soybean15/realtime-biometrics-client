<template>
  <div class="">
   
    <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="date">
            <ReportByDate/>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>

       
  </div>
</template>

<script>

import { ref } from 'vue'
import ReportByDate from './tables/ReportByDate.vue'
export default {
    components:{ReportByDate},

    setup(){

        const tab = ref('date')

        

        return {
            tab
        }
    }

}
</script>

<style>

</style>