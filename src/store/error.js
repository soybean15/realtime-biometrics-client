import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useErrorStore = defineStore('error', () => {

    const error=ref({
        status:404,
        message:'Page not found'
    })

    const redirect=(status, message)=>{

        error.value.status = status
        error.value.message = message
        router.push({name:'error'})
      
    }


    return {
        error,redirect
    }
   
    

})