import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {


    const user = ref()

    const getUser= async()=>{
        await axios.get('sanctum/csrf-cookie')
        try{
            user.value = (await axios.get('api/user')).data
            console.log(user.value)
        }catch(error){
            console.log(error)
        }
  

    }
  
  
    return {
       user,
       getUser
    }
  })