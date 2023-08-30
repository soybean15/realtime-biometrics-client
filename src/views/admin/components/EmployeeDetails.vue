<template>
  <div class="row p-2 items-center justify-between">
    <div class="row items-center cursor-pointer">
      <q-icon @click="back" size="1.5rem" name="arrow_back"></q-icon>
      <span class="text-md"> Employee Details</span>
    </div>

    <div>
      <span class="bg-surface">{{selectedEmployee.created_at}}</span>
      <q-btn outline label="delete" color="red"></q-btn>
    </div>
  </div>

  <div class="row">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="profile" label="Profile" />
      <q-tab name="attendance" label="Attendance" />
    </q-tabs>
  </div>

  <div class="row h-40 m-2  shadow-sm rounded-lg">
    <div class="col-6 p-2 pr-1 ">

    <div class="p-2 bg-surface rounded-lg">

      <div class="column">
        <div class="row">
          <div class="col-8 column items-center justify-center row">
            <q-avatar size="120px" rounded>
              <img :src="selectedEmployee.image" />
            </q-avatar>
            <span>{{ selectedEmployee.full_name }}</span>
          </div>
          <div class="col-4"></div>
        </div>
      </div>

    </div>
  
    </div>
    <div class="col-6 p-2 pl-1 ">
      <div class="col-6 bg-surface rounded-lg h-40">

      </div>
    </div>
  </div>
</template>

<script>
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
import router from "@/router";
import { ref } from 'vue';

export default {
  setup() {
    const _employee = useEmployeeStore();
    const { selectedEmployee } = storeToRefs(_employee);


    
    return {
      selectedEmployee,
      tab: ref('profile'),
      back: () => {
        router.go(-1);
      },
    };
  },
};
</script>

<style>
</style>