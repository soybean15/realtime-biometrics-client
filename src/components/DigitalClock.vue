<template>
  <div
    class="rounded-md shadow-lg flex flex-col p-5 justify-center items-center m-5"
  >
    <div class="text-7xl font-extrabold">{{ currentTime }}</div>
    <div class="text-xl font-extrabold">{{ dateTime.date }}</div>
  </div>
  {{ dateTime }}
</template>
  
  <script>
import { ref, computed } from "vue";

const updateTime = (inputTime) => {
  const [hours, minutes, seconds] = inputTime.split(":").map(Number);

  // Increment seconds
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

  // Format the updated time
  const formattedHours = String(newHours).padStart(2, "0");
  const formattedMinutes = String(newMinutes).padStart(2, "0");
  const formattedSeconds = String(newSeconds).padStart(2, "0");

  const newTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return newTime;
};

export default {
  props: ["dateTime"],
  setup(props) {
    const currentTime = ref(props.dateTime.time);

    const updatedTime = computed(() => {
      if (currentTime.value) {
        return updateTime(currentTime.value);
      }
      return updateTime(props.dateTime.time);
    });

    setInterval(() => {
      currentTime.value = updatedTime.value;
    }, 1000);

    return {
      currentTime,
    };
  },
};
</script>
  
  <style>
</style>
  