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
      
      <div @click="open">  <slot></slot></div>

      
    </template>

    <template v-slot:title>
      <div class="font-bold text-lg">Add New Device</div>
    </template>

    <template v-slot:content>
      <div>
        <q-form @submit="onSubmit"  class="q-gutter-md">
            <div class="text-red-400 row " v-if="errors['name']">{{ errors['name'][0] }}</div>
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

          <div class="text-red-400 row " v-if="errors['ip_address']">{{ errors['ip_address'][0] }}</div>
          <q-input
            filled
            dense
            v-model="zkDevice.ip_address"
            label="IP Address"

            mask="###.###.#.###"
            fill-mask
            hint="ex: 192.168.1.201(default)"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
          
          </q-input>
          <div class="text-red-400 row " v-if="errors['port']">{{ errors['port'][0] }}</div>
          <div class="row  justify-between">



            
            
          <q-input
            filled
            dense
     
            mask="####"
            fill-mask="#"
            v-model="zkDevice.port"
            label="Port"
            hint="ex: 4370(default)"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
         
          </q-input>
          <q-btn :loading="loading['ping']" class="h-10" dense color="secondary" @click="zk.ping" label="ping" />
          </div>

          
          <div class="column items-center">
            
            <div class=" row justify-center" :class="status['status']===false?'text-red-400':'text-green-400'" v-if="status['message']">{{ status['message'] }}</div>
            <div class=" row justify-center text-green-400" v-if="status['device_name']">{{ status['device_name'] }}</div>

          </div>
      

          <div>
            <q-btn :loading="loading['submit']"  label="Submit" type="submit" color="primary" />
        
          </div>
        </q-form>
      </div>
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { useZkStore } from "@/store/ZkTeco";
import { storeToRefs } from "pinia";
export default {
  components: { PersistentDialog },
  setup() {
    const zk = useZkStore();

    const { zkDevice ,loading,status,errors} = storeToRefs(zk);

    return {
      zkDevice,
      loading,
      status,
      errors,
      zk,
      onSubmit:()=>{
        zk.add()
      }
    };
  },
};
</script>

<style>
</style>