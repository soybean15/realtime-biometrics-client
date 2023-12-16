<template>
  <div class="m-3 p-5 shadow-md bg-surface">
    <div class="text-2xl row justify-between">
      <span>Calendar</span>

      <div>
        <AddNewEvent />
      </div>
    </div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-list class="h-screen" bordered style="max-height:700px;">
          <q-item v-for="(holiday, key) in holidays" :key="key" clickable @click="selectEvent(key)">
            <q-item-section>
              <q-item-label class="font-bold text-orange">{{ formatTime(key, "MMMM Do") }}</q-item-label>

              <q-list>
                <div class="ml-2" v-for="item in holiday" :key="item.id">
                  <div class=""> {{ item.name }}</div>
                  <div class="text-xs font-secondary "> {{ item.category }}</div>
                </div>
              </q-list>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{
                moment(key, "YYYYMMDD").fromNow()
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-item v-for="(holiday, key) in holidays" :key="key">
            <q-item-section>
              <q-item-label>{{ formatTime(key, "MMMM Do YYYY") }}</q-item-label>
              <q-item-label caption lines="2"
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{
                moment(key, "YYYYMMDD").fromNow()
              }}</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item> -->
        </q-list>
      </template>

      <template v-slot:after>
        <div class="mt-5">
          <DatePicker :events="keys" @onSelectDate="selectDate" />
        </div>

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

    <div class="row justify-end"></div>
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
import moment from "moment";
import MoveEvent from "./components/modals/MoveEvent.vue";

export default {
  components: {
    DatePicker,
    AddNewEvent,
    MoveEvent,
  },
  setup() {
    // const current = Date.now();
    // const formattedString = date.formatDate(current, "YYYY/MM/DD");
     const calendarStore = useCalendarStore();
    // const dateModel = ref(formattedString);
    const { holidays, dateModel,keys } = storeToRefs(calendarStore);
    //const keys = ref([]);

    onMounted(async () => {
      await calendarStore.index();
    
    });

    return {
      holidays,
      moment,
      keys,
      dateModel,
      formatTime,
      splitterModel: ref(30),
      selectDate: (val) => {
        dateModel.value = val;
      },

      selectEvent:(val)=>{

        dateModel.value = date.formatDate(val, "YYYY/MM/DD");
      }
    };
  },
};
</script>

<style>
</style>