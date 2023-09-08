<template>
    <div >
    <slot name="open-button" :open="open" ></slot>
    <!-- <q-btn label="Right" icon="keyboard_arrow_right" color="primary" @click="open('right')" />
    <q-btn label="Bottom" icon="keyboard_arrow_down" color="primary" @click="open('bottom')" />
    <q-btn label="Left" icon="keyboard_arrow_left" color="primary" @click="open('left')" /> -->

    <q-dialog v-model="dialog" :position="position">
      <q-card :style="{'width':width ?? '350px'}">
 

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold"><slot name="title"></slot></div>
            <div class="text-grey"><slot name="message"></slot></div>
          </div>

          <q-space />
          <slot name="buttons" :close="close"></slot>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

</template>

<script>
import {ref} from 'vue'
export default {

    props:['pos','width'],
    setup (props) {
    const dialog = ref(false)
    const position = ref('top')

    return {
      dialog,
      position,

      

      open () {
        position.value = props.pos
        dialog.value = true
      },
      close(){
        dialog.value = false
      }
    }
  }

}
</script>

<style>

</style>