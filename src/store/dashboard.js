import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";


export const useDashboardStore = defineStore('dashboard',()=>{

    const dashboard = ref(null)
    const summary = ref(null)

    const authStore = useAuthStore()
    const {user} = storeToRefs(authStore)

    const index = async()=>{
        const response = await axios.get('api/admin/dashboard')
        dashboard.value  = response.data

       const response2 = await axios.get('api/admin/dashboard/summary')
       summary.value = response2.data


    
    }


    return {
        dashboard,
        index,
        user,
        summary

    }

})