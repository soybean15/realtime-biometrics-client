import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {


    const _user = ref(null)

    const loginForm = ref({
        email: '',
        password: ''
    })
    const registerForm = ref({
        email: '',
        name:'',
        password: '',
        password_confirmation:''
    })

    const user = computed(() => _user.value)

    const errors = ref([])



    const getUser = async () => {
        await axios.get('sanctum/csrf-cookie')
        try {
            _user.value = (await axios.get('api/user')).data


        } catch (error) {
            console.log('error')
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

    const register = async (close)=>{

        try{
            await axios.post('register',registerForm.value)
            close()

        }catch(error){
            if(error.response.status === 422){
                errors.value = error.response.data.errors
               
            }

        }
       
    }

    return {
        user,
        getUser,
        login,
        logout,
        register,
        loginForm,
        registerForm,
        errors
    }
})