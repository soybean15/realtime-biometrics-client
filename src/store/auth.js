import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {


    const user = ref(null)



    const users = ref(null)






    const loginForm = ref({
        email: '',
        password: ''
    })
    const registerForm = ref({
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
    })


    const errors = ref([])





    const getUser = async () => {
        await axios.get('sanctum/csrf-cookie')


        
        errors.value = []
        try {
            user.value = (await axios.get('api/user')).data

        
        } catch (error) {
            console.log('error')
            if (error.response.status === 403) {
                errors.value = error.response.data

                logout()
                console.log(error.response.data
                    )

            }
            return false

        }
        return true

    }

    const getUsers = async () => {

        users.value = (await axios.get('api/admin/user')).data.users

    }


    const login = async (close) => {

        errors.value = []
        try {
            await axios.post('login', loginForm.value)

           if( await getUser()){
                close()
                loginForm.value.email =''
                loginForm.value.password =''
            
           }
            // if(!user.value.enable){
            //     logout()
            //     throw new Error("User is not enabled");
    
            // }else{
                
    

      
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors

            }
         

            //catch here

        }
        
    }

    const logout = async () => {
        await axios.post('logout')
        user.value = null

    }

    const register = async (close) => {

        errors.value = []
        try {
            await axios.post('register', registerForm.value)
            registerForm.value = null
            close()

        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors

            }

        }
        getUser()



    }


    const enable = async (id) => {

        const response = await axios.post('api/admin/user/enable',{id:id})


        const userIndex = users.value.data.findIndex(u => u.id === id);


        if (userIndex !== -1) {
            // Replace the user at the found index with the new user data
            users.value.data[userIndex] = response.data.user;

        }

    }



    const search = async(val)=>{
        const response = await axios.post('api/admin/user/search', {value:val})

        users.value = response.data.users

    }

    const updateProfileInfo= async(current_password, password)=>{
        await axios.put('user/profile-information',{
            name: user.value.name,
            email: user.value.email
        })


        await axios.put ('user/password',{
            current_password:current_password,
            password_confirmation:password,
            password:password
        })
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
            errors,
            enable,
            search,
            updateProfileInfo ,
            
        }
    })