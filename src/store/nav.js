
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useNavStore = defineStore('nav', () => {

    const active = ref(null)
    const getActive=()=>{
        console.log(router.currentRoute.value.meta.owner)
    }

    return {
        active,
        getActive
    }

})