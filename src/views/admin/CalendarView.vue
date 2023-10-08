<template>
  <div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div class="q-pa-md">
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
           <div class="text-xl py-5">{{formatTime(key)}}</div>
                <div v-for="i in item" :key="i.name">
                    <div class="text-lg ">{{i.name}}</div>
                    <div class="font-secondary  text-lg">{{i.category}}</div>
                </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>


  
  </div>
</template>

<script>
import DatePicker from "@/components/QCalendar/DatePicker.vue";
import { useCalendarStore } from "@/store/calendar";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import {date} from 'quasar'

import formatTime from '@/composables/DateTimeFormat';
export default {
  components: {
    DatePicker,
  },
  setup() {


    const current = Date.now()
      const formattedString = date.formatDate(current, 'YYYY/MM/DD')
    const calendarStore = useCalendarStore();
    const dateModel = ref(formattedString)
    const { holidays } = storeToRefs(calendarStore);
    const keys = ref([]);

    onMounted(async () => {
      await calendarStore.index();
      keys.value = Object.keys(holidays.value);
      console.log(keys);
    });

    return {
      holidays,
      keys,
      dateModel,
      formatTime,
      splitterModel: ref(50),
      selectDate:(val)=>{
     
        dateModel.value= val
        console.log(dateModel.value)

      }
    };
  },
};
</script>

<style>
</style>