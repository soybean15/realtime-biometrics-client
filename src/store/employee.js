import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useEmployeeStore = defineStore('employee', () => {



    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)
    console.log(user.value)

    const data = ref({
        employees: null,
        trashed: null
    })


    const errors = ref([])

    const employeeForm = ref({
        firstname: 'Marlon',
        lastname: 'Padilla',
        middlename: '',
        gender: 'Male',
        birthdate: '2000/08/08',
        address: 'Test',
        contact_number: '',
        image: null,
        email: '',
        department_id: null,
        position_id: null,
        user_id: user.value.id
    })

    const selectedEmployee = ref(null)

    const getEmployees = async () => {


        const response = (await axios.get('api/admin/employee'))
        data.value['employees'] = response.data.employees
        data.value['trashed'] = response.data.trashed
    }

    const paginate = async (name, path) => {
        const response = await axios.get(path)
        data.value[name] = response.data[name]
    }

    const add = async () => {

        errors.value = []
        try {

            const response = await axios.post('api/admin/employee/add', employeeForm.value,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })


            selectedEmployee.value = response.data.employee
          
            getEmployees()

        } catch (error) {
            console.log(error)
            if (error.response) {
                if (error.response.status === 410) {

                    errors.value = error.response.data.errors
                    console.log(errors.value)

                }
            }

        }

    }

    const get = async (id) => {
        selectedEmployee.value = (await axios.get(`api/admin/employee/${id}`)).data.employee
    }

    const filter = async (attribute,id)=>{

        const response = await axios.post('api/admin/employee/filter',{
            attribute:attribute,
            id: id
        })
        data.value['employees'] = response.data.employees

    }

    const destroy = async () => {


        try {
            await axios.post('api/admin/employee/delete', {
                id: selectedEmployee.value.id
            })

            data.value['employees'].data = data.value['employees'].data.filter(employee => employee.id != selectedEmployee.value.id)

        } catch (error) {


            console.log('test')
        }

    }


    const restore = async (employee_id) => {
        try {
            const response = await axios.post('api/admin/employee/restore', {
                id: employee_id
            })

            const restoredEmployee = response.data.employee;
            const index = data.value['trashed'].data.findIndex(employee => employee.id === employee_id);
            if (index !== -1) {
                data.value['trashed'].data.splice(index, 1, restoredEmployee);
            }

        
        } catch (error) {


            console.log('test')
        }
    }

    const update = async (attribute, val) => {

        errors.value =[]
        try{
            await axios.post('api/admin/employee/update', {
                id: selectedEmployee.value.id,
                attribute: attribute,
                value: val
            })
        }catch(error){
            if (error.response.status === 412) {

                errors.value = error.response.data.errors
               

            }
        }
     
    }

    const selectEmployee = (employee) => {

        selectedEmployee.value = employee
    }

    const upload = async (image) => {
        errors.value =[]
        try{
            const response = await axios.post('api/admin/employee/update-photo', {
                id: selectedEmployee.value.id,
                image: image
            },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
    
            selectedEmployee.value.image = response.data.image
    
        }catch(error){
            if (error.response.status === 412) {

                errors.value = error.response.data.errors
               

            }
        }


    }

    const search = async(val)=>{
        const response = await axios.post('api/admin/employee/search', {value:val})

        data.value['employees'] = response.data.employees

    }


    const employeeAttendance=ref([])

    const getAttendance=async()=>{

        const response = await axios.get(`api/admin/employee/attendance/${selectedEmployee.value.id}`)
        employeeAttendance.value = response.data.attendance
    }


    return {
        getEmployees,
        data,
        employeeForm,
        selectedEmployee,
        employeeAttendance,
        add,
        errors,
        restore,
        destroy,
        paginate,
        selectEmployee,
        update,
        get,
        upload,
        filter,
        search,
        getAttendance
    }
})