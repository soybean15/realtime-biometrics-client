<template>
  <div class="m-10 p-5 shadow-md bg-surface">
    <div class="text-2xl row justify-between">
      <span>Calendar</span>

      <div>
        <AddNewEvent />
      </div>
    </div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div class=" ">
          <DatePicker :events="keys" @onSelectDate="selectDate" />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="dateModel"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel
            class="p-5"
            :name="key"
            v-for="(item, key) in holidays"
            :key="key"
          >
            <div class="text-4xl py-5">
              {{ formatTime(key, "MMMM Do YYYY") }}
            </div>

            <div
              class="row justify-between items-center"
              v-for="i in item"
              :key="i.name"
            >
              <div>
                <div class="text-2xl">{{ i.name }}</div>
                <div class="font-secondary text-lg">{{ i.category }}</div>
              </div>
              <MoveEvent :event="i" v-if="i.name != 'Today'" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>

    <div class="row justify-end">
    
    </div>

  </div>
</template>

<script>
import DatePicker from "@/components/QCalendar/DatePicker.vue";
import { useCalendarStore } from "@/store/calendar";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { date } from "quasar";
import formatTime from "@/composables/DateTimeFormat";
import AddNewEvent from "./components/modals/AddNewEvent.vue";

import MoveEvent from "./components/modals/MoveEvent.vue";


export default {
  components: {
    DatePicker,
    AddNewEvent,
    MoveEvent,
  },
  setup() {
    const current = Date.now();
    const formattedString = date.formatDate(current, "YYYY/MM/DD");
    const calendarStore = useCalendarStore();
    const dateModel = ref(formattedString);
    const { holidays } = storeToRefs(calendarStore);
    const keys = ref([]);

    onMounted(async () => {
      await calendarStore.index();
      keys.value = Object.keys(holidays.value);

  
    });

    return {

      holidays,

      keys,
      dateModel,
      formatTime,
      splitterModel: ref(30),
      selectDate: (val) => {
        dateModel.value = val;

    
      },

   
    };
  },
};
</script>

<style>
</style>