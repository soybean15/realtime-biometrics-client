<template>
  <!-- 
  #slots : 
    -title
    -content
    -open-button
  #props :
    -width  // default 300px
    -maxWidth // default 80vh
    -backgroundColor
 -->
  <PersistentDialog width="400px">
    <template v-slot:title>
      <span class="font-bold text-xl">Move Event </span>
    </template>

    <template v-slot:content>
      <div class="py-2">
        <div class="text-lg font-bold">{{ formatTime(`${year}/${event.month}/${event.day}`) }}</div>
        <div class="text-lg ">{{ event.name }}</div>

        <div class="text-lg text-secondary">{{ event.category }}</div>
      </div>

      <div class="row">
        <div class="text-lg font-bold">Move to</div>
        <q-date
        class="w-full"
        v-model="newDate"
        minimal
      />
      </div>
      <div>
        <q-btn  label="submit"/>
      </div>
    </template>

    <template v-slot:open-button="{ open }">
      <q-btn @click="open" label="Move" color="secondary" />
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { date } from "quasar";

import formatTime from "@/composables/DateTimeFormat";
import { ref } from 'vue';
export default {
  props: ["event"],
  components: { PersistentDialog },
  setup() {
    const timeStamp = Date.now();
    const year = date.formatDate(timeStamp, "YYYY");
    const newDate = ref(null)

    return {
      year,
      formatTime,
      newDate
    };
  },
};
</script>

<style>
</style>