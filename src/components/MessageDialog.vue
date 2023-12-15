<template>
  
  <q-dialog
      v-model="dialog"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <slot name="body" ></slot>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { ref } from 'vue'
export default {
    props:['title','isOpen'],
    setup(props){
        const dialog = ref(props.isOpen)

        
        return {
            dialog
        }
    }

}
</script>

<style>

</style>