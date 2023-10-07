
import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useEmployeeStore } from './employee'

export const useAttendanceStore = defineStore('attendance', () => {
    //this is use by websocket
    const attendance = ref(null)

    const employeeStore = useEmployeeStore()
    const {selectedEmployee} = storeToRefs(employeeStore)
    const attendanceList = ref([])


    // window.echo.channel("zkTeco").listen(".get.attendance", (response) => {
    //     console.log(response)
    //     response.attendance.employee.image = response.attendance.employee.image.replace("http://localhost", "http://localhost:8000");
    //     attendance.value.push(response.attendance)
    // });



    const employeeAttendance=ref([])

    const getAttendance=async()=>{

        const response = await axios.get(`api/admin/employee/attendance/${selectedEmployee.value.id}`)
        employeeAttendance.value = response.data
    }

    const getAttendanceByCuOff= async()=>{
        employeeAttendance.value=[]
        const response = await axios.get(`api/admin/employee/attendance/cutoff/${selectedEmployee.value.id}`)
        employeeAttendance.value = response.data
    }

    const resolve=async(type,timestamp)=>{

        await axios.post('api/admin/employee/attendance/resolve',
            {
                employee_id:1,
                type:type,
                timestamp:timestamp
            }
        )
    }




    return {
        attendance,
        employeeAttendance,
        getAttendance,
        getAttendanceByCuOff,
        attendanceList,
        resolve
    }

})