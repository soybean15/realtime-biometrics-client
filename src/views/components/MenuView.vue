<template>
  <q-bar class="bg-primary text-white rounded-borders">
    <div class="cursor-pointer non-selectable">
      File
      <q-menu>
        <q-list dense style="min-width: 100px">
          <q-item clickable v-if="user">
            <q-item-section
              ><AddNewDevice>Add New Device</AddNewDevice></q-item-section
            >
          </q-item>
          <q-item clickable v-if="user">
            <q-item-section><DeviceList /></q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>Ping</q-item-section>
          </q-item>

          <q-separator />

          <q-item :to="{ name: 'settings' }" clickable>
            <q-item-section>Settings</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Help</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </div>
    <div class="cursor-pointer non-selectable">
      View
      <q-menu>
        <q-list dense style="min-width: 200px">
          <q-item clickable v-close-popup>
            <q-item-section>Side Panel</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Show Lates</q-item-section>
          </q-item>
          <q-item   @click="zkStore.enableRealtimeUpdate(zk.device.isLive)" clickable>
            <q-item-section >
              <div class="row items-center justify-between">
                <span  class="px-1">Live Data </span>
                <q-chip color="red" class="px-2" dense text-color="white" label="Live" v-if=" zk&& zk.device.isLive"/>

              </div>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Time Format</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>Reload</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </div>
  </q-bar>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import AddNewDevice from "./modals/AddNewDevice.vue";
import DeviceList from "./modals/DeviceList.vue";
import WebSocketService from "@/composables/WebSocket";
import { useZkStore } from "@/store/ZkTeco";
export default {
  components: { AddNewDevice, DeviceList },
  setup() {
    const auth = useAuthStore();
    const zkStore = useZkStore();


    const { zk } = storeToRefs(zkStore);
    const { user } = storeToRefs(auth);

    const ws = new WebSocketService("live_update");

    ws.listen(".get.live_update", (response) => {
      try{
        zk.value = response
      }catch(e){
        zk.value = false
      }
      
      console.log(response);
    });
    return {
      user,
      zk,
      zkStore
    };
  },
};
</script>
