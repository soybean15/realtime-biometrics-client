<template>
  <div class="column p-5 bg-surface shadow-lg" style="width: 500px;">

    <search-bar/>

    <div class="bg-onSurface my-5 p-4 shadow-lg rounded-md">
        <div class="font-secondary text-sm ">Generate By:</div>

        <div class="column">
            <q-radio v-model="shape" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="line" label="Date" />
      <q-radio v-model="shape" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="rectangle" label="Cut Off" />
      <q-radio v-model="shape" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="ellipse" label="Month" />
    
        </div>


    </div>




  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
    components:{SearchBar}

}
</script>

<style>

</style>