import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {


    const _employees = ref(null)
    const trashed = ref(null)
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
       
        
        const data = (await axios.get('api/admin/employee'))
        _employees.value = data.data.employees
        trashed.value =data.data.trashed
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

    const deleteEmployee= async(employee_id)=>{


        try{
            await axios.post('api/admin/employee/delete',{
                id:employee_id
            })


        }catch(error){


            console.log('test')
        }
       
    }


    return {
        getEmployees,
        employees,
        employeeForm,
        addEmployee,
        errors,
        deleteEmployee,
        trashed
    }
})