
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttendanceStore = defineStore('attendance', () => {

    const employee = ref(null)

    const employeeList = ref([])


    // window.echo.channel("zkTeco").listen(".get.attendance", (response) => {
    //     console.log(response)
    //     response.attendance.employee.image = response.attendance.employee.image.replace("http://localhost", "http://localhost:8000");
    //     attendance.value.push(response.attendance)
    // });



    return {
        employee,
        employeeList
    }

})