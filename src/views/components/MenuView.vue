<template>
 
  
        <q-bar class="bg-primary text-white rounded-borders">
          <div class="cursor-pointer non-selectable">
            File
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable >
                  <q-item-section><AddNewDevice/></q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Devices</q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>Ping</q-item-section>
                </q-item>
   
               
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Help</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <div class="cursor-pointer non-selectable">View
            <q-menu>
              <q-list dense style="min-width: 200px">
                <q-item clickable v-close-popup>
                  <q-item-section>Side Panel</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Show Lates</q-item-section>
                </q-item>
                <q-item clickable >
                  <q-item-section>Live Data</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Time Format</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable >
                  <q-item-section>Reload</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>

          <div class="cursor-pointer non-selectable">User
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item  clickable v-if="user && user.enable">
                  <q-item-section>Administrator</q-item-section>
                </q-item>
              
                <q-item :to="{name:'settings'}" clickable >
                  <q-item-section>Settings</q-item-section>
                </q-item>

                <q-separator />
                <q-item clickable v-if="user">
                  <q-item-section>Log out</q-item-section>
                </q-item>
                <q-separator />
              
              </q-list>
            </q-menu>
          </div>
         
        </q-bar>
    
  </template>

<script>
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import AddNewDevice from './modals/AddNewDevice.vue';

export default ({
  components:{AddNewDevice},
    setup() {
        const auth = useAuthStore()

        const {user } = storeToRefs(auth)
        return {
            user
        }
        
    },
})
</script>
