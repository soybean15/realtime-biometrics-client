<template>
  <div
    class=" font-obitron rounded-s-md shadow-lg tracking-wide flex flex-col p-5 justify-center items-center m-5 mr-0"
  >
    <div class="text-7xl ">{{ currentTime }}</div>
    <div class="text-xl">{{ dateTime.date }}</div>
  </div>
</template>
  
<script>
import { ref, computed, watchEffect } from "vue";

const updateTime = (inputTime, time_format, amPm) => {
  console.log(inputTime);
  const [hours, minutes, seconds] = inputTime.split(/:| /).map(Number);

  // return [hours, minutes, seconds, amPm]
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
  console.log(formattedSeconds);

  if (time_format === "12hrs") {
    // Convert to 12-hour format
    // const ampm = newHours >= 12 ? "PM" : "AM";
    formattedHours = newHours % 12 || 12; // Handle midnight (0) as 12

    formattedHours = String(formattedHours).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPm}`;
  } else if (time_format === "24hrs") {
    // Keep in 24-hour format
    if (formattedHours <= 12 && amPm === "PM") {
      formattedHours =
        formattedHours == 12 ? "12" : String(Number(formattedHours) + 12);
    } else if (formattedHours === "12" && amPm === "AM") {
      formattedHours = "00"; // Midnight in 24-hour format
    }

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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
