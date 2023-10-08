import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {


    const holidays = ref(null)

    const index = async ()=>{

        const response = await axios.get('api/admin/holiday')

        holidays.value = response.data.holidays

    }


    return {

        holidays,
        index
    }
})