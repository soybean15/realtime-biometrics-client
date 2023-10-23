import axios from 'axios'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useReportStore = defineStore('report', () => {

    const tab = ref('date')

    const report = ref(null)


    const index =async()=>{

        const response = await axios.get('api/admin/report')
        report.value = response.data


        console.log(report.value)

    }


    return {
        tab,
        index,
        report
    }

})