<template>
  <div class="q-pa-md q-gutter-sm">
    <slot name="open-button" :open="open" :data="data"></slot>

    <q-dialog
      v-model="persistent"

      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" :style="{'width': width ?? '300px', 'max-width': maxWidth ?? '80vh'}">
        <q-card-section>
            <slot name="title"></slot>
        </q-card-section>

        <q-card-section class="q-pt-none">
       
            <slot name="content"></slot>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
  
  <script>
import {  ref } from "vue";

export default {
 
  props:['width','maxWidth'],
  setup(props) {
    const persistent = ref(false);
  
  
    console.log('open dialog')

   

    return {
      persistent,
   
      open: () => {
        console.log(props.size)
        persistent.value = true;
      },
      
      
    
    };
  },
};
</script>
  