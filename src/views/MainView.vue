<template>
    <q-layout view="hHh lpR fFf">
  
      <HeaderView />
  
   
      
      <q-page-container>
        <router-view />
      </q-page-container>
  
      <q-footer elevated class="bg-grey-8 text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            <div>Title</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
  
    </q-layout>
  </template>
  
  <script>
  import { onMounted, ref,provide } from 'vue'
  import HeaderView from '@/views/components/HeaderView.vue'
  import {useAuthStore} from '@/store/auth'
  import { useSettingStore } from '@/store/settings'
import { storeToRefs } from 'pinia'


  
  export default {
    components:{
      HeaderView
    },
    setup () {
      const leftDrawerOpen = ref(false)
      const store= useAuthStore()
      const settingStore = useSettingStore()

      const {user } = storeToRefs(store)
      
  
   
      onMounted(()=>{
        store.getUser()
        provide('user',user)
        settingStore.get()

      })
      
  
      return {
        leftDrawerOpen,
        toggleLeftDrawer () {
          console.log('toggle')
          leftDrawerOpen.value = !leftDrawerOpen.value
        },
       
        tab:ref('admin')
      }
    }
  }
  </script>