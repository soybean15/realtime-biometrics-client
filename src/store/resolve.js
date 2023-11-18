import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useSettingStore } from "./settings";


export const useResolveStore = defineStore('resolve',()=>{



    const dialog = ref(false)
    const status = ref(null)
    const title = ref('Persisten')
    const row = ref()
   
    const settingStore = useSettingStore()
    const {settings} = storeToRefs(settingStore)



    return {
        dialog,
        status,
        title,
        settings,
        row
    }
})