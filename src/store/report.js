//import axios from 'axios'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useReportStore = defineStore('report', () => {

    const tab = ref('date')

    return {
        tab
    }

})