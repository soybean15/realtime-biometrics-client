
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttendanceStore = defineStore('attendance', () => {

    const attendance = ref(null)

    const attendanceList = ref([])


    // window.echo.channel("zkTeco").listen(".get.attendance", (response) => {
    //     console.log(response)
    //     response.attendance.employee.image = response.attendance.employee.image.replace("http://localhost", "http://localhost:8000");
    //     attendance.value.push(response.attendance)
    // });



    return {
        attendance,
        attendanceList
    }

})