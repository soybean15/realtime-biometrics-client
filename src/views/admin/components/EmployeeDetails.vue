<template>
  <div class="row p-2 items-center justify-between">
    <div @click="back" class="row items-center cursor-pointer">
      <q-icon size="1.5rem" name="arrow_back"></q-icon>
      <span class="text-lg"> Back</span>
    </div>

    <div>
      <span></span>
      <q-btn outline label="delete" color="red"></q-btn>
    </div>
  </div>

  <div class="row h-40 m-2 shadow-sm rounded-lg">
    <div class="col-5 p-3 bg-gray-600">
      <div class="column">
        <div class="row">
          <div class="col-6 justify-center row">
            <q-avatar size="120px" rounded>
              <img  :src="selectedEmployee.image"/>
            </q-avatar>
          </div>
          <div class="col-6">
            

          </div>
        </div>
      </div>
    </div>
    <div class="col-7 bg-red-600"></div>
  </div>
</template>

<script>
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
import router from "@/router";
export default {
  setup() {
    const _employee = useEmployeeStore();
    const { selectedEmployee } = storeToRefs(_employee);

    return {
      selectedEmployee,
      back: () => {
        router.go(-1);
      },
    };
  },
};
</script>

<style>
</style>