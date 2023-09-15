//import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useZkStore = defineStore('zk', () => {

    const zkDevice = ref({
        name:'',
        ip_address:''
    })

    return {
        zkDevice
    }


})