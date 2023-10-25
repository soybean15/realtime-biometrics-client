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
  
    <PersistenDialog :width="'600px'">
      <template v-slot:open-button="{ open }">
        <q-btn color="secondary" @click="open" label="Add" />
      </template>
  
      <template v-slot:title>
        <div>Add Position</div>
      </template>
  
  
  
      <template v-slot:content>
        <q-form @submit="positionStore.addPosition" @reset="onReset" class="q-gutter-md">
  
          <span class="text-red-400" v-if="errors.name">{{ errors.name[0] }}</span>
          <q-input
            outlined
            v-model="positionForm.name"
            label="Position *"
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
      </template>
  
  
    </PersistenDialog>
  
  </template>
  
  <script>
  import PersistenDialog from "@/components/PersistentDialog.vue";
  import {usePositionStore} from '@/store/position'
  import { storeToRefs } from 'pinia';
  export default {
    components: { PersistenDialog },
  
    setup() {
  
      const positionStore =  usePositionStore()
      const {positionForm, errors}=storeToRefs(positionStore)
      return {
      
         positionForm,
         positionStore,
         errors
  
      };
    },
  };
  </script>
  
  <style>
  </style>