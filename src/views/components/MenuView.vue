<template>
  <q-bar class="bg-primary text-white rounded-borders">
    <div class="cursor-pointer non-selectable">
      File
      <q-menu>
        <q-list dense style="min-width: 200px">
          <q-item clickable v-if="user">
            <q-item-section
              ><AddNewDevice>Add New Device</AddNewDevice></q-item-section
            >
          </q-item>
          <q-item clickable v-if="user">
            <q-item-section><DeviceList /></q-item-section>
          </q-item>

          <q-item clickable v-close-popup v-if="zk">
            <q-item-section>
              <div class="row justify-between items-center">
                <span class="font-secondary">{{ zk.config.device.ip_address }}</span>
                <q-chip color="green" class="px-2" dense text-color="white" label="active"/>

              </div>
            
            </q-item-section>
          </q-item>

          <q-separator />

          
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
        
       
          <q-item   @click="zkStore.enableRealtimeUpdate(zk.config.isLive)" clickable v-if="zk">
            <q-item-section >
              <div class="row items-center justify-between">
                <span  class="px-1">Live Data </span>
                <q-chip color="red" class="px-2" dense text-color="white" label="Live" v-if=" zk&& zk.config.isLive"/>

              </div>
            </q-item-section>
          </q-item>
          <q-item @click="settingStore.updateTimeFormat(zk.config.time_format)" clickable  v-if="zk">
            <q-item-section>
              <div class="row items-center justify-between">
                <span  class="px-1">Time Format </span>

                <span class="font-secondary"  v-if=" zk&& zk.config.time_format=='24hrs'">24hrs</span>
                <span class="font-secondary"  v-else>12hrs</span>
                <!-- <q-chip color="primary" class="px-2" dense text-color="white" label="24hrs" v-if=" zk&& zk.config.time_format=='24hrs'"/>
                <q-chip color="primary" class="px-2" dense text-color="white" label="12Hrs" v-else/> -->

              </div>
            </q-item-section>
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
import { useSettingStore } from "@/store/settings";
export default {
  components: { AddNewDevice, DeviceList },
  setup() {
    const auth = useAuthStore();
    const zkStore = useZkStore();
    const settingStore = useSettingStore()

    const { zk } = storeToRefs(zkStore);
    const { user } = storeToRefs(auth);

    const ws = new WebSocketService("config");

    ws.listen(".get.config", (response) => {
      try{
        zk.value = response
      }catch(e){
        zk.value = false
      }
      
      
    });
    return {
      user,
      zk,
      zkStore,
      settingStore
    };
  },
};
</script>
