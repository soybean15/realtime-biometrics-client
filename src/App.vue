<template>
  <q-layout view="hHh lpR fFf">

    <HeaderView @toggleLeftDrawer="toggleLeftDrawer"/>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    
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
import { ref } from 'vue'
import HeaderView from '@/views/components/HeaderView.vue'

export default {
  components:{
    HeaderView
  },
  setup () {
    const leftDrawerOpen = ref(false)
  

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

     
     
      tab:ref('admin')
    }
  }
}
</script>