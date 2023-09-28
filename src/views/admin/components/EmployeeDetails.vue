<template>
  <div v-if="selectedEmployee">
    <div class="row p-2 items-center justify-between">
      <div class="row items-center cursor-pointer">
        <q-icon @click="back" size="1.5rem" name="arrow_back"></q-icon>
        <span class="text-md"> Employee Details</span>
      </div>

      <div class="row items-center px-2">
        <span class="bg-surface p-1 mx-2 rounded-md shadow-sm font-secondary">{{
          `Created at: ${formatTime(selectedEmployee.created_at)}`
        }}</span>

        <ConfirmDialog :pos="'top'">
          <template v-slot:open-button="{ open }">
            <q-btn @click="open" dense label="delete" color="red"></q-btn>
          </template>

          <template v-slot:title>Delete Employee</template>

          <template v-slot:message>{{
            `Delete ${selectedEmployee.full_name}?`
          }}</template>

          <template v-slot:buttons="{ close }">
            <div class="m-2">
              <q-btn
                outline
                @click="onDelete"
                :loading="loading"
                size=".8rem"
                class="mx-1"
                dense
                label="Confirm"
                color="red"
              ></q-btn>
              <q-btn
                @click="close"
                outline
                size=".8rem"
                class="mx-1"
                dense
                label="Cancel"
                color="primary"
              ></q-btn>
            </div>
          </template>
        </ConfirmDialog>
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

    <div class="row h-40 m-2 shadow-sm rounded-lg">
      <div class="col-6 p-2 pr-1">
        <ProfileView
          :selectedEmployee="selectedEmployee"
          :upload="upload"
          :onUpdate="onUpdate"
          :errors="errors"
        />
      </div>
      <div class="col-6 p-2 pl-1">

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="profile">
            <TodayAttendance :todayAttendance="selectedEmployee.attendance_today"/>
          
          </q-tab-panel>

          <q-tab-panel name="attendance">
           <WeeklyView/>
          </q-tab-panel>
        </q-tab-panels>

     
     
   
      </div>
    </div>
  </div>
  
</template>

<script>
import { useEmployeeStore } from "@/store/employee";
import { storeToRefs } from "pinia";
import router from "@/router";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { onMounted, ref } from "vue";

import { usePositionStore } from "@/store/position";

import ProfileView from "./children/ProfileView.vue";


import formatTime from "@/composables/DateTimeFormat";
//import moment from 'moment';
import TodayAttendance from "./children/TodayAttendance.vue";
import WeeklyView from "./children/WeeklyView.vue";
export default {
  components: { ConfirmDialog, ProfileView ,TodayAttendance,WeeklyView},
  setup() {
    const _employee = useEmployeeStore();
    const { selectedEmployee, errors } = storeToRefs(_employee);
    const _position = usePositionStore();
    const { positions } = storeToRefs(_position);

    const loading = ref(false);

    onMounted(() => {
      if (!selectedEmployee.value) {
        console.log("null");
        const id = router.currentRoute.value.params.id;
        _employee.get(id);
      }
    });

    console.log(selectedEmployee.value);

    return {
      selectedEmployee,
      _employee,
      positions,
      loading,
      errors,
      tab: ref("profile"),
      back: () => {
        router.go(-1);
      },
      onDelete: async () => {
        loading.value = true;
        const delayDuration = 500;
        await new Promise((resolve) => setTimeout(resolve, delayDuration));
        _employee.destroy();
        loading.value = false;
        router.go(-1);
      },

      onUpdate: (attribute, val) => {
        _employee.update(attribute, val);
      },
      formatTime,

      upload: (val) => {
        _employee.upload(val);
      },
    };
  },
};
</script>

<style>
</style>