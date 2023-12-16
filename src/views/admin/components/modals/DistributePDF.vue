<template>
  <PersistentDialog :width="'900px'" :maxWidth="'90vh'">
    <template v-slot:open-button="{ open }">
      <q-btn
        color="secondary"
        label="Distribute Attendance"
        glossy
        @click="open"
        rounded
        class="mx-1"
        icon-right="send"
        size=".7rem"
      />
    </template>

    <template v-slot:title> Distribute Attendance </template>

    <template v-slot:content>
      <div class="column p-5">
        <cut-off-picker class="my-5" @onSelect="onSelect" />

        <q-btn
          @click="attendanceStore.generateAllPDF()"
          label="Send Attendance"
          color="red"
        />
      </div>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import CutOffPicker from "../CutOffPicker.vue";
import { useAttendanceStore } from "@/store/attendance";
import { storeToRefs } from 'pinia';

export default {
  components: { PersistentDialog, CutOffPicker },
  setup() {
    const attendanceStore = useAttendanceStore();

    const {date}=storeToRefs(attendanceStore)
    return {
      attendanceStore,
      onSelect:(val)=>{
        date.value = val
        console.log(val)
      }
    };
  },
};
</script>

<style>
</style>