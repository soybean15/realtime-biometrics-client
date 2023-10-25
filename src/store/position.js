import axios from 'axios'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const usePositionStore = defineStore('position', () => {

    const positions = ref(null)
    const errors = ref([])
    const status =ref(null)


    const positionForm = ref({
        name: null,
    })



    const getPositions=async()=>{
        positions.value = (await axios.get('api/admin/position')).data.positions
 

    }


    const paginate = async (link) => {

        const response = await axios.get(link)
        positions.value = response.data.positions

    }


    const addPosition = async () => {
        errors.value = [];
    
        try {
            await axios.post('api/admin/position/add', positionForm.value);

        } catch (e) {
            if (e.response && e.response.status === 422) {
                errors.value = e.response.data.errors;
            }
        }
    }


    const update= async(id,value)=>{
        status.value= null
        try{
            const response = await axios.post('api/admin/position/edit',{
                id:id,
                name:value,
           
    
            })
            status.value = response.data
        }catch(e){

            if(e.response.status === 422 || e.response.status ===404 ){
                status.value = e.response.data

            }

         }
      }

      const destroy= async(id)=>{
        status.value= null

        try{
            const response = await axios.post('api/admin/position/delete',{
                id:id
            })
    
            status.value = response.data      
        }catch(e){
            status.value = e.response.data

        }

      }


    const search = async (val)=>{
        
        const response = await axios.get(`api/admin/position/search/?val=${val}`)
        positions.value = response.data.positions
    }

    return {
        positions,
        getPositions,
        addPosition,
        positionForm,
        errors,
        status,
        search,
        update,
        destroy,
        paginate,
 
    }


})