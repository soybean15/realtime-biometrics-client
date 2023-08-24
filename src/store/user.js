import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import {  computed, ref } from 'vue'
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', () => {

    const auth = useAuthStore()
    const {user}= storeToRefs(auth)


    const _users = ref(null)
    const users = computed(()=>_users.value)

    const getUsers = async()=>{

        _users.value  = (await axios.get('api/admin/user')).data.users

        console.log(_users.value)

    }


    

    return {
        user,
        getUsers,
        users
    }
})