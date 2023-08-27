import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {


    const _employees = ref(null)
    const trashed = ref(null)
    const employees = computed(()=>_employees.value)

    const errors = ref([])

    const employeeForm = ref({
        firstname:'Marlon',
        lastname:'Padilla',
        middlename:'',
        gender:'Male',
        birthdate:'2000/08/08',
        address:'Test',
        contact_number:'',
        image:null,
        email:''
    })

    const getEmployees =async()=>{
       
        
        const data = (await axios.get('api/admin/employee'))
        _employees.value = data.data.employees
        trashed.value =data.data.trashed
    }

    const add= async(image)=>{
    
        errors.value = []
        try{
            employeeForm.value.image = image

            await axios.post('api/admin/employee/add',employeeForm.value,
            {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
        }catch(error){
            if(error.response.status === 410){

                errors.value = error.response.data.errors
                console.log(errors.value)

            }
        }
        
    }

    const destroy= async(employee_id)=>{


        try{
            await axios.post('api/admin/employee/delete',{
                id:employee_id
            })
          
            _employees.value.data = _employees.value.data.filter(employee=> employee.id != employee_id)        

        }catch(error){


            console.log('test')
        }
       
    }


    const restore = async(employee_id)=>{
        try{
            await axios.post('api/admin/employee/restore',{
                id:employee_id
            })

            trashed.value.data = trashed.value.data.filter(employee=> employee.id != employee_id)        
        }catch(error){


            console.log('test')
        }
    }


    return {
        getEmployees,
        employees,
        employeeForm,
        add,
        errors,
        trashed,
        restore,
        destroy
    }
})