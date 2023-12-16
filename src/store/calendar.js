import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { date } from "quasar";
export const useCalendarStore = defineStore('calendar', () => {


    const holidays = ref(null)
    const eventForm = ref({
        name: null,
        month: null,
        day: null,
        category: null

    })

    const current = Date.now();
    const formattedString = date.formatDate(current, "YYYY/MM/DD");
    const keys = ref([]);
    const dateModel = ref(formattedString)
    const errors = ref(null)
    const index = async () => {

        const response = await axios.get('api/admin/holiday')
        holidays.value = response.data.holidays
        keys.value = Object.keys(holidays.value);
    }

    const addEvent = async () => {
        errors.value =null
        try {
            await axios.post('api/admin/holiday/store', eventForm.value)

             index()

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
         index()

    }


    return {

        holidays,
        errors,
        index,
        eventForm,
        addEvent,
        moveEvent,
        dateModel,keys
    }
})