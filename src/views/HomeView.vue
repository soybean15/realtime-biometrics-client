<template>
  <div class="row my-20">
    <div class="p-3 col-7 column">
      <EmployeeInfoFlash class="" :employee="employee" />
    </div>

    <div class="column col-5">
      <DigitalClockView />
      <AttendanceList :employeeList="employeeList"/>
    </div>
  </div>

  <!-- 
 
<div v-for="item in attendance" :key="item.serial_number">

   <div class="row">

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

    const { employee, employeeList } = storeToRefs(attendanceStore);

    const ws = new WebSocketService("zkTeco");

    ws.listen(".get.attendance", (response) => {
      console.log(response);

      employee.value = response
      response.attendance.employee.image =
        response.attendance.employee.image.replace(
          "http://localhost",
          "http://localhost:8000"
        );
      employeeList.value.push(response.attendance);
    });

    //   window.echo.channel("zkTeco").listen(".get.attendance", (response) => {
    //    console.log(response)
    //    response.attendance.employee.image = response.attendance.employee.image.replace("http://localhost", "http://localhost:8000");
    //    attendance.value.push(response.attendance)
    //  });
    //  const sendMessage=()=>{
    //    axios.post('http://localhost:8000/api/test', { message: message.value })
    //      .then(response => {
    //        console.log('Message sent successfully:', response.data);
    //      })
    //      .catch(error => {
    //        console.error('Error sending message:', error);
    //      });
    //  }

    return {
      employee,
      employeeList
    }
  },
};
</script>

<style>
</style>