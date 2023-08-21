import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {


    const _user = ref(null)

    const loginForm = ref({
        email: '',
        password: ''
    })

    const user = computed(() => _user.value)



    const getUser = async () => {
        await axios.get('sanctum/csrf-cookie')
        try {
            _user.value = (await axios.get('api/user')).data


        } catch (error) {
            console.log(error)
        }

    }

    const login = async () => {

        await axios.post('login', loginForm.value)
        getUser()
    }

    const logout = async () => {

        await axios.post('logout')
        _user.value = null

    }
    return {
        user,
        getUser,
        login,
        logout,
        loginForm
    }
})