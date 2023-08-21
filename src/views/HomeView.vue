<template>
 
 <div class="bg-red-400 m-52">{{user}}</div>
 </template>
<script >
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';


export default {
   setup(){
     const store = useAuthStore()
     const {user,}= storeToRefs(store)
     return{
        user
        
     }
   }

}
</script>

<style>

</style>