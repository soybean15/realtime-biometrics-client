<template>
  <PersistentDialog
   :width="'700px'" 
   :maxWidth="'80vh'"
   :backgroundColor="'bg-red-400'"
   >
    <template v-slot:open-button="{ open }">

    
    
   
      <div  v-if="user==null" >
        <q-btn flat label="Login" @click="open" />
      </div>
      <div v-else>
        <q-btn flat label="Logout" @click="store.logout"   />
      </div>
      
    
    </template>

    <template v-slot:title>
      <span>Login</span>  </template>

    <template v-slot:content>
      <div >
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="loginForm.email"
          label="Email"
          hint="example@email.com"
          lazy-rules
         
        /> 
        <!-- :rules="[(val) => (val && val.length > 0) || 'Please type something']" -->

        <q-input
          filled
          type="password"
          v-model="loginForm.password"
          label="password"
          lazy-rules
        
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
         
        </div>
      </q-form>

      </div>
    
    </template>
  </PersistentDialog>
</template>

<script>
import PersistentDialog from "@/components/PersistentDialog.vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from 'pinia';

export default {
  components:{PersistentDialog},
  setup(){

    const store = useAuthStore()

    const {
      user,
      loginForm
    } =storeToRefs(store)



    console.log(user)

    return{
      store,
      loginForm,
      user,
      onSubmit:()=>{
        store.login()
      }
    }
  }
};
</script>

<style>
</style>