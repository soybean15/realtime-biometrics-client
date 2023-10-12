import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {


    const holidays = ref(null)
    const eventForm = ref({
        name:null,
        month:null,
        day:null,
        category:null

    })

    const index = async ()=>{

        const response = await axios.get('api/admin/holiday')
        holidays.value = response.data.holidays
    }

    const addEvent=async()=>{

     
      await axios.post('api/admin/holiday/store' ,eventForm.value)

    }

    const moveEvent = async(event,date)=>{

  

        await axios.post('api/admin/holiday/move' ,{
            id:event.id,
            date: date
        })

    }


    return {

        holidays,
        index,
        eventForm,
        addEvent,
        moveEvent
    }
})