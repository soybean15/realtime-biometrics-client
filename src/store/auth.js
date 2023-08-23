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

            _user.value.isAdmin = user.value.roles.contains('Admin') || user.value.roles.contains('SuperAdmin');


        } catch (error) {
            console.log('error')
        }

    }

    const login = async (close) => {

        errors.value=[]
        try{
            await axios.post('login', loginForm.value)
            close()
            loginForm.value= null
        }catch(error){
            if(error.response.status === 422){
                errors.value = error.response.data.errors
               
            }

        }
        getUser()
       
    }

    const logout = async () => {
        await axios.post('logout')
        _user.value = null

    }

    const register = async (close)=>{

        errors.value=[]
        try{
            await axios.post('register',registerForm.value)
            registerForm.value=null
            close()

        }catch(error){
            if(error.response.status === 422){
                errors.value = error.response.data.errors
               
            }

        }
        getUser()
       
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