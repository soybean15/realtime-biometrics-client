<template>
  <!-- 
  #slots : 
    -title
    -content
    -open-button
  #props :
    -width  // default 300px
    -maxWidth // default 80vh
    -backgroundColor
 -->
  <PersistentDialog :width="'600px'">
    <template v-slot:open-button="{ open }">
      <q-btn
        @click="open"
        label="Add Event"
        color="secondary"
        icon-right="edit_calendar"
      />
    </template>
    <template v-slot:title>
      <div>Add New Event</div>
    </template>

    <template v-slot:content="close">
      <div>
        <q-form @submit="onSubmit(close)">
          <q-input
            v-model="eventForm.name"
            class="my-2"
            outlined
            dense
            label="Event Name"
          />

          <div class="row w-full my-2 justify-between">
            <q-select
              class="col-6"
              color="grey-3 "
              outlined
              dense
              label-color="orange"
              v-model="eventForm.month"
              @update:model-value="onUpdateMonth"
              :options="months"
              label="Select Month"
            >
              <template v-slot:append>
                <q-icon name="event" color="orange" />
              </template>
            </q-select>

            <q-select
              class="col-5"
              color="grey-3"
              outlined
              dense
              label-color="orange"
              v-model="eventForm.day"
              :options="days"
              label="Select Day"
            >
              <template v-slot:append>
                <q-icon name="event" color="orange" />
              </template>
            </q-select>
          </div>
          <q-select
            class="my-2"
            color="grey-3"
            outlined
            dense
            label-color="orange"
            v-model="eventForm.category"
            :options="categories"
            label="Category"
          >
            <template v-slot:append>
              <q-icon name="event" color="orange" />
            </template>
          </q-select>

          <div>
            <q-btn color="secondary" type="submit" label="submit" />
          </div>
        </q-form>
      </div>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { ref } from "vue";
import { useCalendarStore } from "@/store/calendar";
import { storeToRefs } from "pinia";
const months = [
  { label: "January", value: 1 }, //this
  { label: "February", value: 2 },
  { label: "March", value: 3 }, //this
  { label: "April", value: 4 },
  { label: "May", value: 5 }, //this
  { label: "June", value: 6 },
  { label: "July", value: 7 }, //this
  { label: "August", value: 8 }, //this
  { label: "September", value: 9 },
  { label: "October", value: 10 }, //this
  { label: "November", value: 11 },
  { label: "December", value: 12 }, //this
];

const categories = [
  "Regular Holidays",
  "Special (Non-Working) Holidays",
  "Special (Working) Holidays",
];
export default {
  components: { PersistentDialog },
  setup() {
    const calendarStore = useCalendarStore();

    const { eventForm } = storeToRefs(calendarStore);
    const days = ref([]);

    return {
      months,
      days,
      categories,
      eventForm,
      onUpdateMonth: (val) => {
        console.log(val);
        days.value = [];
        eventForm.value.day = 1;
        let total = 31;
        if (val.value === 2) {
          total = 28;
        } else if (
          val.value === 4 ||
          val.value === 6 ||
          val.value === 9 ||
          val.value === 11
        ) {
          total = 30;
        }

        for (let i = 1; i <= total; i++) {
          days.value.push(i);
        }
      },
      onSubmit:(onClose)=>{
        calendarStore.addEvent()
        onClose()
      }
    };
  },
};
</script>

<style>
</style>