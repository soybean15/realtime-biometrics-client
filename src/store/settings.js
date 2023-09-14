import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQuasar } from 'quasar'


export const useSettingStore = defineStore('settings', () => {


    const settings = ref(null)
    const $q = useQuasar()
    const isDark= ref($q.dark.isActive)

    const get = ()=>{
        settings.value = axios.get('api/settings')
    }

    const setDarkMode=(val)=>{
        $q.dark.set(val)
    }


    
    return {
        settings , 
        isDark,
        get,
        setDarkMode,
    }

})