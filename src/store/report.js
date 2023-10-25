import axios from 'axios'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useReportStore = defineStore('report', () => {

    const tab = ref('date')

    const report = ref(null)

    const reports = ref(null)


    const index =async(date)=>{

        const response = await axios.post('api/admin/report',{
            date:date
        })
        report.value = response.data.active


    }

    const getReportByCutOff=async(date)=>{

     

        const  response = await axios.post('api/admin/report/cut-off',{
            date:date
        })

        

        reports.value = response.data

        console.log(reports.value)

    }


    return {
        tab,
        index,
        report,
        reports,
        getReportByCutOff
    }

})