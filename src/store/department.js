import axios from 'axios'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useDepartmentStore = defineStore('department', () => {

    const departments = ref()
    const selectedDepartments = ref([])

    const _department = ref(null)
    

    const getDepartments = async()=>{
        departments.value = await (await (axios.get('api/admin/department'))).data.departments
     
    }

    return {
        getDepartments,
        departments,
        selectedDepartments,
        _department
    }

})