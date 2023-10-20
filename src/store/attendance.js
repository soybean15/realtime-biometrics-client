
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

    const pdfFile = ref(null)


    // window.echo.channel("zkTeco").listen(".get.attendance", (response) => {
    //     console.log(response)
    //     response.attendance.employee.image = response.attendance.employee.image.replace("http://localhost", "http://localhost:8000");
    //     attendance.value.push(response.attendance)
    // });



    const employeeAttendance=ref([])
    //const attendanceSummary= ref([])

    const getAttendance=async()=>{

        const response = await axios.get(`api/admin/employee/attendance/${selectedEmployee.value.id}`)
        employeeAttendance.value = response.data
    }

    const getAttendanceByCuOff= async(date)=>{
        employeeAttendance.value=[]
        
        const response = await axios.post(`api/admin/employee/attendance/cutoff/${selectedEmployee.value.id}`,{
            date:date
        })
        employeeAttendance.value = response.data
    }

    const summary =ref(null)

    const resolve=async(type,timestamp)=>{

 await axios.post('api/admin/employee/attendance/resolve',
            {
                employee_id:1,
                type:type,
                timestamp:timestamp
            }
        )

    }

    const getAttendanceSummary=async(data)=>{

        const response = await axios.post(`api/admin/employee/attendance/summary/${selectedEmployee.value.id}`,{

            start:data['start'],
            end:data['end'],
            month:data['month'],
            year:data['year']

        })
        

        summary.value= response.data
    }

    const generatePDF=async(action)=>{
       const response =  await axios.get(`api/admin/employee/pdf/${action}/${selectedEmployee.value.id}`,{
        responseType: 'blob'
       })
        pdfFile.value = window.URL.createObjectURL(new Blob([response.data]));
        console.log(pdfFile.value)
 
     }



    return {
        attendance,
        employeeAttendance,
        getAttendance,
        getAttendanceByCuOff,
        attendanceList,
        resolve,
        getAttendanceSummary,
        summary,
        generatePDF,
        pdfFile
    }

})