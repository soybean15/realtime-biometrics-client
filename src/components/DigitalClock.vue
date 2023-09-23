<template>

  <div v-if="currentTime">
    <slot name="body" 
    :time = "currentTime.time"
    :hour="currentTime.hours"
    :minute = "currentTime.minutes" 
    :second="currentTime.seconds"
    :date = "dateTime.date"
     :timeFormat="dateTime.time_format"
      :amPm="dateTime.time_format ==='12hrs' ? dateTime.amPm:''" ></slot>

  </div>
</template>
  
<script>
import { ref, computed, watchEffect } from "vue";

const updateTime = (inputTime, time_format, amPm) => {

  
  let hours, minutes, seconds
  if(inputTime.time){
     [hours, minutes, seconds] = inputTime.time.split(/\s*:\s*/).map(Number);
   
  }else{
     [hours, minutes, seconds] = inputTime.split(/\s*:\s*/).map(Number);
    
  }




  let newSeconds = seconds + 1;
  let newMinutes = minutes;
  let newHours = hours;

  if (newSeconds === 60) {
    newSeconds = 0;
    newMinutes += 1;

    if (newMinutes === 60) {
      newMinutes = 0;
      newHours += 1;
    }
  }

  let formattedHours = String(newHours).padStart(2, "0");
  let formattedMinutes = String(newMinutes).padStart(2, "0");
  let formattedSeconds = String(newSeconds).padStart(2, "0");

  let formattedTime = ''


  if (time_format === "12hrs") {

    formattedHours = newHours % 12 || 12; 

    formattedHours = String(formattedHours).padStart(2, "0");
    formattedTime= `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
  } else if (time_format === "24hrs") {

    if (formattedHours <= 12 && amPm === "PM") {
      formattedHours =
        formattedHours == 12 ? "12" : String(Number(formattedHours) + 12);
    } else if (formattedHours === "12" && amPm === "AM") {
      formattedHours = "00"; 
    }

    formattedTime= `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
  }


  return {
    time : formattedTime  ,
    hours:formattedHours,
    minutes:formattedMinutes,
    seconds:formattedSeconds
  }

  //else{ return  [hours, minutes, seconds, amPm]}
};

export default {
  props: ["dateTime", "timeFormat"],

  setup(props) {
    const currentTime = ref(props.dateTime.time);

    //'00:00:00'

    const updatedTime = computed(() => {
      if (currentTime.value) {
        return updateTime(
          currentTime.value,
          props.timeFormat,
          props.dateTime.amPm
        );
        

       // return updateTime("12:00:00", "24hrs", "AM");
      } else return updateTime(props.dateTime.time, "24hrs");
    });

    watchEffect(() => {
      const intervalId = setInterval(() => {
        currentTime.value = updatedTime.value;
      }, 1000);

      // amPm.value = props.dateTime.time_format

      return () => {
        clearInterval(intervalId);
      };
    });

    return {
      
      currentTime,
    };
  },
};
</script>
  
<style>
</style>
