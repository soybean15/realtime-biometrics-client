import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useZkStore = defineStore('zk', () => {

    const zkDevice = ref({
        name:'',
        port:'',
        ip_address:''
    })
    const zkDevices = ref([])

    const loading = ref({
        ping:false,
        submit:false
    })

    const errors = ref([])

    const status = ref([])

    const ping = async ()=>{
        status.value=[]
        try{
            loading.value['ping'] = true
            status.value  = (await axios.post('api/zk/ping',zkDevice.value)).data
            loading.value['ping'] = false
        }catch(error){
            loading.value['ping'] = false

            if (error.response.status === 405) {

                status.value = error.response.data
                console.log(status.value)

            }
        }       
    }

    const add = async ()=>{
        errors.value =[]
        try{
            loading.value['submit'] =true
            await axios.post('api/zk/store',zkDevice.value)
            loading.value['submit'] =false
        }catch(error){
            loading.value['submit'] =false
            if (error.response.status === 403) {

                errors.value = error.response.data.errors
                console.log(errors.value)

            }
        }
     
    }

    const index = async()=>{
        zkDevices.value = await axios.get('api/zk')


    }


    return {
        zkDevice,
        loading,
        status,
        errors,
        ping,
        add,
        index

    }


})