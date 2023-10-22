import axios from 'axios'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useReportStore = defineStore('report', () => {

    const tab = ref('date')


    const getReportByDate=async()=>{

        await axios.get('api/admin/report')

    }


    return {
        tab,
        getReportByDate
    }

})