import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { setCssVar } from 'quasar'

export const useSettingStore = defineStore('settings', () => {


    const settings = ref(null)
    const $q = useQuasar()
    const isDark = ref($q.dark.isActive)
    const dateTime = ref({
        time: null,
        date: null,
        time_format: null,
        amPm: null
    })
    const theme = ref({
        primary: '',
        secondary: ''
    })

    




    const get = async () => {
        settings.value = (await axios.get('api/settings')).data
        dateTime.value = (await axios.get('api/settings/date-time')).data
        console.log(settings.value)



        //save to local storage if settings is changed
        // Check if 'primary' or 'secondary' is null or different from the current settings
        if (
            localStorage.getItem('primary') === 'null' ||
            localStorage.getItem('primary') !== settings.value.theme.primary ||
            localStorage.getItem('secondary') === 'null' ||
            localStorage.getItem('secondary') !== settings.value.theme.secondary
        ) {
            // Save the updated values to local storage
            localStorage.setItem('primary', settings.value.theme.primary);
            localStorage.setItem('secondary', settings.value.theme.secondary);

            // Update the theme values
            theme.value['primary'] = settings.value.theme.primary;
            theme.value['secondary'] = settings.value.theme.secondary;
        } else {
            // Use the values from local storage
            theme.value['primary'] = localStorage.getItem('primary');
            theme.value['secondary'] = localStorage.getItem('secondary');
        }


        isDark.value = localStorage.getItem('dark') === 'true'

        console.log(isDark.value)
        $q.dark.set(isDark.value)
        setCssVar('primary', theme.value['primary'])
        setCssVar('secondary', theme.value['secondary'])
    }

    const changeColor = async (key) => {
        settings.value = (await axios.post('api/settings/change-color', {
            key: key,
            value: theme.value[key]
        })).data
        theme.value[key] = settings.value.theme[key]

        setCssVar(key, theme.value[key])

    }

    const setDarkMode = (val) => {

        localStorage.setItem('dark', val)

        $q.dark.set(val)
    }

    const updateTimeFormat = async (val) => {
        const response = await axios.post('api/settings/change-setting', {
            key: 'time_format',
            value: val === '12hrs' ? '24hrs' : val === '24hrs' ? '12hrs' : '12hrs',
        })
        dateTime.value.time_format = response.data.time_format
    }

    const updateSettings = async (key) => {

        await axios.post('api/settings/change-setting', {
            key: key,
            value: settings.value[key]
        })

    }



    return {
        settings,
        isDark,
        theme,
        dateTime,
        updateTimeFormat,
        get,
        setDarkMode,
        changeColor,
        updateSettings
    }

})