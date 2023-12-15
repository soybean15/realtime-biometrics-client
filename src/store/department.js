import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDepartmentStore = defineStore('department', () => {

    const departments = ref()
    const departmentForm = ref({
        name: null,
    })
    const department = ref(null)//dont remove

    const errors = ref([])
    const status = ref(null)

    const index = async ()=>{
        departments.value = await (await (axios.get('api/admin/department'))).data.departments
    }

    const getDepartments = async () => {
        departments.value = await (await (axios.get('api/admin/department/get'))).data.departments

    }



    const paginate = async (link) => {

        const response = await axios.get(link)
        departments.value = response.data.departments

    }


    const addDepartment = async () => {
        errors.value = [];

        try {
            await axios.post('api/admin/department/add', departmentForm.value);

        } catch (e) {
            if (e.response && e.response.status === 422) {
                errors.value = e.response.data.errors;
            }
        }
    }

    const destroy = async (id) => {
        status.value = null

        try {
            const response = await axios.post('api/admin/department/delete', {
                id: id
            })

            status.value = response.data
        } catch (e) {
            status.value = e.response.data

        }

    }

    const update = async (id, value) => {
        status.value = null
        try {
            const response = await axios.post('api/admin/department/update', {
                id: id,
                name: value,


            })
            status.value = response.data
        } catch (e) {

            if (e.response.status === 422 || e.response.status === 404) {
                status.value = e.response.data

            }

        }
    }



    const search = async (val) => {

        const response = await axios.get(`api/admin/department/search/?val=${val}`)
        departments.value = response.data.departments
    }

    const resetStatus = () => {
        status.value = null
    }

    return {
        getDepartments,
        departments,
        addDepartment,
        errors,
        departmentForm,
        department,
        destroy,
        resetStatus,
        update,
        search,
        paginate,
        index
    }

})