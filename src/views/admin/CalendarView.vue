<template>
  <div class="m-10 p-5  shadow-md bg-surface">
    <div class="text-2xl row justify-between"> 
      
      <span>Calendar</span>

      <div>
        <AddNewEvent/>
      </div>
    </div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div class=" ">
          <DatePicker :events="keys" @onSelectDate="selectDate"/>
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="dateModel"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel class="p-5" :name="key"  v-for="(item,key) in holidays" :key="key">
           <div class="text-4xl py-5">{{formatTime(key,'MMMM Do YYYY')}}</div>
  
                <div class="row justify-between items-center" v-for="i in item" :key="i.name">

                  <div>
                  
                    <div class="text-2xl ">{{i.name}}</div>
                    <div class="font-secondary  text-lg">{{i.category}}</div>

                  </div>
                 <MoveEvent :event="i"/>
                </div>

          </q-tab-panel>
        
        </q-tab-panels>
        
 
      </template>
      
      
    </q-splitter>


    <div class="row justify-end">
      
    
      <q-fab
      v-model="fab"
      label="Actions"
      label-position="left"
      vertical-actions-align="right"
      color="purple"
      hide-icon
      direction="up"
    >
  
  
    <q-fab-action color="primary" @click="onClick" hide-icon label="Email" />
    <q-fab-action color="secondary" @click="onClick" hide-icon label="Alarm" />
    </q-fab>
  </div>

   
  </div>
</template>

<script>
import DatePicker from "@/components/QCalendar/DatePicker.vue";
import { useCalendarStore } from "@/store/calendar";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import {date} from 'quasar'
import formatTime from '@/composables/DateTimeFormat';
import AddNewEvent from './components/modals/AddNewEvent.vue';

import MoveEvent from './components/modals/MoveEvent.vue';

const getEvents=(events, date)=>{

  events[date]= []
  const dates = Object.keys(events);


  dates.sort();
  console.log(dates)
  console.log('date',date)
  const index = dates.indexOf(date);

  const beforeDate = dates[index - 1];
  const afterDate = dates[index + 1];

  const before = events[beforeDate];
  const after = events[afterDate];
  before.date = beforeDate
  after.date = afterDate

  return {before,after }



}
export default {
  components: {
    DatePicker,
    AddNewEvent,
    MoveEvent
  },
  setup() {


    const current = Date.now()
    const formattedString = date.formatDate(current, 'YYYY/MM/DD')
    const calendarStore = useCalendarStore();
    const dateModel = ref(formattedString)
    const { holidays } = storeToRefs(calendarStore);
    const keys = ref([]);
    const next = ref(null)
    const prev = ref(null)

    onMounted(async () => {
      await calendarStore.index();
      keys.value = Object.keys(holidays.value);

     
      const {before, after}= getEvents(holidays.value,dateModel.value)
      next.value = after

      prev.value = before
      console.log("before", before)
      console.log("after",after)
    });

    return {
      next,
      prev,
      holidays,
      
      keys,
      dateModel,
      formatTime,
      splitterModel: ref(30),
      selectDate:(val)=>{
     
        dateModel.value= val
        console.log(dateModel.value)

      },
      
    };
  },
};
</script>

<style>
</style>