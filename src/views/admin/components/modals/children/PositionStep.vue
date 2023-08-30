<template>
  <div class="row">
    <div class="col-6 p-2">
      <div class="column p-3 bg-surface rounded-md shadow-md">
        <div class="text-lg font-bold">Select Position/s</div>
        <div class="h-60 overflow-y-auto bg-white p-2 rounded-md">
          <div v-for="position in positions" :key="position.id">
            <q-btn :color="position.selected ? 'secondary':'primary'" @click="select(position)" class="w-full m-1" :label="position.name" />
          </div>
        </div>
      </div>
    </div>


    <div class="col-6 p-2">
      <div class="column p-3 bg-surface rounded-md shadow-md">
        <div class="text-lg font-bold">Position/s</div>
        <div class="h-60 overflow-y-auto bg-white p-2 rounded-md">
          <div v-for="position in selectedPositions" :key="position.id">
            <q-btn color="secondary" @click="select(position)" class="w-full m-1" :label="position.name" />
          </div>
        </div>
      </div>
    </div>

 
  </div>
</template>

<script>
import { usePositionStore } from "@/store/position";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = usePositionStore();
    const { positions,selectedPositions } = storeToRefs(store);

    // const selectedPositions = ref([]);

    return {
      positions,
      select: (position) => {
        const index = selectedPositions.value.indexOf(position);

        if (index === -1) {
          // Position doesn't exist, so push it
          selectedPositions.value.push(position);
          position.selected = true
        } else {
          // Position exists, so remove it
          selectedPositions.value.splice(index, 1);
          position.selected = false
        }
      },
      selectedPositions
    };
  },
};
</script>

<style>
</style>