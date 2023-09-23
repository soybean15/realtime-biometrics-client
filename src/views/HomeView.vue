<template>
  <div class="">
    <DigitalClock :dateTime="dateTime" :timeFormat="dateTime.time_format">
      <template v-slot:body="{ hour,minute,second, date, timeFormat, amPm }">
         <div class="row justify-end">
            <div
               class="font-obitron bg-surface   rounded-s-md shadow-lg tracking-wide flex flex-col p-5 justify-center items-end m-5 mr-0"
            >
               <div class=" text-7xl row justify-start items-start">

                  <div class="column p-3">
                    
                     <div class=" text-lg"  :class="{'font-secondary':timeFormat == '24hrs'}">12hrs</div>
                     <div class="text-lg"  :class="{'font-secondary':timeFormat =='12hrs'}">24hrs</div>
                  </div>
                  <div class="row">
                    <div class="w-32 p-1 flex justify-center" >{{ hour}}</div> :
                    <div class="w-32 p-1 flex justify-center">{{ minute}}</div>: 
                    <div class="w-32 p-1 flex justify-center">{{ second}}</div> 
                  </div>
                  <div class=" pt-2 pl-1" v-if="timeFormat =='12hrs'" >
                     <!-- <div class="text-lg">{{ amPm }}</div> -->
                     <div class=" text-lg"  :class="{'font-secondary':amPm == 'AM'}">AM</div>
                     <div class="text-lg"  :class="{'font-secondary':amPm == 'PM'}">PM</div>
                  </div>
                
               </div>
               <div class="text-xl row">
                 
                  <div>{{ date }}</div>
                
               
               </div>
            </div>

         </div>

      </template>
    </DigitalClock>
  {{ dateTime }}
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
import { storeToRefs } from "pinia";

import { useSettingStore } from "@/store/settings";
import DigitalClock from "../components/DigitalClock.vue";

export default {
  components: { DigitalClock },
  setup() {
    const settingStore = useSettingStore();

    const { dateTime } = storeToRefs(settingStore);

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
      dateTime,
    };
  },
};
</script>

<style>
</style>