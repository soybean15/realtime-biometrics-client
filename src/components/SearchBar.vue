<template>
  <q-input dense @keyup.enter="onSearch"  standout="bg-white" outlined  borderless v-model="text"  type="search" label="Search">
    <template  v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { ref } from 'vue';

export default {
  props:[],
  emits:['search'],
  setup(props, {emit}){

    const text = ref('')



    return {
      text,
      onSearch:()=>{
        emit('search', text.value)
      }
    }
  }
};
</script>

<style>
</style>