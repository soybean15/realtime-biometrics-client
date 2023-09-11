<template>
  <div class="column h-screen justify-center items-center">
    <div class="text-8xl font-bold font-secondary">{{error.status}} </div>
   <div class="text-xl font-bold">{{ error.message }}</div>
  </div>
</template>

<script>
import { useErrorStore } from '@/store/error';
import { storeToRefs } from 'pinia';
export default {

    setup(){
        const store = useErrorStore()

        const { error } = storeToRefs(store)

        return {
            error
        }
    }

}
</script>

<style>

</style>