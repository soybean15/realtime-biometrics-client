import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { setCssVar } from 'quasar'

export const useSettingStore = defineStore('settings', () => {


    const settings = ref(null)
    const $q = useQuasar()
    const isDark= ref($q.dark.isActive)
    const dateTime = ref({
        time:null,
        date:null,
        time_format:null,
        amPm:null
    })
    const primaryColor = ref(null)




    const get = async ()=>{
        settings.value = (await axios.get('api/settings')).data
        dateTime.value = (await axios.get('api/settings/date-time')).data
        console.log(settings.value)

      

        //save to local storage if settings is changed
        if(localStorage.getItem('primary')  === 'null' || localStorage.getItem('primary') !=  settings.value.theme.primary ){
            localStorage.setItem('primary', settings.value.theme.primary)
            primaryColor.value= settings.value.theme.primary

        }else{
            primaryColor.value= localStorage.getItem('primary') 
        }
   

        isDark.value = localStorage.getItem('dark') === 'true'

        console.log(isDark.value)
        $q.dark.set(isDark.value)
        setCssVar('primary', primaryColor.value)
    }

    const changeColor=async()=>{
        settings.value = (await axios.post('api/settings/change-color',{
            primary: primaryColor.value
        })).data
        primaryColor.value= settings.value.theme.primary

        setCssVar('primary', primaryColor.value)
     
    }

    const setDarkMode=(val)=>{

        localStorage.setItem('dark',val)

        $q.dark.set(val)
    }

    const updateTimeFormat =async (val)=>{
      const response= await axios.post('api/settings/change-setting',{
            key:'time_format',
            value: val === '12hrs' ? '24hrs' : val === '24hrs' ? '12hrs' : '12hrs',
        })
        dateTime.value.time_format= response.data.time_format
    }

    const updateSettings= async(key)=>{

        await axios.post('api/settings/change-setting',{
            key:key,
            value: settings.value[key]
        })

    }


    
    return {
        settings , 
        isDark,
        primaryColor,
        dateTime,
        updateTimeFormat,
        get,
        setDarkMode,
        changeColor,
        updateSettings
    }

})