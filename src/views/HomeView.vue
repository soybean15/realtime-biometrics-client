<template>

   <div><DigitalClock :dateTime="dateTime"/></div>
 
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

import { storeToRefs } from 'pinia';

import { useSettingStore } from '@/store/settings';
import DigitalClock from '../components/DigitalClock.vue';


export default {
   components:{DigitalClock},
   setup(){


      const settingStore = useSettingStore()

      const {dateTime}=storeToRefs(settingStore)
 



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

     return{
      dateTime
        
     }
   }

}
</script>

<style>

</style>