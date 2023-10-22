<template>
  <div class="column p-5 bg-surface shadow-lg" >
    <search-bar />

    <div class="bg-onSurface my-5 p-4 shadow-lg rounded-md">
      <div class="font-secondary text-sm">Generate By:</div>

      <div class="column">
        <q-radio
          v-model="model"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="date"
          label="Date"
        />
        <q-radio
          v-model="model"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="cut_off"
          label="Cut Off"
        />
        <q-radio
          v-model="model"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="month"
          label="Month"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import { ref } from 'vue';

export default {
  components: { SearchBar },
  setup(){

    const  model = ref('date')

    return{

        model
    }
  }
};
</script>

<style>
</style>