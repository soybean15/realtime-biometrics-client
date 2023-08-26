import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {


    const _employees = ref(null)
    const employees = computed(()=>_employees.value)

    const errors = ref([])

    const employeeForm = ref({
        firstname:'',
        lastname:'',
        middlename:'',
        gender:'',
        birthdate:'',
        address:'',
        contact_number:''

    })

    const getEmployees =async()=>{
        _employees.value = (await axios.get('api/admin/employee')).data.employees
        
    }

    const addEmployee= async()=>{
        errors.value = []
        try{
            (await axios.post('api/admin/employee/add',employeeForm.value))
        }catch(error){
            if(error.response.status === 410){

                errors.value = error.response.data.errors
                console.log(errors.value)

            }
        }
        
    }


    return {
        getEmployees,
        employees,
        employeeForm,
        addEmployee,
        errors
    }
})