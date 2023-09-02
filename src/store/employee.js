import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import {  ref } from 'vue'
import { useAuthStore } from './auth'

export const useEmployeeStore = defineStore('employee', () => {



    const authStore = useAuthStore()
    const {user} = storeToRefs(authStore)
    console.log(user.value)

    const data = ref({
        employees:null,
        trashed:null
    })
    // const employees = ref(null)
    // const trashed = ref(null)
    //const employees = computed(()=>_employees.value)

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
        email:'',
        department_id:null,
        position_id:null,
        user_id:user.value.id
    })

    const selectedEmployee =ref(null)

    const getEmployees =async()=>{
       
        
        const response = (await axios.get('api/admin/employee'))
        data.value['employees'] = response.data.employees
        data.value['trashed'] =response.data.trashed
    }

    const paginate = async (name, path)=>{
        const response = await axios.get(path)
        data.value[name] = response.data[name]
    }

    const add= async()=>{
    
        errors.value = []
        try{
            //employeeForm.value.image = image

             await axios.post('api/admin/employee/add',employeeForm.value,
            {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
        
            // console.log( data.value['employees'].data)
            // data.value['employees'].data.push(response.data.employee)
            // console.log( data.value['employees'].data)
            getEmployees()

        }catch(error){
            if(error.response.status === 410){

                errors.value = error.response.data.errors
                console.log(errors.value)

            }
        }
        
    }

    const destroy= async()=>{


        try{
            await axios.post('api/admin/employee/delete',{
                id:selectedEmployee.value.id
            })
          
            data.value['employees'].data =  data.value['employees'].data.filter(employee=> employee.id != selectedEmployee.value.id)        

        }catch(error){


            console.log('test')
        }
       
    }


    const restore = async(employee_id)=>{
        try{
            const response = await axios.post('api/admin/employee/restore',{
                id:employee_id
            })

            const restoredEmployee = response.data.employee;  
            const index =  data.value['trashed'].data.findIndex(employee => employee.id === employee_id);
            if (index !== -1) {
                data.value['trashed'].data.splice(index, 1, restoredEmployee);
            }

//           trashed.value.data = trashed.value.data.filter(employee=> employee.id != employee_id)        
        }catch(error){


            console.log('test')
        }
    }

    const selectEmployee = (employee)=>{

        selectedEmployee.value = employee
    }


    return {
        getEmployees,
        data,
        employeeForm,
        selectedEmployee,
        add,
        errors,
        restore,
        destroy,
        paginate,
        selectEmployee
    }
})