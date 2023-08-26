import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {


    const _employees = ref(null)
    const employees = computed(()=>_employees.value)

    const employeeForm = ref({
        firstname:''

    })

    const getEmployees =async()=>{
        _employees.value = (await axios.get('api/admin/employee')).data.employees
        
    }


    return {
        getEmployees,
        employees,
        employeeForm
    }
})