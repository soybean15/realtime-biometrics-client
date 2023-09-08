

<template>
  <div class="q-gutter-md">
    <span>Select Position</span>
    <q-select
      outlined
      v-model="position"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="positionOptions"
      option-label="name"
      @filter="filterPosition"
      hint="Basic filtering"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>

  <div class="q-gutter-md">
    <span>Select Position</span>
    <q-select
      outlined
      v-model="department"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="departmentOptions"
      option-label="name"
      @filter="filterDepartment"
      hint="Basic filtering"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>


</template>

<script>
import { usePositionStore } from "@/store/position";
import { useDepartmentStore } from "@/store/department";
import { storeToRefs } from "pinia";
import { ref } from "vue";


//To do Add value
const getOptions = (arr) => {
  const newArr = [];

  

  arr.forEach((element) => {

    newArr.push({id: element.id, name: element.name});
  });

  return newArr;
};
export default {
  setup() {
    const positionStore = usePositionStore();
    const deparmentStore = useDepartmentStore();

    const { positions, position } = storeToRefs(positionStore);
    const { departments, department } = storeToRefs(deparmentStore);

    const departmentOptions = ref(getOptions(departments.value));
    const positionOptions = ref(getOptions(positions.value));

    return {
      position,
      department,
      positionOptions,
      departmentOptions,
      filterPosition(val, update) {
        update(() => {
          const needle = val.toLowerCase();
          positionOptions.value = getOptions(positions.value).filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        });
      },

      filterDepartment(val, update) {
        update(() => {
          const needle = val.toLowerCase();
          departmentOptions.value = getOptions(departments.value).filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>

<style>
</style>