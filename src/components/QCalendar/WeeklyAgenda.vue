<template>
  <div class="subcontent">
    <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    />

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 400px;">
        <q-calendar
          ref="calendar"
          v-model="selectedDate"
          view="week"
          dark
          animated
          bordered
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-interval="onClickInterval"
          @click-head-intervals="onClickHeadIntervals"
          @click-head-day="onClickHeadDay"
          
        >
        <template #day-body="{ }">
          test
       
      </template>

      
        
      </q-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import { QCalendar ,today} from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass'
import { useEmployeeStore } from '@/store/employee'
import { defineComponent } from 'vue'
import NavigationBar from './NavigationBar.vue'





export default defineComponent({
  name: 'WeekDark',
  components: {
    NavigationBar,
    QCalendar
  },
  data () {
    return {
      employeeStore:useEmployeeStore(),
      selectedDate: today()
    }
  },

  methods: {
    onToday () {
      this.$refs.calendar.moveToToday()
    },
    onPrev () {
      this.$refs.calendar.prev()
    },
    onNext () {
      this.$refs.calendar.next()
    },

    onMoved (data) {
      console.log('onMoved', data)
    },
    onChange (data) {
      console.log('onChange', data)
    },
    onClickDate (data) {
      console.log('onClickDate', data)
    },
    onClickTime (data) {
      console.log('onClickTime', data)
    },
    onClickInterval (data) {
      console.log('onClickInterval', data)
    },
    onClickHeadIntervals (data) {
      console.log('onClickHeadIntervals', data)
    },
    onClickHeadDay (data) {
      console.log('onClickHeadDay', data)
    },
    
  },
  mounted(){
    this.employeeStore.getAttendance()
  }
})
</script>