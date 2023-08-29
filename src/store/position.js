import axios from 'axios'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const usePositionStore = defineStore('position', () => {

    const positions = ref(null)

    const getPositions=async()=>{
        positions.value = (await axios.get('api/admin/position')).data.positions
 

    }

    return {
        positions,
        getPositions
    }


})