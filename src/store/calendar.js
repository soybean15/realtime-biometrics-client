import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {


    const holidays = ref(null)
    const eventForm = ref({
        name: null,
        month: null,
        day: null,
        category: null

    })

    const errors = ref(null)
    const index = async () => {

        const response = await axios.get('api/admin/holiday')
        holidays.value = response.data.holidays
    }

    const addEvent = async () => {
        errors.value =null
        try {
            await axios.post('api/admin/holiday/store', eventForm.value)

            await index()

        } catch (e) {
            if(e.response.status === 422){
                errors.value = e.response.data.errors
            }

        }



    }

    const moveEvent = async (event, date) => {



        await axios.post('api/admin/holiday/move', {
            id: event.id,
            date: date
        })

    }


    return {

        holidays,
        errors,
        index,
        eventForm,
        addEvent,
        moveEvent
    }
})