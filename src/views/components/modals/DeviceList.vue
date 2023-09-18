<template>
  <PersistentDialog :width="'500px'">
    <template v-slot:open-button="{ open }">
      <span @click="open">Devices</span>
    </template>

    <template v-slot:title >
        <div class="text-lg font-bold">Devices</div>
        
    </template>

    <template v-slot:content>
      <DataTable />
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import DataTable from "@/components/DataTable.vue";
import { onMounted } from "vue";

import { useZkStore } from "@/store/ZkTeco";
import { storeToRefs } from "pinia";

export default {
  components: {
    PersistentDialog,
    DataTable,
  },
  setup() {
    const zk = useZkStore();

    const { zkDevices } = storeToRefs(zk);
    onMounted(async () => {
      await zk.index();
    });

    return {
      zkDevices,
    };
  },
};
</script>

<style>
</style>