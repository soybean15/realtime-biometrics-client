<template>
  <div class="q-gutter-md">
    <span>Select Position</span>
    <q-select
      outlined
      v-model="_position"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="positionOptions"
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
      v-model="_department"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="departmentOptions"
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

const getOptions = (arr) => {
  const newArr = [];

  arr.forEach((element) => {
    newArr.push(element.name);
  });

  return newArr;
};
export default {
  setup() {
    const position = usePositionStore();
    const deparment = useDepartmentStore();

    const { positions, _position } = storeToRefs(position);
    const { departments, _department } = storeToRefs(deparment);

    const departmentOptions = ref(getOptions(departments.value));
    const positionOptions = ref(getOptions(positions.value));

    return {
      _position,
      _department,
      positionOptions,
      departmentOptions,
      filterPosition(val, update) {
        update(() => {
          const needle = val.toLowerCase();
          positionOptions.value = getOptions(positions.value).filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },

      filterDepartment(val, update) {
        update(() => {
          const needle = val.toLowerCase();
          departmentOptions.value = getOptions(departments.value).filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>

<style>
</style>