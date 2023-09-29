<template>
  <div class="q-px-lg q-py-md bg-surface rounded-lg">
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        <div class="row justify-between">
          <span>Today's Attendance </span>
          <span>{{ dateTime.date }}</span>
        </div>
      </q-timeline-entry>

      <div v-if="todayAttendance && todayAttendance.length == 0">
        No Data Available
      </div>

      <div v-else>


        <q-timeline-entry
          :title="item.type"
          :subtitle="format(item.timestamp, 'LT')"
          v-for="item in todayAttendance"
          :key="item.id"

          
        />
      </div>
    </q-timeline>
  </div>
</template>

  <script>
import { useSettingStore } from "@/store/settings";
import { storeToRefs } from "pinia";
import formatTime from "@/composables/DateTimeFormat";

export default {
  props: ["todayAttendance"],
  setup() {
    const settingStore = useSettingStore();

    const { dateTime } = storeToRefs(settingStore);

    return {
      dateTime,

      format: (val) => {
        // const time = val.split(' ')
        // return time[1]

        console.log(formatTime(val,'LT').toString());

        return formatTime(val,'LT').toString();
      },
    };
  },
};
</script>