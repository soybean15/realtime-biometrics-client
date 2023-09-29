<template>
  
 
  <q-splitter
      v-model="splitterModel"
   
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab name="weekly" label="Weekly" />
          <q-tab name="cutoff" label="CutOff" />
          <q-tab name="movies" icon="movie" label="Movies" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="weekly">
           <div class="text-h4 q-mb-md">Weekly View</div>
           <WeeklyAgenda/>

          </q-tab-panel>

          <q-tab-panel name="cutoff">
            <div class="text-h4 q-mb-md">Cut Off</div>
            <AttendanceTableVue/>
      
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
</template>

<script>
import WeeklyAgenda from '@/components/QCalendar/WeeklyAgenda.vue'
import AttendanceTableVue from './AttendanceTable.vue'
import { ref } from 'vue'

export default {
    components:{WeeklyAgenda,AttendanceTableVue},
    setup () {
      
    return {
      tab: ref('weekly'),
      splitterModel: ref(11)
    }
  }
}
</script>

<style>

</style>