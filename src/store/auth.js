import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {


    const _user = ref(null)

    const user = computed(() => _user.value)



    const _users = ref(null)
    const users = computed(()=>_users.value)




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

  
    const errors = ref([])





    const getUser = async () => {
        await axios.get('sanctum/csrf-cookie')
        try {
            _user.value = (await axios.get('api/user')).data

        } catch (error) {
            console.log('error')
        }

    }

    const getUsers = async()=>{

        _users.value  = (await axios.get('api/admin/user')).data.users

        console.log(_users.value)

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
        users,
        user,
        getUser,
        getUsers,
        login,
        logout,
        register,
        loginForm,
        registerForm,
        errors
    }
})