import axios from 'axios'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useReportStore = defineStore('report', () => {

    const tab = ref('date')

    const report = ref(null)


    const index =async()=>{

        const response = await axios.post('api/admin/report')
        report.value = response.data.active


        console.log(report.value)

    }


    return {
        tab,
        index,
        report
    }

})