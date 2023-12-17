<template>
  <div class="row my-20">
    <div class="p-3 col-7 column">
      <EmployeeInfoFlash class="" :attendance="attendance" />
    </div>

    <div class="column col-5">
      <DigitalClockView />
      <AttendanceList :attendanceList="attendanceList" />
    </div>
  </div>

  <!-- 
 
<div v-for="item in attendance" :key="item.serial_number">

   <div class="row">
12hrs
24hrs
07
:
19
:
49
AM
PM
Sep, 25 2023, Mon
Today
Jane Doe (Time in)
Time: 8:01
1 min ago

      <img :src="item.employee.image" class="h-20 w-20"/>
      <div>

         <div class="font-bold text-lg"><span class="font-thin">UID: </span>{{ item.serial_number }}</div>
      <div class="font-bold text-lg"><span class="font-thin">User Id: </span>{{ item.biometrics_id }}</div>
      <div class="font-bold text-lg"><span class="font-thin">TimeStamp: </span>{{ item.timestamp }}</div>
      <div class="font-bold text-lg"><span class="font-thin">UID: </span> {{ item.type }}</div>
      </div>


   </div>

</div> -->
</template>
<script >
import DigitalClockView from "@/views/components/DigitalClockView.vue";
import AttendanceList from "./components/AttendanceList.vue";
import WebSocketService from "@/composables/WebSocket";
import EmployeeInfoFlash from "./components/EmployeeInfoFlash.vue";
import { useAttendanceStore } from "@/store/attendance";
import { storeToRefs } from "pinia";
export default {
  components: {
    DigitalClockView,
    AttendanceList,
    EmployeeInfoFlash,
  },
  setup() {
    const attendanceStore = useAttendanceStore();

    const { attendance, attendanceList } = storeToRefs(attendanceStore);

    const ws = new WebSocketService("zkTeco");

    ws.listen(".get.attendance", (response) => {
      console.log(response);

      attendance.value = response.attendance;
      response.attendance.employee.image =
        response.attendance.employee.image.replace(
          "http://localhost",
          "http://localhost:8000"
        );
      attendanceList.value.unshift(response.attendance);
      console.log(response);
    });

    return {
      attendance,
      attendanceList,
    };
  },
};
</script>

<style>
</style>