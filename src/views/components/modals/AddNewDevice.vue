<template>
  <!-- 
  #slots : 
    -title
    -content
  #props :
    -width
    -maxWidth
    -backgroundColor
 -->
  <PersistentDialog :width="'400px'">
    <template v-slot:open-button="{ open }">
      <span @click="open">Add New Device</span>
    </template>

    <template v-slot:title>
      <div class="font-bold text-lg">Add New Device</div>
    </template>

    <template v-slot:content>
      <div>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="zkDevice.name"
            dense
            label="Device Name"
            hint="ex: ZkTeco m14, Device1, MyDevice"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            dense
            v-model="zkDevice.ip_address"
            label="IP Address"
            hint="ex: 192.168.1.201(default)"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
           
          />


          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { useZkStore } from "@/store/ZkTeco";
import { storeToRefs } from 'pinia';
export default {
  components: { PersistentDialog },
  setup() {

    const zk = useZkStore()

    const {zkDevice} = storeToRefs(zk)

    return {
        zkDevice
    }



  },
};
</script>

<style>
</style>